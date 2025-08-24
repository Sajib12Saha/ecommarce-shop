import { Button } from "@/components/ui/button";
import { navLinks } from "@/data";
import { AlignLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";


const headerActions = [
  {
    icon: ShoppingCart,
    label: "Cart",
    count: 1,
  },
];

export function Navigation() {
  return (
    <div className="fixed top-28 left-0 right-0 z-50  backdrop-blur-lg border-b shadow-sm hidden lg:block">
      <div className="px-4 sm:px-6 lg:px-8 lg:py-4 max-w-[120rem] mx-auto">
        <div className="flex items-center justify-between h-12">
        

        

            <Button className="px-6 py-2 rounded-md">
              <AlignLeft className="mr-2 h-4 w-4" />
              Categories
            </Button>

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
          <div className="flex  items-center space-x-6">
            {headerActions.map(({ icon: Icon, label, count }, index) => (
              <div key={index} className="relative text-center">
                <Icon className="size-6 text-gray-600" />
                {count > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center p-0">
                    {count}
                  </Badge>
                )}
                <span className="block text-xs text-gray-600 mt-1">{label}</span>
              </div>
            ))}
          </div>

       
        </div>
      </div>
    </div>
  );
}
