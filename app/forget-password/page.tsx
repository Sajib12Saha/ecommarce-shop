import { useSearchParams} from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

interface Props {
    searchParams: Promise<{ token?: string }>
}


const ForgotPasswordPage = async({searchParams}:Props) => {
   const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams?.token;
 

  return (
    <div className="flex items-center justify-center p-8 py-20 w-full">
      <Card className="max-w-4xl w-full">
        <CardHeader className="w-full flex-col flex items-center">
          <CardTitle className="text-xl font-bold">
            {token ? "Reset Your Password" : "Forgot Your Password?"}
          </CardTitle>
          <CardDescription className="text-sm font-semibold">
            {token
              ? "Enter your new password below."
              : "Enter your email address to receive a reset link."}
          </CardDescription>
        </CardHeader>

             <ForgotPasswordForm token={token}/>

      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
