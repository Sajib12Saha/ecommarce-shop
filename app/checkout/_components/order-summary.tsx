"use client";

interface OrderSummaryProps {
  subTotal: number;
  totalDiscount: number;
  couponCode?: string;
  couponDiscount: number;
  shippingLabel: string;
  shippingCost: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subTotal,
  totalDiscount,
  couponCode,
  couponDiscount,
  shippingLabel,
  shippingCost,
  total,
}) => {
  return (
    <div className="space-y-1 border-t pt-3">
      <div className="flex justify-between text-sm">
        <span>Sub Total:</span>
        <span>BDT {subTotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-sm text-green-600">
        <span>Total Discount:</span>
        <span>- BDT {totalDiscount.toLocaleString()}</span>
      </div>
      {couponDiscount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Coupon ({couponCode}):</span>
          <span>- BDT {couponDiscount.toLocaleString()}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span>Shipping ({shippingLabel}):</span>
        <span>BDT {shippingCost.toLocaleString()}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total:</span>
        <span>BDT {total.toLocaleString()}</span>
      </div>
    </div>
  );
};