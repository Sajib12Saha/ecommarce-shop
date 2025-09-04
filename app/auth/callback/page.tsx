"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useUser();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // ✅ Store token for persistence
      localStorage.setItem("auth_token", token);

      // ✅ Remove token from URL (clean URL)
      window.history.replaceState({}, document.title, "/auth/callback");

      // ✅ Refresh user with token immediately
      refreshUser(token)
        .then(() => {
          router.replace("/"); // Navigate to homepage
        })
        .catch(() => {
          // Token invalid or refresh failed
          localStorage.removeItem("auth_token");
          router.replace("/sign-up");
        });
    } else {
      // No token in URL → redirect
      router.replace("/sign-up");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}
