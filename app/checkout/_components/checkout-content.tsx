"use client";


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaShoppingCart } from "react-icons/fa";
import { useCart, CartItem } from "@/hooks/use-store";
import { useProducts } from "@/hooks/use-products";
import { useState, useMemo } from "react";
import PaymentStep from "./payment-step";
import CartShippingStep from "./cart-step";
import { ConfirmStep } from "./confirm-step";
import { InvoiceOrder } from "./invoice-order";

interface Props {
    productId?:string;
}

export const CheckoutContent = ({productId}:Props) => {

      const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | "">("");
    const [orderResponse, setOrderResponse] = useState<any>(null);
    const { cartItems } = useCart();
  const { data: products, loading } = useProducts();

      // ✅ unify items
  const checkoutItems: CartItem[] = useMemo(() => {
    if (productId && products) {
      const found = products.data.find((p) => p.id === productId);
      return found ? [{ ...found, cartQuantity: 1 }] : [];
    }
    return cartItems;
  }, [productId, products, cartItems]);

  // ✅ totals
  const subTotal = checkoutItems.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );

  const totalDiscount = checkoutItems.reduce(
    (acc, item) =>
      acc + (item.price - (item.discountPrice ?? item.price)) * item.cartQuantity,
    0
  );

  const total = subTotal - totalDiscount;

    return (
        <>
        
    {
      orderResponse ? <InvoiceOrder order={orderResponse}/> : (
        <>
          <div className="mb-10">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            {[1, 2, 3].map((s, idx) => (
              <div key={s} className="flex flex-col items-center flex-1 relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-colors duration-300 ${
                    step >= s
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-300 text-gray-500"
                  }`}
                >
                  {s === 1 ? <FaShoppingCart /> : s}
                </div>
                <span
                  className={`text-sm mt-2 font-medium ${
                    step >= s ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {s === 1 && "Cart & Shipping"}
                  {s === 2 && "Payment"}
                  {s === 3 && "Confirm"}
                </span>
                {idx < 2 && (
                  <div
                    className={`absolute top-6 left-full w-full h-[2px] ${
                      step > s ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <CartShippingStep
                items={checkoutItems}
                loading={loading}
                subTotal={subTotal}
                totalDiscount={totalDiscount}
                total={total}
                onNext={(data) => {
                  setShippingData(data);
                  setStep(2);
                }}
              />
            )}

            {step === 2 && (
              <PaymentStep
                subTotal={subTotal}
                totalDiscount={totalDiscount}
                total={total}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                selectedPayment={paymentMethod}   
                onSelectPayment={(method) => setPaymentMethod(method)}
              />
            )}

            {step === 3 && shippingData && (
              <ConfirmStep
                customar={shippingData}
                items={checkoutItems}
                subTotal={subTotal}
                totalDiscount={totalDiscount}
                total={total}
                paymentMethod={paymentMethod} 
                onBack={() => setStep(2)}
                onOrderSuccess={setOrderResponse}  // ✅ pass setter
              />
            )}

            {/* ✅ Show Invoice after order success */}
            {orderResponse && (
              <div className="p-6 border rounded-xl bg-white shadow-md">
                <h3 className="text-lg font-bold text-green-600 mb-2">
                  🎉 Order Placed Successfully!
                </h3>
                <p><strong>Invoice ID:</strong> {orderResponse.id}</p>
                <p><strong>Status:</strong> {orderResponse.status}</p>
                <p><strong>Total Paid:</strong> BDT {orderResponse.total}</p>
              </div>
            )}
          </div>

          {/* Right Summary */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-md border border-gray-200">
              <CardHeader>
                <h3 className="text-xl font-semibold">Cart Summary</h3>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : checkoutItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-6">
                    {productId ? "No product found." : "Your cart is empty."}
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Sub Total:</span>
                      <span>BDT {subTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount:</span>
                      <span>- BDT {totalDiscount}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                      <span>Total:</span>
                      <span className="">BDT {total}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        </>

      )
    }
        </>
    )
}