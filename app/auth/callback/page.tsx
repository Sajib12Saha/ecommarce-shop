

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { Loader2 } from "lucide-react";
import { AuthCallbackClient } from "../_components/auth-callback-client";


interface Props {
  searchParams: { token?: string };
}


export default async function AuthCallbackPage({searchParams}:Props) {
    const resolvedSearchParams = await searchParams;
    const token = resolvedSearchParams.token

  return <AuthCallbackClient token={token}/>

}
