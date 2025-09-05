"use client"

import { navLinks } from "@/data"
import { ShoppingCart, Truck, User2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { BiCategory } from "react-icons/bi"
import { useCart, useOpenStore } from "@/hooks/use-store"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useCategories } from "@/hooks/use-categories"
import Image from "next/image"


export function Navigation() {
    const [headerHidden, setHeaderHidden] = useState(false);
  const router = useRouter()
  const { setOpen } = useOpenStore()
  const { cartItems} = useCart();
  const {user}= useUser()
  const {data:categories, isLoading} = useCategories()
   

    useEffect(() => {
    const handleScroll = () => {
      setHeaderHidden(window.scrollY > 50); // header hidden after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.div
  animate={{ top: headerHidden ? 0 : 81 }} // 81px = header height
      transition={{ duration: 0.4, ease: "easeInOut" }}
  className="fixed top-[81px] left-0 right-0 z-40 backdrop-blur-lg border-b shadow-sm hidden lg:block"
>
      <div className="px-4 sm:px-6 lg:px-8 lg:py-4 max-w-[120rem] mx-auto">
        <div className="flex items-center justify-between">
<Accordion type="single" collapsible className="relative">
  <AccordionItem value="categories">
    <AccordionTrigger className="flex items-center gap-x-0.5 text-sm font-semibold text-gray-700">
      <BiCategory className="mr-2 size-4" />
      Categories
    </AccordionTrigger>
    <AccordionContent
      className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg border z-50"
    >
      <div className="p-2 space-y-2">
        {categories?.data.map(({id, categoryImage, name})=> (
 <Link href={`/products?categoryId=${id}`} className="w-full flex items-center gap-x-2 group" key={id}>
            <Image
              src={categoryImage}
              alt={name}
              width={50}
              height={50}
           
              className="object-cover overflow-hidden"
              loading="lazy"
            />
       
          <p
            className=" font-semibold text-gray-700 
                       group-hover:text-primary group-hover:underline transition-colors"
          >
            {name}
          </p>
   
    </Link>
        ))}
 
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>


          <nav className="flex space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-6 font-semibold">
            <button
    onClick={() => setOpen(true)} // ✅ open cart sheet
    className="relative text-center flex flex-col gap-y-1 items-center cursor-pointer hover:scale-110 transition-all"
  >
    <ShoppingCart className="size-6" />
    {cartItems && cartItems.length > 0 && (
      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center p-0">
        {cartItems.length}
      </Badge>
    )}
    <span className="block text-xs">Cart</span>
  </button>

  {/* 🚚 Track Order Button */}
  <button
    onClick={() => router.push('/tracking')} 
    className="relative text-center flex flex-col gap-y-1 items-center cursor-pointer hover:scale-110 transition-all"
  >
    <Truck className="size-6" />
    <span className="block text-xs">Track Order</span>
  </button>

    {user ? (
      <Link href={'/profile'} className="flex flex-col items-center hover:scale-105 transition-all">
<Avatar>
  {user?.image && (
    <AvatarImage src={user.image} alt={user?.name || "User"} className="object-cover"/>
  )}
  <AvatarFallback className="bg-purple-600 text-white">
    {user?.name?.charAt(0).toUpperCase() || "U"}
  </AvatarFallback>
</Avatar>

<p className="text-xs font-semibold text-muted-foreground">{user.email}</p>
    </Link>)
       : (
      <Link
              href={"/sign-up"}
              className="text-center flex flex-col gap-y-1 items-center hover:scale-105 transition-all"
            >
              <User2 />
              <span className="text-xs block">Sign Up</span>
            </Link>
    )}
      
          </div>
        </div>
      </div>
    </motion.div>
  )
}
