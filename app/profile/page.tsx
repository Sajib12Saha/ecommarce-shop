"use client"

import { useUser } from "@/contexts/UserContext"
import { Loader2, LogOut, User, ShoppingBag, Heart, CreditCard } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const ProfilePage = () => {
  const { user: profile, loaded } = useUser()
  const [user, setUser] = useState({
    name: "Sajib Chandra",
    email: "sajib@example.com",
  })

  // if (loaded) return (
  //   <div className="w-full h-full flex items-center justify-center">
  //     <Loader2 className="size-6 animate-spin"/>
  //   </div>
  // )
  //
  // else if (!user) return redirect("/")

  return (
    <div className="max-w-6xl mx-auto py-8 px-3 sm:px-6">
      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">My Account</CardTitle>
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut className="size-4" /> Logout
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Tabs
            defaultValue="profile"
            className="w-full flex flex-col md:grid md:grid-cols-[220px_1fr] gap-4 gap-y-14 md:gap-6"
          >
            {/* Sidebar Tabs */}
            <TabsList className="flex flex-wrap   md:flex-col gap-2 md:gap-y-3  md:h-fit md:min-w-[200px]">
              <TabsTrigger value="profile" className="flex items-center gap-2  w-full justify-start text-sm   data-[state=active]:shadow-sm">
                <User className="size-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2  w-full justify-start text-sm  data- data-[state=active]:shadow-sm">
                <ShoppingBag className="size-4" /> Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2  w-full justify-start text-sm   data-[state=active]:shadow-sm">
                <Heart className="size-4" /> Wishlist
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2  w-full justify-start text-sm   data-[state=active]:shadow-sm">
                <CreditCard className="size-4" /> Payment
              </TabsTrigger>
            </TabsList>

            {/* Profile Section */}
            <TabsContent value="profile" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <Button className="w-full sm:w-auto">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Section */}
            <TabsContent value="orders" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">My Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">Order #12345</p>
                      <p className="text-sm text-muted-foreground">Placed on Aug 25, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-semibold">Order #12346</p>
                      <p className="text-sm text-muted-foreground">Placed on Aug 20, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Section */}
            <TabsContent value="wishlist" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">You have 3 saved items.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Section */}
            <TabsContent value="payment" className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Manage your saved cards or add a new one.</p>
                  <Separator className="my-4" />
                  <Button>Add New Card</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
