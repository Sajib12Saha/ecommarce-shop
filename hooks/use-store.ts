import { create } from "zustand";
import { dbProduct } from "@/types/type";

export interface CartItem extends dbProduct {
  cartQuantity: number; // ✅ separate numeric quantity for the cart
}

interface ProductStore {
  cartItems: CartItem[];
  addItem: (item: dbProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<ProductStore>((set) => ({
  cartItems: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...item, cartQuantity: 1 }],
      };
    }),
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id
          ? { ...item, cartQuantity: Math.max(quantity, 1) }
          : item
      ),
    })),
}));


interface GlobalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useOpenStore = create<GlobalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));