"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart, useOpenStore } from "@/hooks/use-store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const Cart = () => {
  const router = useRouter()
  const { cartItems, removeItem, updateQuantity } = useCart();
  const { open, setOpen } = useOpenStore();

  const remove = (id: string) => {
    removeItem(id);
    toast.success("Item removed from cart");
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountPrice ? item.discountPrice : item.price) * item.cartQuantity,
    0
  );
  const onCheckout = () => {
 router.push('/checkout')
 setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {cartItems.length > 0 ? (
        <SheetContent className="flex flex-col space-y-6 bg-gray-50">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                {/* Product Image */}
                <Image
                  src={item.productImage}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />

                {/* Product Info */}
                <div className="flex flex-col flex-1 mx-4">
                  <p className="text-sm font-medium truncate">{item.name}</p>

                  {item.discountPrice ? (
                    <p className="text-sm">
                      <span className="line-through text-gray-400 mr-2">
                        BDT {item.price}
                      </span>
                      <span className="font-semibold text-green-600">
                        BDT {item.discountPrice}
                      </span>
                      <span className="ml-2 text-gray-600">
                        x {item.cartQuantity} ={" "}
                        <span className="font-medium">
                          BDT {item.discountPrice * item.cartQuantity}
                        </span>
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      BDT {item.price} x {item.cartQuantity} ={" "}
                      <span className="font-medium">
                        BDT {item.price * item.cartQuantity}
                      </span>
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <Button
                      onClick={() =>
                        updateQuantity(item.id, item.cartQuantity - 1)
                      }
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                    >
                      -
                    </Button>
                    <p className="text-sm font-medium">{item.cartQuantity}</p>
                    <Button
                      onClick={() =>
                        updateQuantity(item.id, item.cartQuantity + 1)
                      }
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(item.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <SheetFooter className="border-t pt-4">
            <div className="flex justify-between items-center w-full mb-4">
              <p className="text-base font-semibold">Total</p>
              <p className="text-lg font-bold text-primary">BDT {totalPrice}</p>
            </div>
            <Button className="w-full"onClick={()=> onCheckout()}>Proceed to Checkout</Button>
          </SheetFooter>
        </SheetContent>
      ) : (
        <SheetContent>
          <SheetHeader className="flex items-center justify-center h-full w-full">
            <SheetTitle className="text-gray-600 text-lg">
              Your cart is empty 🛒
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};
