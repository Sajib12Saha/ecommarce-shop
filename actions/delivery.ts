import { dbDeliveryCharge } from "@/types/type";

export type DeliveryChargeResponse = {
  data: dbDeliveryCharge | null;
};

export const getDeliveryCharges = async (): Promise<DeliveryChargeResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL || process.env.NEXT_PUBLIC_ADMIN_WWW_URL}/api/delivery-charges`
  );

  if (!res.ok) throw new Error("Failed to load delivery charge");

  return await res.json();
};