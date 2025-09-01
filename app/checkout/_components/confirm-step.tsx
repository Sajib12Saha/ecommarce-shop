"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CartItem } from "@/hooks/use-store";
import { usePostOrder } from "@/hooks/use-post-order"; 
import { useState } from "react";
import { orderInput } from "@/actions/order";
import { Zap } from "lucide-react";

interface Props {
  onBack: () => void;
  customar: {
    name: string;
    mobileNumber: string;
    address: string;
  };
  total: number;
  subTotal: number;
  totalDiscount: number;
  items: CartItem[];
  paymentMethod: string;
  onOrderSuccess?: (order: any) => void; // ✅ parent can catch order response
}

export const ConfirmStep = ({
  onBack,
  customar,
  items,
  subTotal,
  totalDiscount,
  total,
  paymentMethod,
  onOrderSuccess,
}: Props) => {
  const { submitOrder, loading, error} = usePostOrder();
  const [success, setSuccess] = useState(false);
  const [orderResponse, setOrderResponse] = useState<any>(null); // ✅ state to store order data

  const handlePlaceOrder = async () => {
    try {
      const orderData:orderInput = {
        name: customar.name,
        mobileNumber: customar.mobileNumber,
        address: customar.address,
        paymentMethod:paymentMethod,
        totalDiscount:totalDiscount,
        total,
        orderItems:items.map((item)=> ({
          productId:item.id,
          quantity:item.cartQuantity,
        }))
        
      };

      const res = await submitOrder(orderData);
      console.log("✅ Order placed:", res);

      setOrderResponse(res.data); // ✅ save full order info in state
      setSuccess(true);

      if (onOrderSuccess) {
        onOrderSuccess(res.data); // ✅ send to checkout page or parent
      }
    } catch (err) {
      console.error("❌ Order failed:", err);
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg border border-gray-200">
      <CardHeader>
        <h3 className="text-xl font-semibold">Order Confirmation</h3>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-gray-600">Review your order and confirm.</p>

        {/* Shipping Address */}
        <div className="border p-4 rounded-lg bg-gray-50 space-y-1">
          <h4 className="font-semibold text-lg">Shipping Address</h4>
          <p><strong>Name:</strong> {customar?.name}</p>
          <p><strong>Mobile Number:</strong> {customar?.mobileNumber}</p>
          <p><strong>Address:</strong> {customar?.address}</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.cartQuantity}
              </span>
              <span>
                BDT {(item.discountPrice ?? item.price) * item.cartQuantity}
              </span>
            </div>
          ))}
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

        {paymentMethod && (
          <div className="border p-4 rounded-lg bg-gray-50">
            <h4 className="font-semibold text-lg">Payment Method</h4>
            <p>{paymentMethod}</p>
          </div>
        )}

        {/* Status messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <div className="p-3 bg-green-100 border border-green-400 rounded-md">
            🎉 Order placed successfully!  
            <p className="text-sm mt-1">
              Order ID: <span className="font-semibold">{orderResponse?.id}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 mt-4">
          <Button variant="outline" onClick={onBack} disabled={loading}>
            ← Back to Payment
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? (
                  <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" />
                       Placing Order...
                      </div>
            ) : "Place Order"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
