"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useUser();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      window.history.replaceState({}, document.title, "/auth/callback");

      refreshUser(token)
        .then(() => router.replace("/"))
        .catch(() => {
          localStorage.removeItem("auth_token");
          router.replace("/sign-up");
        });
    } else {
      router.replace("/sign-up");
    }
  }, [searchParams, refreshUser, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full justify-center items-center flex"><Loader2 className="animate-spin size-6"/></div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
