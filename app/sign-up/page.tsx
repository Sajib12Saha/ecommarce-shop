"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { EcommerceLeftPanel } from "@/components/auth/left-panel";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { user, loaded } = useUser();
  const [redirecting, setRedirecting] = useState(false);

  // ✅ Redirect when user is already logged in
  useEffect(() => {
    if (loaded && user) {
      setRedirecting(true);
      router.push("/profile");
    }
  }, [loaded, user, router]);

  // ✅ Show loader while auth state is loading OR redirecting
  if (!loaded || redirecting) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  // ✅ If no user, show login form
  return (
    <div className="p-2 lg:p-4 flex items-center justify-center w-full">
      <Card className="border-none shadow-lg w-full max-w-5xl">
        <CardContent className="flex md:gap-4 p-0 md:px-4">
          <EcommerceLeftPanel />
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
