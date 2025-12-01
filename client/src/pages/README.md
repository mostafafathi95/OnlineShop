# 📄 Pages Documentation - Route Components

**Location:** `/client/src/pages`  
**Count:** 60+ route components  
**Type:** Page-level React components  
**Routing:** Wouter

---

## Overview

Pages directory contains all route-level components. Each page corresponds to a specific URL path in the application. Pages handle navigation, data fetching, and layout composition.

## 📂 Structure

### Public Pages

**Landing.tsx** (342 lines)
- Homepage
- Featured products
- Category showcase
- Promotional banners
- Call-to-action sections

**Products.tsx** (260 lines)
- Product listing
- Filtering & sorting
- Pagination
- Search integration
- Category filtering

**ProductDetail.tsx** (448 lines)
- Product details
- Image gallery
- Reviews section
- Related products
- Add to cart/wishlist

**Checkout.tsx** (640 lines)
- Cart review
- Shipping address
- Payment method selection
- Order summary
- Payment processing

**Contact.tsx** (229 lines)
- Contact form
- Contact information
- Map integration
- Support channels

### Admin Pages

**AdminBanners.tsx** (521 lines)
- Banner management
- CRUD operations
- Drag-to-reorder
- Image upload

**AdminLanding.tsx**
- Landing page sections
- Content management
- Section visibility toggle
- Order management

**Products.tsx** (238 lines)
- Product admin interface
- Bulk operations
- Status management
- Category assignment

**ProductForm.tsx** (477 lines)
- Product creation/editing
- SKU management
- Price configuration
- Image gallery management

**Orders.tsx** (197 lines)
- Order management
- Status updates
- Payment tracking
- Shipment management

**Categories.tsx** (382 lines)
- Category CRUD
- Hierarchy management
- Sorting
- Image management

**Coupons.tsx** (403 lines)
- Coupon management
- Discount configuration
- Usage tracking
- Expiry management

**Dashboard.tsx** (231 lines)
- Admin overview
- Key metrics
- Recent orders
- Sales charts

### Account Pages

**Profile.tsx** (207 lines)
- User profile management
- Personal information
- Avatar upload
- Preferences

**Orders.tsx**
- Order history
- Order filtering
- Status tracking

**OrderDetail.tsx** (264 lines)
- Full order information
- Item details
- Tracking
- Invoice download

**Addresses.tsx** (366 lines)
- Address management
- Default address selection
- Add/edit/delete
- Address validation

**Wishlist.tsx**
- Favorite products
- Remove from wishlist
- Move to cart

### Auth Pages

**Login.tsx**
- Replit authentication
- Session creation
- Redirect after login

**Register.tsx** (222 lines)
- User registration
- Form validation
- Email verification
- Terms acceptance

---

## 🎯 Page Component Pattern

```typescript
// Page components follow this pattern:

export default function PageName() {
  // 1. Hooks
  const { data, isLoading } = useQuery(...);
  const mutation = useMutation(...);
  
  // 2. Local state (if needed)
  const [filter, setFilter] = useState('');
  
  // 3. Event handlers
  const handleAction = () => { ... };
  
  // 4. Render
  return (
    <div className="container">
      {/* Page content */}
    </div>
  );
}
```

## 🔗 Navigation

### Routing System (Wouter)

```typescript
// Route definition in App.tsx
<Route path="/" component={Landing} />
<Route path="/products" component={Products} />
<Route path="/products/:id" component={ProductDetail} />
<Route path="/checkout" component={Checkout} />
<Route path="/admin/*" component={AdminLayout} />
```

### URL Parameters

```typescript
// Access parameters with useParams hook
function ProductDetail() {
  const { id } = useParams();
  const { data: product } = useQuery({
    queryKey: ['/api/products', id]
  });
}
```

### Link Navigation

```typescript
// Use Link component for navigation
import { Link } from 'wouter';

<Link to={`/products/${id}`}>
  View Product
</Link>
```

## 💾 Data Fetching Pattern

All pages use TanStack Query for data fetching:

```typescript
// Query data
const { data, isLoading, error } = useQuery({
  queryKey: ['/api/endpoint'],
  queryFn: () => fetch('/api/endpoint').then(r => r.json())
});

// Mutate data
const mutation = useMutation({
  mutationFn: (data) => apiRequest('POST', '/api/endpoint', data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/endpoint'] });
    toast({ title: 'Success!' });
  }
});
```

## 🔐 Protected Pages

```typescript
// Protect with requireAuth middleware
function ProtectedPage() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/auth/login" />;
  }
  
  return <PageContent />;
}

// Admin-only protection
function AdminPage() {
  const { user } = useAuth();
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <AdminContent />;
}
```

## 📊 Common Patterns

### Loading State
```typescript
if (isLoading) return <Skeleton />;
```

### Error State
```typescript
if (error) return <ErrorMessage error={error} />;
```

### Empty State
```typescript
if (!data || data.length === 0) {
  return <EmptyState />;
}
```

## 🚀 Performance

- Lazy loading with React.lazy()
- Code splitting per route
- Image optimization
- Data pagination
- Memoization with useMemo/useCallback

---

**Pages Documentation Version:** 3.0  
**Last Updated:** December 1, 2025
