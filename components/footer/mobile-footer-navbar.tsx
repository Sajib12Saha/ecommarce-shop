import { Home, ShoppingBasket, Truck, User } from "lucide-react";
import Link from "next/link";
import { BiCategory } from "react-icons/bi"

export const navLinks = [
  { Icon: Home, href: "/" },
  { Icon: BiCategory, href: "/categories" },
{ Icon: ShoppingBasket, href: "/products" },
  { Icon: Truck, href: "/tracking" },
  { Icon: User, href: "/sign-up" },
];

export const MobileFooterNavbar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary backdrop-blur-lg shadow-sm lg:hidden">
            <div className="px-6 ">
                <div className="h-14 relative flex justify-between items-center">
                {navLinks.map(({href, Icon}, i)=> (
                    <Link href={href} key={i}>
                        <Icon className="size-6 text-white"/>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    )
}