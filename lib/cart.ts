'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FlavorId, FormatId } from './products';

export interface CartItem {
  id: string;
  slug: string;
  flavorId: FlavorId;
  flavorName: string;
  formatId: FormatId;
  formatLabel: string;
  volume: string;
  price: number;
  quantity: number;
  colorFrom: string;
  colorTo: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = `${item.slug}-${item.formatId}`;
        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
            ),
            isOpen: true,
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, id, quantity: item.quantity ?? 1 }],
            isOpen: true,
          }));
        }
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    { name: 'don-peper-cart' }
  )
);
