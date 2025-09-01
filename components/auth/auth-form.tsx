"use client"
import { useState } from "react"
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, TriangleAlert, Zap } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { logInSchema, registerSchema } from "@/lib/zod-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "../ui/form"
import Link from "next/link"
import { CustomForm } from "../ui/custom-form"
import axios from "axios";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Label } from "../ui/label"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState("");
  const [formStep, setFormStep] = useState<"register" | "verifyOtp">("register");
  const [userEmail, setUserEmail] = useState("");
  const [loginError, setLoginError] = useState("")
  const [loadProvider, setLoadProvider] = useState(false)
  const router = useRouter()
  const {refreshUser} = useUser()




    const registerForm = useForm<z.infer <typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
    name:"",
    email:"",
    password:"",
    },
  });

    const logInForm = useForm<z.infer <typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
    email:"",
    password:"",
    },
  });

const logInSubmit = async (values: z.infer<typeof logInSchema>) => {
  try {
    setIsLoading(true);
    setLoginError(""); // clear previous error
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/login`,
      values,
      { withCredentials: true }
    );
    await refreshUser();         
    router.push("/profile");     

    toast.success("Logged in successfully!");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || "Login failed";
      setLoginError(message);
    } else {
      toast.error("Unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};



const registerSubmit = async (values: z.infer<typeof registerSchema>) => {
  try {
    setIsLoading(true);
    const { email, name, password } = values;

    const response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/register`, {
      name,
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      setUserEmail(email)
      toast.success("OTP sent to your email.");
      setFormStep("verifyOtp"); 
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.error || "Registration failed");
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};


const handleOtpSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/user/verify-otp`,
      {
        email: userEmail,
        otp,
      },
      { withCredentials: true }
    );

    if(res.status === 200){
    router.refresh()
    router.push("/profile")
    toast.success("Email verified & logged in!");
    }


  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.error || "OTP verification failed";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

const providerSubmit = async(provider:"google" | "facebook")=> {
  try {
    setLoadProvider(true)

    if(provider === "google"){
       await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/google`)
      
    }else{
        await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/facebook`)
    }
    
  } catch (error: any) {
    toast.error(error.message || "Something wrong in server")
    
  }finally{
    setLoadProvider(false)
  }
}




  return (
    <div className="flex-1 flex items-center justify-center">


      <div className="w-full max-w-xl">


        <div className="text-center mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
               <Image
                         src={"/logo.jpg"}
                         alt="Hillora"
                         width={100}
                         height={60}
                         className="object-contain overflow-hidden"
                         /> 
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 font-medium text-sm">Sign in to your account or create a new one</p>
        </div>


        <Card className="border shadow-2xl">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="flex w-full gap-x-4 mb-4 rounded-2xl">
                <TabsTrigger
                  value="signin"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup">
                  Registration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">

                <Form {...logInForm}>
                    <form onSubmit={logInForm.handleSubmit(logInSubmit)} className="space-y-4 lg:space-y-8">

                       <FormField
                  control={logInForm.control}
                  name="email"
                  render={({ field }) => (
                    <CustomForm
                      field={field}
                      fieldType="input"
                      inputType="email"
                      label="Email"
                      placeHolder="example346@gmail.com"
                      important
                    />
                  )}
                />
                               <FormField
                  control={logInForm.control}
                  name="password"
                  render={({ field }) => (
                    <CustomForm
                      field={field}
                      fieldType="input"
                      inputType="password"
                      label="Password"
                      placeHolder="*****"
                      allowShowHidePassword
                      important
                    />
                  )}
                />

              


          <div className="space-y-2">

                {loginError && <p className="text-destructive text-sm font-semibold flex items-center gap-x-2"> <TriangleAlert className="size-4"/> {loginError}</p>}

          <Link href="/forget-password" className="hover:text-primary hover:underline font-semibold transition-colors">
                      Forgot password?
                    </Link>
            </div>

                                
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                </Form>

              

              </TabsContent>

              <TabsContent value="signup">
                {formStep === "register" ? (
  <Form {...registerForm}>
     <form onSubmit={registerForm.handleSubmit(registerSubmit)} className="space-y-4 lg:space-y-6">


                    <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <CustomForm
                      field={field}
                      fieldType="input"
                      inputType="text"
                      label="Full Name"
                      placeHolder="Jon Doe"
                      important
                    />
                  )}
                />


                                   <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <CustomForm
                      field={field}
                      fieldType="input"
                      inputType="email"
                      label="Email"
                      placeHolder="example346@gmail.com"
                      important
                    />
                  )}
                />
                               <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <CustomForm
                      field={field}
                      fieldType="input"
                      inputType="password"
                      label="Password"
                      placeHolder="*****"
                      allowShowHidePassword
                      important
                    />
                  )}
                />
                
            

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

  </Form>
                ): (
<form onSubmit={handleOtpSubmit} className="space-y-4 lg:space-y-6">
  <div className="space-y-2">
    <Label className="block text-sm font-medium text-gray-700">
      Enter OTP
    </Label>

    <InputOTP
      maxLength={6}
      value={otp}
      onChange={setOtp}
      autoFocus
      disabled={isLoading}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>

      <InputOTPSeparator />

      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>

    {/* Bengali instruction message */}
    <p className="text-sm text-gray-600 pt-1">
      অনুগ্রহ করে আপনার ইমেইলে পাঠানো ওটিপি কোডটি চেক করুন।
    </p>
  </div>

  <Button type="submit" className="w-full" disabled={isLoading || otp.length < 6}>
    {isLoading ? (
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 animate-spin" />
        Verifying...
      </div>
    ) : (
      "Verify Email"
    )}
  </Button>
</form>


                )}

           

              </TabsContent>
            </Tabs>

            <div className="mt-6 lg:mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white/80 backdrop-blur-sm px-4 text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                <Button
                  variant="outline"
                disabled={loadProvider}
                onClick={()=> providerSubmit("google")}
                >
                  <FaGoogle/>
                
                  Google
                </Button>
                <Button
                  variant="outline"
                  disabled={loadProvider}
                  onClick={()=> providerSubmit("facebook")}
                
                >
                  <FaFacebook/>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
