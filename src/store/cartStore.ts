"use client";

import { create } from "zustand";
import { Product } from "@/types/types";

interface CartItem {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
  price: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number, maxAvailable: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, quantity = 1) => {
    // Нельзя добавить, если на складе нет
    if (product.quantity <= 0) return;

    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        // Не превышаем остаток
        const newQty = Math.min(existing.quantity + quantity, product.quantity);
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: newQty } : i,
          ),
        };
      }

      // Новый товар
      const qty = Math.min(quantity, product.quantity);
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            name: product.name,
            subtitle: product.subtitle,
            image: product.image,
            price: product.price,
            quantity: qty,
          },
        ],
      };
    });
  },

  updateQuantity: (id, quantity, maxAvailable) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    const clamped = Math.min(quantity, maxAvailable);

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: clamped } : i,
      ),
    }));
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => {
      const price = parseFloat(i.price);
      return sum + (isNaN(price) ? 0 : price * i.quantity);
    }, 0),
}));
