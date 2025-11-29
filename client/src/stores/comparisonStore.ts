import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@shared/schema';

interface ComparisonState {
  items: Product[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearComparison: () => void;
  toggleComparison: () => void;
  openComparison: () => void;
  closeComparison: () => void;
  hasItem: (productId: number) => boolean;
  getItemCount: () => number;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return state;
          return {
            items: [...state.items, product],
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      clearComparison: () => {
        set({ items: [] });
      },

      toggleComparison: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openComparison: () => {
        set({ isOpen: true });
      },

      closeComparison: () => {
        set({ isOpen: false });
      },

      hasItem: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'comparison-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
