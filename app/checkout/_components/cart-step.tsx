"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormField,
} from "@/components/ui/form";

import Image from "next/image";
import { CartItem } from "@/hooks/use-store";
import { CustomForm } from "@/components/ui/custom-form";

// ✅ Schema with zod
const shippingSchema = z.object({
  name: z.string().min(2, "নাম লিখুন"),
  mobileNumber: z
    .string()
    .regex(/^(?:\+88)?01[3-9]\d{8}$/, "একটি সঠিক মোবাইল নাম্বার লিখুন"),
  address: z.string().min(5, "ঠিকানা লিখুন"),
});

type ShippingForm = z.infer<typeof shippingSchema>;

interface Props {
  items: CartItem[];
  loading: boolean;
  subTotal: number;
  totalDiscount: number;
  total: number;
  onNext: (shippingAddress: ShippingForm) => void;
}

export default function CartShippingStep({
  items,
  loading,
  subTotal,
  totalDiscount,
  total,
  onNext,
}: Props) {
  const form = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      address: "",
    },
  });

  const handleSubmit = (data: ShippingForm) => {
    onNext(data);
  };


  return (
    <Card className="rounded-2xl shadow-lg border border-gray-200">
      <CardHeader>
        <h3 className="text-xl font-semibold">Cart & Shipping</h3>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Cart Section */}
        <div>
          <h4 className="font-medium mb-3">Cart Review</h4>
          {loading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-14 h-14 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-gray-500 text-center py-6">Your cart is empty.</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  <Image
                    src={item.productImage}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-md object-cover border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.cartQuantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-700">
                    BDT {(item.discountPrice ?? item.price) * item.cartQuantity}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-1 border-t pt-3">
          <div className="flex justify-between text-sm">
            <span>Sub Total:</span>
            <span>BDT {subTotal}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount:</span>
            <span>- BDT {totalDiscount}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>BDT {total}</span>
          </div>
        </div>

        {/* Shipping Section with shadcn Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <h4 className="font-medium mb-3">Shipping Address</h4>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <CustomForm
                  field={field}
                  fieldType="input"
                  inputType="text"
                  label="Your Name"
                  placeHolder="Enter your full name"
                  important
                               />
              )}
            />

            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <CustomForm
                  field={field}
                  fieldType="input"
                  inputType="text"
                  label="Your Mobile Number"
                  placeHolder="Enter your mobile number"
                  important
                          />
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                      <CustomForm
                  field={field}
                  fieldType="textarea"
                  label="Your Address"
                  placeHolder="Enter your address"
                  important/>
         
              )}
            />


         

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={items.length === 0}
            >
              Continue to Payment →
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
