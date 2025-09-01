'use client'

import { useUser } from "@/contexts/UserContext"
import { Loader2 } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, ShoppingBag, Heart, CreditCard } from "lucide-react";

const ProfilePage = () => {
    const {user:profile, loaded} = useUser()
    const [user, setUser] = useState({
    name: "Sajib Chandra",
    email: "sajib@example.com",
  });

    // if(loaded) return(
    //     <div className="w-full h-full flex items-center justify-center">
    //         <Loader2 className="size-6 animate-spin"/>
    //     </div>
    // )

    // else if(!user) return redirect('/')

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">My Account</CardTitle>
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut size={18} /> Logout
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 gap-2 w-full">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User size={18} /> Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag size={18} /> Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart size={18} /> Wishlist
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard size={18} /> Payment
              </TabsTrigger>
            </TabsList>

            {/* Profile Section */}
            <TabsContent value="profile" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      defaultValue={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Section */}
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-semibold">Order #12345</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on Aug 25, 2025
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-semibold">Order #12346</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on Aug 20, 2025
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Section */}
            <TabsContent value="wishlist" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You have 3 saved items.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Section */}
            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage your saved cards or add a new one.
                  </p>
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