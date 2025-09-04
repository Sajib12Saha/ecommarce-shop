"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const redirectTo = searchParams.get("redirectTo") || "/"; // optional dynamic redirect

    if (!token) {
      router.replace("/sign-up");
      return;
    }

    // Store token
    localStorage.setItem("auth_token", token);

    // Clean URL
    window.history.replaceState({}, document.title, "/auth/callback");

    // Refresh user and redirect
    refreshUser(token)
      .then(() => {
        setLoading(false);
        // tiny delay for smoother transition
        setTimeout(() => router.replace(redirectTo), 300);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        router.replace("/sign-up");
      });
  }, [searchParams, refreshUser, router]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      {loading && <p className="text-gray-500">Logging you in...</p>}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
