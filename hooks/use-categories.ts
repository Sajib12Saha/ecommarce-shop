import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse, getCategories } from "@/actions/category";

/* ✅ Custom hook for categories */
export function useCategories(page?: number) {
  return useQuery<CategoriesResponse, Error>({
    queryKey: ["categories", page], // cache key depends on page
    queryFn: () => getCategories(page),
    staleTime: 120 * 1000,   // keep fresh for 2 minutes
    gcTime: 10 * 60 * 1000,   // garbage collect after 10 minutes
    placeholderData: (prev) => prev, // keep previous data during fetch
  });
}
