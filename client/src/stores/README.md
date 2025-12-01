# 🏪 Stores Documentation - Zustand State Management

**Location:** `/client/src/stores`  
**Count:** 3+ stores  
**Library:** Zustand  
**Type:** Global state management

---

## 📋 Overview

Zustand stores manage global client-side state that's independent of server state. Each store is a dedicated piece of state with its own actions and selectors.

---

## 🛒 cartStore.ts

**Shopping Cart State Management**

Manages the shopping cart independently of server state.

```typescript
import { useStore } from '@/stores/cartStore';

function CartComponent() {
  const { items, total, addItem, removeItem, updateQuantity } = useStore();
  
  return (
    <div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### Store Structure

```typescript
interface CartItem {
  id: number;           // Unique ID
  productId: number;    // Product ID
  quantity: number;     // Item quantity
  price: number;        // Price per unit
  product?: Product;    // Optional product data
}

interface CartStore {
  // State
  items: CartItem[];
  
  // Actions
  addItem(product: Product, quantity: number): void;
  removeItem(productId: number): void;
  updateQuantity(productId: number, quantity: number): void;
  clear(): void;
  
  // Computed
  total: number;
  itemCount: number;
}
```

### Usage Examples

**Add to Cart:**
```typescript
const { addItem } = useStore();

addItem({ id: 1, name: 'Product', price: 1000 }, 2);
```

**Update Quantity:**
```typescript
const { updateQuantity } = useStore();

updateQuantity(1, 5);  // Update product 1 quantity to 5
```

**Get Total:**
```typescript
const total = useStore((state) => {
  return state.items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
});
```

**Clear Cart:**
```typescript
const { clear } = useStore();

clear();  // Remove all items
```

### Persistence

Cart data can be persisted to localStorage:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      // Store implementation
    }),
    { name: 'cart-storage' }  // localStorage key
  )
);
```

---

## 🔄 comparisonStore.ts

**Product Comparison State**

Manage products being compared side-by-side.

```typescript
import { useComparisonStore } from '@/stores/comparisonStore';

function ProductComparison() {
  const { products, addProduct, removeProduct } = useComparisonStore();
  
  return (
    <div>
      <ComparisonTable products={products} />
    </div>
  );
}
```

### Store Structure

```typescript
interface ComparisonStore {
  // State
  products: Product[];
  
  // Actions
  addProduct(product: Product): void;
  removeProduct(productId: number): void;
  clear(): void;
  
  // Computed
  hasProduct(productId: number): boolean;
  count: number;
}
```

### Usage Examples

**Add Product:**
```typescript
const { addProduct } = useComparisonStore();

addProduct(product);
```

**Remove Product:**
```typescript
const { removeProduct } = useComparisonStore();

removeProduct(productId);
```

**Check if Product Added:**
```typescript
const { hasProduct } = useComparisonStore();

if (hasProduct(productId)) {
  // Product already in comparison
}
```

---

## 🔐 authStore.ts

**Authentication State**

Manage current user and auth status.

```typescript
import { useAuthStore } from '@/stores/authStore';

function ProfileComponent() {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <div>Welcome, {user?.firstName}!</div>;
}
```

### Store Structure

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  profileImageUrl?: string;
  phone?: string;
}

interface AuthStore {
  // State
  user: User | null;
  token: string | null;
  
  // Actions
  login(user: User, token: string): void;
  logout(): void;
  updateUser(user: Partial<User>): void;
  
  // Computed
  isAuthenticated: boolean;
  isAdmin: boolean;
}
```

### Usage Examples

**Check Authentication:**
```typescript
const { isAuthenticated } = useAuthStore();

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}
```

**Check Admin Role:**
```typescript
const { isAdmin } = useAuthStore();

if (!isAdmin) {
  return <Navigate to="/" />;
}
```

**Get Current User:**
```typescript
const { user } = useAuthStore();

<p>{user?.email}</p>
```

---

## 🏗️ Store Creation Pattern

### Basic Store Template

```typescript
import { create } from 'zustand';

interface MyStore {
  // State
  value: string;
  
  // Actions
  setValue: (value: string) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  value: '',
  
  setValue: (value) => set({ value })
}));
```

### Store with Computed Values

```typescript
export const useMyStore = create<MyStore>((set, get) => ({
  items: [],
  
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  // Computed via function
  getTotal: () => get().items.reduce((sum, item) => sum + item.price, 0),
  
  // Or via getter
  get total() {
    return get().items.reduce((sum, item) => sum + item.price, 0);
  }
}));
```

### Store with Middleware

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMyStore = create(
  persist(
    (set) => ({
      // Store implementation
    }),
    {
      name: 'my-storage',      // localStorage key
      partialize: (state) => ({ // Selective persistence
        // Only persist these fields
      })
    }
  )
);
```

---

## 🎯 Selector Pattern

### Efficient Selectors

```typescript
// Bad - Causes re-render on any store change
const { items, total, addItem } = useStore();

// Good - Only subscribe to needed fields
const items = useStore((state) => state.items);
const total = useStore((state) => state.total);
const addItem = useStore((state) => state.addItem);
```

### Create Hooks from Selectors

```typescript
// Extract selectors
export const useItems = () => useStore((state) => state.items);
export const useTotal = () => useStore((state) => state.total);
export const useAddItem = () => useStore((state) => state.addItem);

// Use in components
function Component() {
  const items = useItems();
  const total = useTotal();
  const addItem = useAddItem();
}
```

---

## 🔗 Store Composition

### Multiple Stores

```typescript
// Cart store
const { items: cartItems } = useCartStore();

// Auth store  
const { user } = useAuthStore();

// Comparison store
const { products: comparedProducts } = useComparisonStore();

function Dashboard() {
  return (
    <div>
      <CartSummary items={cartItems} />
      <UserGreeting user={user} />
      <ComparisonWidget products={comparedProducts} />
    </div>
  );
}
```

---

## 📊 Performance Considerations

### Memoization

```typescript
// Memoize expensive computations
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}, [items]);
```

### Selective Subscriptions

```typescript
// Subscribe only to needed fields
const itemCount = useStore((state) => state.items.length);

// This component won't re-render when total changes
```

---

## 🧪 Testing

### Mock Store

```typescript
// Mock for testing
const mockStore = {
  items: [],
  addItem: jest.fn(),
  removeItem: jest.fn()
};

jest.mock('@/stores/cartStore', () => ({
  useCartStore: () => mockStore
}));
```

### Testing Store Logic

```typescript
describe('Cart Store', () => {
  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());
    
    act(() => {
      result.current.addItem(product, 1);
    });
    
    expect(result.current.items).toHaveLength(1);
  });
});
```

---

**Stores Documentation Version:** 1.0  
**Last Updated:** December 1, 2025
