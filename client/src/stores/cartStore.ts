import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@shared/schema';

export interface CartProduct extends Product {
  quantity: number;
  cartItemId?: number; // server cart item ID
}

interface CartState {
  items: CartProduct[];
  isOpen: boolean;
  isLoading: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  syncFromServer: (items: any[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      syncFromServer: (items: any[]) => {
        // Map server cart items to local store format
        const mappedItems = items.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          cartItemId: item.id,
        }));
        set({ items: mappedItems });
      },

      addItem: async (product: Product, quantity: number = 1) => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, quantity }),
          });

          if (!response.ok) throw new Error('خطا در اضافه کردن به سبد خرید');

          const cartItem = await response.json();
          set((state) => {
            const existingItem = state.items.find((item) => item.id === product.id);
            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity, cartItemId: cartItem.id }
                    : item
                ),
              };
            }
            return {
              items: [...state.items, { ...product, quantity, cartItemId: cartItem.id }],
            };
          });
        } catch (error) {
          console.error('خطا:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (productId: number) => {
        set({ isLoading: true });
        try {
          const item = get().items.find((i) => i.id === productId);
          if (!item?.cartItemId) return;

          const response = await fetch(`/api/cart/${item.cartItemId}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('خطا در حذف محصول');

          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
          }));
        } catch (error) {
          console.error('خطا:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (productId: number, quantity: number) => {
        if (quantity <= 0) {
          await get().removeItem(productId);
          return;
        }

        set({ isLoading: true });
        try {
          const item = get().items.find((i) => i.id === productId);
          if (!item?.cartItemId) return;

          const response = await fetch(`/api/cart/${item.cartItemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
          });

          if (!response.ok) throw new Error('خطا در به‌روز‌رسانی تعداد');

          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          }));
        } catch (error) {
          console.error('خطا:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/cart', { method: 'DELETE' });
          if (!response.ok) throw new Error('خطا در خالی کردن سبد خرید');
          set({ items: [] });
        } catch (error) {
          console.error('خطا:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.price) * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
