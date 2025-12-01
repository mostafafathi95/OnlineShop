# 📱 Frontend Application - Client Documentation

**Location:** `/client`  
**Type:** React SPA (Single Page Application)  
**Language:** TypeScript  
**Build Tool:** Vite  
**Styling:** Tailwind CSS + Shadcn UI

---

## 📑 Overview

The client application is a modern, responsive React 18 Single Page Application (SPA) designed for Persian-speaking users. It provides a complete e-commerce experience with product browsing, shopping cart, checkout, user accounts, and admin panel.

### Key Metrics
- **Pages:** 60+ route components
- **Components:** 78+ reusable components
- **Custom Hooks:** 8+ custom React hooks
- **Stores:** 3+ Zustand state stores
- **Lines of Code:** ~8,000

### Technology Stack
- React 18.3.1 - UI library
- TypeScript - Type safety
- Vite - Build tool & dev server
- Tailwind CSS - Styling framework
- Shadcn UI - Component library
- Framer Motion - Animation library
- Zustand - State management
- TanStack Query v5 - Server state
- Wouter - Routing
- React Hook Form - Form management
- Zod - Schema validation

---

## 📂 Directory Structure

### `/client/src/`

```
src/
├── main.tsx                    Entry point
├── App.tsx                     Root component with routing
├── index.css                   Global styles + theme variables
│
├── pages/                      Route components (60+)
│   ├── Landing.tsx             Homepage
│   ├── Products.tsx            Product listing
│   ├── ProductDetail.tsx       Product details
│   ├── Checkout.tsx            Checkout process
│   ├── admin/                  Admin panel pages (15+)
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── Orders.tsx
│   │   ├── Categories.tsx
│   │   ├── Coupons.tsx
│   │   ├── Users.tsx
│   │   ├── Analytics.tsx
│   │   ├── AdminBanners.tsx
│   │   ├── AdminLanding.tsx
│   │   └── ... (10+ more)
│   ├── account/                User account pages (8+)
│   │   ├── Profile.tsx
│   │   ├── Orders.tsx
│   │   ├── OrderDetail.tsx
│   │   ├── Addresses.tsx
│   │   ├── Wishlist.tsx
│   │   └── ... (3+ more)
│   ├── auth/                   Authentication pages
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ResetPassword.tsx
│   └── ... (more public pages)
│
├── components/                 Reusable components (78+)
│   ├── ui/                     Shadcn UI components (25+)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   ├── accordion.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── sidebar.tsx
│   │   └── ... (more UI components)
│   │
│   ├── layout/                 Layout components (5+)
│   │   ├── Header.tsx          Main header
│   │   ├── Sidebar.tsx         Navigation sidebar
│   │   ├── Footer.tsx          Footer
│   │   ├── AdminLayout.tsx     Admin wrapper
│   │   └── ProtectedRoute.tsx  Auth guard
│   │
│   ├── forms/                  Form components (10+)
│   │   ├── ProductForm.tsx
│   │   ├── AddressForm.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── CouponForm.tsx
│   │   └── ... (more forms)
│   │
│   ├── products/               Product components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilter.tsx
│   │   └── ProductComparison.tsx
│   │
│   ├── cart/                   Cart components
│   │   ├── CartIcon.tsx
│   │   ├── CartDropdown.tsx
│   │   ├── CartItems.tsx
│   │   └── CartSummary.tsx
│   │
│   ├── search/                 Search components
│   │   ├── SearchBar.tsx
│   │   ├── SearchFilters.tsx
│   │   └── SearchResults.tsx
│   │
│   └── landing/                Landing components
│       ├── HeroSection.tsx
│       ├── FeaturedProducts.tsx
│       ├── CategoriesSection.tsx
│       └── BannersSection.tsx
│
├── hooks/                      Custom React hooks (8+)
│   ├── use-toast.ts            Toast notifications
│   ├── use-auth.ts             Authentication hook
│   ├── use-cart.ts             Shopping cart
│   ├── use-filters.ts          Product filters
│   ├── use-pagination.ts       Pagination logic
│   ├── use-search.ts           Search functionality
│   ├── use-form-validation.ts  Form validation
│   └── use-debounce.ts         Debounce utility
│
├── lib/                        Utilities & helpers
│   ├── queryClient.ts          React Query setup
│   ├── api.ts                  API client
│   ├── utils.ts                Helper functions
│   ├── constants.ts            App constants
│   ├── currency.ts             Currency formatting
│   ├── validation.ts           Zod schemas
│   └── types.ts                TypeScript types
│
└── stores/                     Zustand state stores (3+)
    ├── cartStore.ts            Shopping cart state
    ├── authStore.ts            Authentication state
    ├── comparisonStore.ts      Product comparison
    └── filterStore.ts          Product filters
```

---

## 🎨 Styling & Theme

### Tailwind CSS Configuration
- Utility-first CSS framework
- Custom color palette
- Responsive design (mobile-first)
- Dark mode support
- Custom spacing, typography

