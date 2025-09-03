"use client";

import { useState } from "react";
import { Search, Menu, ShoppingCart, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks, siteMeta } from "@/data";
import Link from "next/link";
import Image from "next/image";
import { useCart, useOpenStore } from "@/hooks/use-store";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const router = useRouter();
  const { setOpen } = useOpenStore();
  const { cartItems } = useCart();

  const handleSearch = () => {
    router.push(`/products/product?${searchProduct}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b shadow-sm lg:hidden">
      <div className="px-6">
        <div className="flex items-center justify-between h-14 relative">
          {/* === Hamburger Menu === */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85%] max-w-sm overflow-y-auto px-2"
            >
              <SheetHeader>
                <SheetTitle className="sr-only"> Mobile Header</SheetTitle>
                <Image
                  src={"/logo.jpg"}
                  alt={`${siteMeta.siteName}`}
                  width={100}
                  height={60}
                  className="object-contain overflow-hidden"
                />
              </SheetHeader>

              <div className="mt-8 space-y-6">
                {/* === Menu Section === */}
                <div>
                  <h3 className="font-semibold text-white mb-3 w-full bg-primary p-2">
                    Menu
                  </h3>
                  <div className="space-y-2 px-4">
                    {navLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="block w-full text-left text-gray-700 hover:text-primary py-2 rounded-md transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="#"
                      className="block w-full text-left text-gray-700 hover:text-primary py-2 rounded-md transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>

                {/* === Account Section === */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-white mb-3 p-2 w-full bg-primary ">
                    Account
                  </h3>
                  <div className="space-y-2 px-4">
                    <Link
                      href="#"
                      className="block w-full text-left text-gray-700 hover:text-primary py-2 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* === Logo === */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/logo.jpg"
              alt={`${siteMeta.siteName}`}
              width={100}
              height={60}
              className="object-contain overflow-hidden"
            />
          </div>

          {/* === Cart + Search Button === */}
          <div className="flex items-center gap-x-2">
            <button onClick={() => setOpen(true)} className="relative">
              <ShoppingCart className="size-6" />
              {cartItems && cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-2 size-4 rounded-full text-xs flex items-center justify-center p-0">
                  {cartItems.length}
                </Badge>
              )}
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              onClick={() => setShowSearch(true)}
            >
              <Search className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* === Fullscreen Search Overlay === */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/95  flex items-center px-4"
          >
  <div className="relative w-full max-w-sm">
  <Input
    type="text"
    placeholder="Search product..."
    className="pr-10 h-10" // add right padding so text doesn't overlap button
    autoFocus
    onChange={(value)=> setSearchProduct(value.currentTarget.value)}
    value={searchProduct}

  />
  <Button
    variant="ghost"
    size="icon"
    className="absolute right-1 top-1/2 -translate-y-1/2"
    type="button"
    onClick={()=> handleSearch()}
  >
    <Search className="size-5" />
  </Button>
</div>

        
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setShowSearch(false)}
            >
              <X className="size-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
