
import { dbBillboard } from "@/types/type";

export type BillboardsResponse = {
  data: dbBillboard[];
};

export const getBillboards = async (): Promise<BillboardsResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/billboards`,
    {
     next:{revalidate:120}
    }
  );

  if (!res.ok) throw new Error("Failed to load billboard");
  return await res.json();
};
