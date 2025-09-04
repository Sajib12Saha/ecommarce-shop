
import { AuthCallbackClient } from "../_components/auth-callback-client";


interface Props {
  searchParams: { token?: string };
}


export default async function AuthCallbackPage({searchParams}:Props) {
    const resolvedSearchParams = await searchParams;
    const token = resolvedSearchParams.token

  return <AuthCallbackClient token={token}/>

}