### Component Library
- **Shadcn UI** - Built on Radix UI primitives
- **25+ Pre-built Components:**
  - Button, Card, Dialog, Form
  - Input, Select, Textarea, Checkbox
  - Accordion, Tabs, Carousel
  - Table, Pagination, Breadcrumb
  - Toast, Alert, Badge, and more

### Theming System
```typescript
// Supports light/dark mode
// Theme variables in index.css
// Automatic system preference detection
// Manual theme toggle
```

---

## 🔌 State Management

### React Query (TanStack Query v5)
- **Server State Management**
- Automatic caching
- Background refetching
- Optimistic updates
- Query invalidation

**Example:**
```typescript
const { data: products } = useQuery({
  queryKey: ['/api/products'],
  queryFn: () => fetch('/api/products').then(r => r.json())
});
```

### Zustand Stores
- **Client State Management**
- Global store for cart
- Product comparison store
- Filter preferences

**Example:**
```typescript
const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({
    items: [...state.items, item]
  }))
}));
```

### React Hook Form
- **Form State Management**
- Minimal re-renders
- Built-in validation
- Integration with Zod schemas

**Example:**
```typescript
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});
```

---

## 🛣️ Routing

### Wouter Router
- Client-side routing
- Type-safe routes
- Dynamic parameters
- Protected routes

**Route Definition:**
```typescript
<Route path="/products/:id" component={ProductDetail} />
<Route path="/admin/*" component={AdminLayout} />
```

### Protected Routes
- Admin-only pages require admin role
- User-only pages require authentication
- Redirects to login if unauthorized

---

## 📡 API Integration

### React Query Setup
- **Base URL:** `http://localhost:5000/api`
- **Authentication:** Bearer token in header
- **Error Handling:** Global error boundary
- **Loading States:** Built-in loading flags

### API Request Pattern
```typescript
const query = useQuery({
  queryKey: ['/api/endpoint'],
  queryFn: async () => {
    const response = await fetch('/api/endpoint', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.json();
  }
});
```

### Mutation Pattern
```typescript
const mutation = useMutation({
  mutationFn: (data) => apiRequest('POST', '/api/endpoint', data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/endpoint'] });
    toast({ title: 'Success!' });
  }
});
```

---

## 🎭 Components Guide

### Button Component
```typescript
<Button variant="primary" size="lg">
  Click Me
</Button>
```

### Card Component
```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Form Component
```typescript
<Form {...form}>
  <FormField control={form.control} name="email" render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
    </FormItem>
  )} />
</Form>
```

---

## 🚀 Development

### Running Development Server
```bash
npm run dev
```
- Vite dev server on `http://localhost:5000`
- Hot Module Replacement (HMR)
- Fast refresh on file changes

### Building for Production
```bash
npm run build
```
- Creates optimized bundle in `/dist`
- Code splitting & tree shaking
- Minification & compression

### Type Checking
```bash
npm run check
```
- Validates TypeScript types
- Catches errors before build

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Mobile-first approach
- Flexbox & Grid layouts
- Responsive images & videos

### RTL Support
- Full Right-to-Left support
- Farsi language
- Proper text direction
- Mirrored layouts

---

## ⚡ Performance Optimization

### Techniques
1. **Code Splitting** - Route-based chunking
2. **Image Optimization** - Next-gen formats
3. **Lazy Loading** - On-demand component loading
4. **Caching** - React Query cache
5. **Bundle Analysis** - Monitor sizes

### Metrics
- **Lighthouse Score:** 90+
- **First Contentful Paint:** <2s
- **Time to Interactive:** <3s

---

## 🔐 Security

### Measures
1. **XSS Prevention** - React escaping
2. **CSRF Protection** - Token validation
3. **Authentication** - Bearer tokens
4. **Authorization** - Role-based access
5. **Input Validation** - Zod schemas
6. **Secure Headers** - CSP, X-Frame-Options

---

## 📚 Best Practices

1. **Component Composition** - Small, reusable components
2. **Props Drilling Prevention** - Use Zustand for globals
3. **Custom Hooks** - Encapsulate logic
4. **Type Safety** - Strict TypeScript
5. **Error Handling** - Try-catch & error boundaries
6. **Loading States** - Show feedback
7. **Accessibility** - WCAG compliance
8. **Testing** - Data test IDs on interactive elements

---

## 🐛 Debugging

### Development Tools
- **React DevTools** - Component inspection
- **Redux DevTools** - State monitoring
- **Network Tab** - API debugging
- **Console Logs** - Error tracking
- **Error Boundary** - Error handling

### Common Issues
1. **Infinite loops** - Check dependencies
2. **State not updating** - Check mutation
3. **Memory leaks** - Cleanup subscriptions
4. **Slow render** - Use React.memo, useMemo
5. **Stale data** - Invalidate cache

---

**Frontend Documentation Version:** 3.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready
