import { DeliveryChargeResponse, getDeliveryCharges } from "@/actions/delivery";
import { useQuery } from "@tanstack/react-query";

export function useDeliveryCharges() {
  return useQuery<DeliveryChargeResponse, Error>({
    queryKey: ["delivery-charge"],
    queryFn: () => getDeliveryCharges(),
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}