import { dbCouponCode } from "@/types/type";

export type CouponCodesResponse = {
  data: dbCouponCode[];
  total: number;
};

export const getCouponCodes = async (): Promise<CouponCodesResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_ADMIN_WWW_URL}/api/coupon-codes`
  );

  if (!res.ok) throw new Error("Failed to load coupon codes");

  return await res.json();
};