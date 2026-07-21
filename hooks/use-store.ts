import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { dbProductwihtoutAll } from "@/actions/product";

export interface CartItem extends dbProductwihtoutAll {
  cartKey: string;
  cartQuantity: number;
  selectedUnit?: string | null;
  unitLabel?: string | null;
}

interface ProductStore {
  cartItems: CartItem[];
  addItem: (
    item: dbProductwihtoutAll,
    quantity?: number,
    selectedUnit?: string | null,
    unitLabel?: string | null
  ) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
}

// ---- expiry config ----
const CART_EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 day

// wraps localStorage to add a timestamp on write and check it on read
const expiringStorage: StateStorage = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;

    try {
      const { state, timestamp } = JSON.parse(raw);
      if (Date.now() - timestamp > CART_EXPIRY_MS) {
        localStorage.removeItem(name);
        return null; // expired -> treat as empty
      }
      return JSON.stringify({ state });
    } catch {
      localStorage.removeItem(name);
      return null;
    }
  },
  setItem: (name, value) => {
    const { state } = JSON.parse(value);
    localStorage.setItem(name, JSON.stringify({ state, timestamp: Date.now() }));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useCart = create<ProductStore>()(
  persist(
    (set) => ({
      cartItems: [],

      addItem: (item, quantity = 1, selectedUnit = null, unitLabel = null) =>
        set((state) => {
          const cartKey = selectedUnit
            ? `${item.id}-${selectedUnit}${unitLabel}`
            : String(item.id);

          const existingItem = state.cartItems.find(
            (cartItem) => cartItem.cartKey === cartKey
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.cartKey === cartKey
                  ? { ...cartItem, cartQuantity: cartItem.cartQuantity + quantity }
                  : cartItem
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              { ...item, cartKey, cartQuantity: quantity, selectedUnit, unitLabel },
            ],
          };
        }),

      removeItem: (cartKey) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.cartKey !== cartKey),
        })),

      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.cartKey === cartKey
              ? { ...item, cartQuantity: Math.max(quantity, 1) }
              : item
          ),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => expiringStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

interface GlobalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useOpenStore = create<GlobalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));