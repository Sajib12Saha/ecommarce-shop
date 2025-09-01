"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

 const paymentMethods = [
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when the product arrives at your door.",
      gradient: "bg-gradient-to-tr from-gray-100 to-gray-200",
      textColor: "text-gray-800",
      image: "/logo/cod.png",
    },
    // {
    //   id: "bkash",
    //   name: "Bkash",
    //   description: "Send payment via Bkash mobile app.",
    //   gradient: "bg-gradient-to-tr from-pink-100 to-rose-200",
    //   textColor: "text-gray-800",
    //   image: "/logo/bkash.svg",
    // },
    // {
    //   id: "nagad",
    //   name: "Nagad",
    //   description: "Send payment via Nagad mobile app.",
    //   gradient: "bg-gradient-to-tr from-orange-100 to-orange-200",
    //   textColor: "text-gray-800",
    //   image: "/logo/nagad.svg",
    // },
  ];


interface Props {
  subTotal: number;
  totalDiscount: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
  selectedPayment?: string | null;
  onSelectPayment?: (method: string) => void;
}

export default function PaymentStep({
  subTotal,
  totalDiscount,
  total,
  onNext,
  onBack,
  selectedPayment,
  onSelectPayment,

}: Props) {
    const [localSelected, setLocalSelected] = useState<string>(selectedPayment ?? "");

  const handleSelect = (id: string) => {
    setLocalSelected(id);
    onSelectPayment?.(id); // update parent state
  };

 
  return (
    <div className="space-y-6">
      {/* Totals */}
      <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow">
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

      {/* Payment Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {paymentMethods.map((method) => {
          const isSelected = selectedPayment === method.id;

          return (
            <Card
              key={method.id}
              onClick={() => handleSelect(method.id)}
              className={`cursor-pointer transition-transform hover:scale-105 shadow-lg rounded-xl border-2 flex flex-col items-center text-center p-6 ${
                isSelected
                  ? "border-yellow-400 ring-2 ring-yellow-200"
                  : "border-transparent"
              } ${method.gradient}`}
            >
              {/* Image on top */}
              <div>
                <Image
                  src={method.image}
                  alt={method.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* Text below image */}
              <h4 className={`font-semibold text-lg ${method.textColor}`}>
                {method.name}
              </h4>
              <p className={`text-sm ${method.textColor}`}>{method.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-3 mt-6">
        <Button variant="outline" className="bg-transparent"  onClick={onBack}>
          ← Back to Shipping
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedPayment}
          className=""
        >
          Continue to Confirm →
        </Button>
      </div>
    </div>
  );
}
