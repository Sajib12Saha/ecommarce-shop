import {  orderInput, OrderResponse, postOrder } from "@/actions/order";
import { useState } from "react";

export function usePostOrder() {
  const [data, setData] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (order: orderInput) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postOrder(order);
      setData(response);
      return response;
    } catch (err: any) {
      setError(err.message || "Failed to submit order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, submitOrder };
}
