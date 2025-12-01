# 📚 Lib Utilities - Helper Functions & Configuration

**Location:** `/client/src/lib`  
**Purpose:** Shared utilities and helpers  
**Language:** TypeScript

---

## 📂 Files Overview

### queryClient.ts

**React Query Configuration & API Setup**

Central configuration for server state management:

```typescript
import { QueryClient } from '@tanstack/react-query';
import { apiRequest } from './queryClient';

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,           // 5 minutes
      gcTime: 10 * 60 * 1000,             // 10 minutes
      retry: 1,                           // Retry once
      retryDelay: 1000                    // 1 second delay
    }
  }
});
```

**API Request Wrapper:**

```typescript
// Make authenticated API requests
const response = await apiRequest('POST', '/api/orders', {
  items: [...],
  addressId: 1
});

// Supported methods: GET, POST, PUT, DELETE, PATCH
```

**Features:**
- Automatic token injection
- Error handling
- Request timeout
- Type-safe responses

---

### api.ts

**API Client Helpers**

Utilities for API interactions:

```typescript
import { apiClient, request } from './api';

// Simple request
const products = await request('GET', '/api/products');

// With parameters
const filtered = await request('GET', '/api/products', {
  category: 1,
  page: 1
});

// With body
const order = await request('POST', '/api/orders', {
  items: [...],
  addressId: 1
});
```

**Error Handling:**

```typescript
try {
  const data = await request('GET', '/api/products');
} catch (error) {
  // Handle API errors
  console.error(error.message);
}
```

---

### utils.ts

**General Utility Functions**

Helper functions for common tasks:

```typescript
import {
  formatCurrency,
  formatDate,
  formatPhoneNumber,
  truncateText,
  classNames,
  debounce,
  throttle
} from './utils';

// Currency formatting
formatCurrency(1500000)  // "1,500,000 ریال"

// Date formatting
formatDate(new Date())   // "۱ دسامبر ۲۰۲۵"

// Phone number
formatPhoneNumber('+989121234567')  // "+98 912 123 4567"

// Text truncation
truncateText('Long text...', 20)  // "Long text..."

// Class merging
classNames('base', isActive && 'active')

// Debounce function
const debouncedSearch = debounce(search, 300);

// Throttle function
const throttledScroll = throttle(handleScroll, 1000);
```

---

### constants.ts

**Application Constants**

```typescript
export const API_BASE_URL = 'http://localhost:5000/api';
export const APP_NAME = 'Persian E-Commerce';

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_GATEWAYS = [
  { id: 'zarinpal', name: 'زرین پال' },
  { id: 'mellat', name: 'بانک ملت' },
  { id: 'parsian', name: 'بانک پارسیان' },
  { id: 'pasargad', name: 'بانک پاسارگاد' },
  { id: 'saman', name: 'بانک سامان' }
];

export const PAGINATION_LIMIT = 20;
export const SEARCH_DEBOUNCE = 300;
```

---

### validation.ts

**Zod Validation Schemas**

Reusable validation schemas:

```typescript
import { z } from 'zod';

// Product validation
export const productSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  categoryId: z.number().positive(),
  description: z.string().optional()
});

// Order validation
export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1)
  })),
  shippingAddressId: z.number(),
  couponCode: z.string().optional()
});

// Address validation
export const addressSchema = z.object({
  address: z.string().min(5),
  city: z.string().min(1),
  zipCode: z.string().regex(/^\d{10}$/),
  phone: z.string().regex(/^\+98\d{10}$/)
});
```

**Usage:**

```typescript
try {
  const validated = productSchema.parse(formData);
  // Valid data
} catch (error) {
  // Validation error
  console.error(error.errors);
}
```

---

### types.ts

**TypeScript Type Definitions**

```typescript
// API Response types
export type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};

// Pagination types
export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

// Form types
export type FormField<T> = {
  name: keyof T;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select';
  required?: boolean;
  options?: Array<{ value: any; label: string }>;
};

// Filter types
export type ProductFilters = {
  category?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sort?: 'newest' | 'price_low' | 'price_high' | 'popular';
  search?: string;
  page?: number;
  limit?: number;
};
```

---

## 🛠️ Helper Functions

### Currency Formatting

```typescript
// Format number as currency
formatCurrency(1500000)
// Output: "1,500,000 ریال"

// With symbol
formatCurrency(1500000, 'symbol')
// Output: "۱۵۰۰۰۰۰ ریال"
```

### Date Formatting

```typescript
// Persian date format
formatDate(new Date())
// Output: "۱ دسامبر ۲۰۲۵"

// Custom format
formatDate(new Date(), 'YYYY-MM-DD')
// Output: "۱۴۰۴-۰۹-۱۰"
```

### Text Utilities

```typescript
// Truncate text
truncateText('Very long text...', 20)
// Output: "Very long text..."

// Capitalize
capitalize('hello world')
// Output: "Hello world"

// Slug
slug('Product Name')
// Output: "product-name"
```

### Async Utilities

```typescript
// Debounce - execute after delay
const debouncedSearch = debounce((query) => {
  search(query);
}, 300);

// Throttle - execute max once per delay
const throttledScroll = throttle((event) => {
  handleScroll(event);
}, 1000);

// Retry - retry failed operation
retry(() => fetch(url), { attempts: 3, delay: 1000 });
```

---

## 🔌 Integration Points

### In Components

```typescript
import { formatCurrency } from '@/lib/utils';
import { productSchema } from '@/lib/validation';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
    </div>
  );
}
```

### In Forms

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/lib/validation';

function ProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema)
  });
}
```

### In API Calls

```typescript
import { apiRequest } from '@/lib/queryClient';

const mutation = useMutation({
  mutationFn: (data) => apiRequest('POST', '/api/products', data),
  onSuccess: () => {
    toast({ title: 'Success!' });
  }
});
```

---

## 📊 Performance

### Memoization

```typescript
// Memoize expensive functions
const memoizedFormatCurrency = useMemo(
  () => (price) => formatCurrency(price),
  []
);
```

### Debouncing

```typescript
// Prevent excessive API calls
const debouncedSearch = debounce((query) => {
  searchProducts(query);
}, 300);
```

---

**Lib Utilities Documentation Version:** 1.0  
**Last Updated:** December 1, 2025
