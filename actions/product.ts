import { dbProduct } from "@/types/type";

export type ProductsResponse = {
  data: dbProduct[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export const getProducts = async (page?: number): Promise<ProductsResponse> => {
  // If page is provided, use it; otherwise fetch all products
  const url = page
    ? `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/products?page=${page}`
    : `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/products`;

  const res = await fetch(url, { next:{revalidate:120}});

  if (!res.ok) throw new Error("Failed to load Products");

  return await res.json();
};

