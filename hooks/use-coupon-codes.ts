
import { CouponCodesResponse, getCouponCodes } from "@/actions/coupon";
import { useQuery } from "@tanstack/react-query";

export function useCouponCodes() {
  return useQuery<CouponCodesResponse, Error>({
    queryKey: ["coupon-codes"],
    queryFn: () => getCouponCodes(),
    staleTime: 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}