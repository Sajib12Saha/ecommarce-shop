
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";

interface Props {
  token?: string;
}

export const AuthCallbackClient = ({token}:Props) => {
      const router = useRouter();
  const { refreshUser } = useUser();

  useEffect(() => {
    if (!token) {
      router.replace("/sign-up");
      return;
    }

    // Store token in localStorage
    localStorage.setItem("auth_token", token);

    // Clean URL
    window.history.replaceState({}, document.title, "/auth/callback");

    refreshUser(token)
      .then(() => router.replace("/"))
      .catch(() => {
        localStorage.removeItem("auth_token");
        router.replace("/sign-up");
      });
  }, [token, router, refreshUser]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}