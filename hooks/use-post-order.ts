import { orderInput, postOrder } from "@/actions/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostOrder() {
  const queryClient = useQueryClient();

  // mutation object
  const mutation = useMutation({
    mutationKey: ["postOrder"],
    mutationFn: async (order: orderInput) => await postOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ordersByUser"] });
    },
  });

  // return properties explicitly
  return {
    data: mutation.data,
    error: mutation.error?.message || null,
    isLoading: mutation.isPending,     
    submitOrder: mutation.mutateAsync,  // call to trigger mutation
  };
}
