# ⚛️ راهنمای Frontend

## ساختار Frontend

```
client/src/
├── pages/          # Route pages
├── components/     # Reusable components
├── hooks/          # Custom React hooks
├── stores/         # Zustand state
├── lib/            # Utilities
├── App.tsx         # Main router
├── main.tsx        # Entry point
└── index.css       # Styles
```

## Routing (Wouter)

```typescript
import { Switch, Route } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/admin/*" component={AdminLayout} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

## State Management

### TanStack Query (Server State)
```typescript
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

// Fetching
const { data, isLoading } = useQuery({
  queryKey: ['/api/products'],
  queryFn: () => apiRequest('GET', '/api/products')
});

// Mutations
const { mutate } = useMutation({
  mutationFn: (data) => apiRequest('POST', '/api/products', data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/products'] });
  }
});
```

### Zustand (Client State)
```typescript
import { create } from 'zustand';

const useCart = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  }))
}));
```

## Forms

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

const form = useForm({
  resolver: zodResolver(productSchema),
  defaultValues: { name: '', price: 0 }
});

function onSubmit(data) {
  createProduct.mutate(data);
}

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => <Input {...field} />}
      />
      <Button type="submit">ذخیره</Button>
    </form>
  </Form>
);
```

## Components

### Product Card
```typescript
function ProductCard({ product }) {
  return (
    <Card>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="text-lg font-bold">{product.price} ریال</p>
      <Button>اضافه به سبد</Button>
    </Card>
  );
}
```

### Admin Layout
```typescript
function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

## Styling

### Tailwind CSS
```tsx
<div className="flex flex-col gap-4 p-6">
  <h1 className="text-3xl font-bold">عنوان</h1>
  <p className="text-gray-600">توضیح</p>
</div>
```

### Dark Mode
```tsx
<div className="bg-white dark:bg-slate-950 text-black dark:text-white">
  محتوا
</div>
```

## Data Fetching Patterns

### Simple Query
```typescript
const { data: products } = useQuery({
  queryKey: ['/api/products'],
  queryFn: () => fetch('/api/products').then(r => r.json())
});
```

### Query with Parameters
```typescript
const { data } = useQuery({
  queryKey: ['/api/products', categoryId],
  queryFn: () => fetch(`/api/products?category=${categoryId}`)
});
```

### Mutation with Toast
```typescript
const { mutate } = useMutation({
  mutationFn: (data) => apiRequest('POST', '/api/products', data),
  onSuccess: () => {
    toast({ description: "محصول اضافه شد" });
    queryClient.invalidateQueries({ queryKey: ['/api/products'] });
  },
  onError: (error) => {
    toast({ 
      variant: "destructive",
      description: error.message 
    });
  }
});
```

## Performance

### Code Splitting
```typescript
import { lazy } from 'react';

const AdminPanel = lazy(() => import('./pages/admin'));

<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

### Memoization
```typescript
const ProductCard = memo(({ product }) => (
  <Card>{product.name}</Card>
));
```

---

**محدثه:** 1 دسامبر 2025
