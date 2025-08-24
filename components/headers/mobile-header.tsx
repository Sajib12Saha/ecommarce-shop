"use client";

import { useState } from "react";
import { Search, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data";
import Link from "next/link";




export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-lg border-b shadow-sm lg:hidden">
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
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
                <SheetTitle className="text-left text-2xl font-bold text-primary">
                  ePahar
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 space-y-6 px-4">
                {/* === Menu Section === */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Menu</h3>
                  <div className="space-y-2">
                    {navLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        className="block w-full text-left text-gray-700 hover:text-primary  py-2 rounded-md transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Link
                      href="#"
                      className="block w-full text-left text-gray-700 hover:text-primary  py-2 rounded-md transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>

                {/* === Account Section === */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Account</h3>
                  <div className="space-y-2">
                    <Link
                      href="#"
                      className="block w-full text-left text-gray-700 hover:text-primary  py-2 rounded-md transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="#"
                      className="block w-full text-left text-gray-700 hover:text-primary  py-2 rounded-md transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </div>

        
              </div>
            </SheetContent>
          </Sheet>

          {/* === Logo === */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-primary">ePahar</h1>
          </div>

          {/* === Search Icon === */}
          <Button variant="ghost" size="icon" className="p-2">
            <Search className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
