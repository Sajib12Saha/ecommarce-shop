"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { EcommerceLeftPanel } from "@/components/auth/left-panel"
import { Card, CardContent } from "@/components/ui/card"


export default function AuthPage() {

  return (
    <div className="p-2 lg:p-4 flex items-center justify-center w-full">

        <Card className="border-none shadow-lg w-full max-w-5xl">
        <CardContent className="flex md:gap-4  p-0 md:px-4">
    <EcommerceLeftPanel />
      <AuthForm />
        </CardContent>
       </Card>
    </div>
  )
}
