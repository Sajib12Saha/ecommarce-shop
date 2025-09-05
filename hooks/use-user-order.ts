import { getOrders, GetOrdersResponse } from "@/actions/order";
import { useQuery } from "@tanstack/react-query";

interface UseOrdersByUserOptions {
  page?: number;
  pageSize?: number;
  userId?: string;
}

export const useOrdersByUser = (options: UseOrdersByUserOptions) => {
  return useQuery<GetOrdersResponse, Error>({
    queryKey: ["ordersByUser", options],
    queryFn: () =>
      getOrders(
        options.page ?? 1,
        options.pageSize ?? 20,
        options.userId // ✅ fixed comma + type-safe
      ),
    staleTime: 2 * 60 * 1000, // 2 min
    gcTime: 5 * 60 * 1000, // 5 min
    placeholderData: (prev) => prev, // keep old data while fetching new
  });
};


