# 🎣 Hooks Documentation - Custom React Hooks

**Location:** `/client/src/hooks`  
**Count:** 8+ custom hooks  
**Purpose:** Reusable hook logic  
**Framework:** React 18+

---

## 📋 Available Hooks

### use-toast.ts

**Toast Notification Hook**

Display temporary notifications to users.

```typescript
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Success!",
      description: "Action completed",
      variant: "default" // or "destructive"
    });
  };
  
  return <button onClick={handleAction}>Action</button>;
}
```

**Usage Variants:**

```typescript
// Success message
toast({ title: "Success!" });

// Error message
toast({ 
  title: "Error",
  description: "Something went wrong",
  variant: "destructive" 
});

// With duration
toast({ 
  title: "Info",
  duration: 3000 // milliseconds
});
```

---

### useAuth.ts

**Authentication Hook**

Access current user and auth status.

```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isLoading, isAuthenticated } = useAuth();
  
  if (isLoading) return <Skeleton />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <div>Welcome, {user?.firstName}!</div>;
}
```

**Properties:**

```typescript
{
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    profileImageUrl?: string;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
}
```

---

### useCart.ts

**Shopping Cart Hook**

Manage shopping cart state.

```typescript
import { useCart } from '@/hooks/use-cart';

function CartPage() {
  const { items, total, addItem, removeItem, updateQuantity } = useCart();
  
  return (
    <div>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={(qty) => updateQuantity(item.id, qty)}
          onRemove={() => removeItem(item.id)}
        />
      ))}
      <div>Total: {total}</div>
    </div>
  );
}
```

**Methods:**

```typescript
{
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
}
```

---

### useFilters.ts

**Product Filter Hook**

Manage product filtering and search.

```typescript
import { useFilters } from '@/hooks/use-filters';

function ProductsPage() {
  const { filters, setFilters, applyFilters } = useFilters();
  
  const { data: products } = useQuery({
    queryKey: ['/api/products', filters],
    queryFn: () => fetchProducts(filters)
  });
  
  return (
    <div>
      <FilterPanel
        filters={filters}
        onChange={setFilters}
      />
      <ProductGrid products={products} />
    </div>
  );
}
```

**Filter Types:**

```typescript
{
  category?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sort?: 'newest' | 'price_low' | 'price_high' | 'popular';
  search?: string;
  page?: number;
  limit?: number;
}
```

---

### usePagination.ts

**Pagination Hook**

Handle pagination logic.

```typescript
import { usePagination } from '@/hooks/use-pagination';

function DataTable() {
  const { page, limit, total, goToPage, nextPage, prevPage } = usePagination(
    { initialPage: 1, itemsPerPage: 20, total: 100 }
  );
  
  return (
    <div>
      <Table data={data} />
      <Pagination
        current={page}
        total={Math.ceil(total / limit)}
        onPageChange={goToPage}
      />
    </div>
  );
}
```

**Methods:**

```typescript
{
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}
```

---

### useSearch.ts

**Search Functionality Hook**

Handle search with debouncing.

```typescript
import { useSearch } from '@/hooks/use-search';

function SearchComponent() {
  const { query, results, isSearching, setQuery } = useSearch();
  
  return (
    <div>
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      
      {isSearching && <Spinner />}
      
      <SearchResults results={results} />
    </div>
  );
}
```

**Features:**

- Automatic debouncing (300ms)
- Cancels previous requests
- Handles loading state
- Error handling

---

### useFormValidation.ts

**Form Validation Hook**

Validate form data with Zod schemas.

```typescript
import { useFormValidation } from '@/hooks/use-form-validation';
import { productSchema } from '@shared/schema';

function ProductForm() {
  const { values, errors, isValid, validate, setField } = useFormValidation(
    productSchema,
    { name: '', price: '' }
  );
  
  const handleSubmit = async () => {
    if (validate()) {
      // Submit form
    }
  };
  
  return (
    <form>
      <input
        value={values.name}
        onChange={(e) => setField('name', e.target.value)}
      />
      {errors.name && <Error>{errors.name}</Error>}
      
      <button disabled={!isValid} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}
```

---

### useDebounce.ts

**Debounce Hook**

Debounce any value.

```typescript
import { useDebounce } from '@/hooks/use-debounce';

function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  const { data: results } = useQuery({
    queryKey: ['/api/search', debouncedQuery],
    queryFn: () => search(debouncedQuery),
    enabled: debouncedQuery.length > 0
  });
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results results={results} />
    </div>
  );
}
```

---

## 🎯 Hook Creation Pattern

### Basic Hook Template

```typescript
import { useState, useEffect } from 'react';

export function useMyHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Cleanup logic
    return () => {
      // Cleanup
    };
  }, [value]);
  
  return {
    value,
    setValue
  };
}
```

### With Error Handling

```typescript
export function useMyHook() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    try {
      // Fetch data
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { data, error, isLoading };
}
```

---

## 📚 Best Practices

### 1. Single Responsibility
```typescript
// Good - Single purpose
function useCart() { ... }
function usePagination() { ... }

// Bad - Multiple responsibilities
function useEverything() { ... }
```

### 2. Cleanup Functions
```typescript
// Good - Cleanup on unmount
useEffect(() => {
  const subscription = api.subscribe(...);
  return () => subscription.unsubscribe();
}, []);

// Bad - Memory leak
useEffect(() => {
  const subscription = api.subscribe(...);
  // Missing cleanup
}, []);
```

### 3. Dependency Arrays
```typescript
// Good - Correct dependencies
useEffect(() => {
  // Use value
}, [value]);

// Bad - Missing dependency
useEffect(() => {
  // Use value
}, []);
```

### 4. Avoid Complex Logic
```typescript
// Good - Keep hooks simple
function useSimpleLogic() {
  return useMemo(() => compute(), [deps]);
}

// Bad - Too much logic
function useComplexLogic() {
  // 200 lines of code
}
```

---

## 🔗 Hook Composition

### Combining Hooks

```typescript
// Custom hook combining other hooks
function useProductData(productId) {
  const auth = useAuth();
  const { data: product } = useQuery({...});
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    if (!auth.isAuthenticated) {
      toast({ title: 'Please login' });
      return;
    }
    addToCart(product);
  };
  
  return { product, handleAddToCart };
}
```

---

## 🚀 Performance Tips

### Memoization
```typescript
// Memoize expensive calculations
const memoizedValue = useMemo(
  () => expensiveComputation(a, b),
  [a, b]
);
```

### Callback Memoization
```typescript
// Memoize callback to prevent re-renders
const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
);
```

---

**Hooks Documentation Version:** 1.0  
**Last Updated:** December 1, 2025
