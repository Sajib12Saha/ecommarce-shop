"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Tag, X } from "lucide-react";
import { useCouponCodes } from "@/hooks/use-coupon-codes";
import { CartItem } from "@/hooks/use-store";

export type CouponResult = {
  success: boolean;
  code?: string;
  discountType?: "percentage";
  discountValue?: number;
  discountCategories?: string[];
};

interface CouponInputProps {
  subTotal: number;
  appliedCoupon: CouponResult | null;
  setAppliedCoupon: (coupon: CouponResult | null) => void;
  couponDiscount: number;
  checkoutItems: CartItem[];
}

export const CouponInput: React.FC<CouponInputProps> = ({
  subTotal,
  appliedCoupon,
  setAppliedCoupon,
  couponDiscount,
  checkoutItems,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const { data: couponRes, isLoading: isLoadingCoupons } = useCouponCodes();

    console.log(couponRes?.data)

  const handleApplyCoupon = () => {
    const code = couponCode.trim();
    if (!code) return;

    setCouponError(null);

    const allCoupons = couponRes?.data ?? [];
  
    const match = allCoupons.find(
      (c) => c.couponCode.toLowerCase() === code.toLowerCase()
    );

    if (!match) {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
      return;
    }

    if (match.status !== "active") {
      setAppliedCoupon(null);
      setCouponError(
        match.status === "expired"
          ? "This coupon has expired"
          : "This coupon is not active yet"
      );
      return;
    }


    const categoryIds = match.categories.map((c) => c.categoryId);
    const appliesToAllCategories = categoryIds.length === 0;
    const hasEligibleItem =
      appliesToAllCategories ||
      checkoutItems.some((item) => categoryIds.includes(item.categoryId));

    if (!hasEligibleItem) {
      setAppliedCoupon(null);
      setCouponError("This coupon doesn't apply to any items in your cart");
      return;
    }

    setAppliedCoupon({
      success: true,
      code: match.couponCode,
      discountType: "percentage",
      discountValue: match.discountPercentage,
      discountCategories: categoryIds,
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
  };

  return (
    <div className="border-t pt-4">
      <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
        <Tag className="w-4 h-4" /> Coupon Code
      </label>

      {appliedCoupon?.success ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <div>
            <p className="text-sm font-medium text-green-700">
              {appliedCoupon.code} applied
            </p>
            <p className="text-xs text-green-600">
              You saved BDT {couponDiscount.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
              if (couponError) setCouponError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
            placeholder="Enter coupon code"
            disabled={isLoadingCoupons}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || isLoadingCoupons}
          >
            {isLoadingCoupons ? <Loader2 className="size-4 animate-spin" /> : "Apply"}
          </Button>
        </div>
      )}

      {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
    </div>
  );
};