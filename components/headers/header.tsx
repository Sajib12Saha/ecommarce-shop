import { MessageSquare, Phone, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden lg:block bg-white shadow-sm">
      <div className="max-w-[120rem] mx-auto border-b">
        <div className="backdrop-blur-lg px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src={"/logo.jpg"}
                alt="Hillora"
                width={100}
                height={60}
                className="object-contain overflow-hidden"
              />
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search your product"
                  className="w-full pl-4 pr-12 py-2 "
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Hotline Section */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-gray p-2 rounded-lg shadow-sm text-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <a
                  href="https://wa.me/8801321208940?text=হ্যালো, আমি একটি পণ্য অর্ডার করতে চাই।"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-semibold hover:underline "
                >
                  WhatsApp: +8801321208940
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600 font-semibold">হট লাইন: 09642-922922</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
