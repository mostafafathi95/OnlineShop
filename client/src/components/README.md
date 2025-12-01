# 🧩 Components Documentation - Reusable Components

**Location:** `/client/src/components`  
**Count:** 78+ components  
**Architecture:** Composition-based  
**Library:** Shadcn UI (Radix UI primitives)

---

## Overview

Components directory contains all reusable React components. Each component is self-contained with its own styling, logic, and types.

## 📂 Directory Structure

### UI Components (25+)

Shadcn UI components - Base components for building the UI:

- `button.tsx` - Primary action button
- `card.tsx` - Content container
- `dialog.tsx` - Modal dialog
- `form.tsx` - Form wrapper
- `input.tsx` - Text input field
- `textarea.tsx` - Multi-line text
- `select.tsx` - Dropdown selector
- `table.tsx` - Data table
- `accordion.tsx` - Collapsible sections
- `tabs.tsx` - Tab navigation
- `toast.tsx` - Notifications
- `alert-dialog.tsx` - Confirmation dialog
- `dropdown-menu.tsx` - Context menu
- `sidebar.tsx` - Navigation sidebar
- `badge.tsx` - Status indicators
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio buttons
- `switch.tsx` - Toggle switch
- `carousel.tsx` - Image carousel
- `chart.tsx` - Data visualization
- `menubar.tsx` - Menu bar
- `progress.tsx` - Progress indicator
- `separator.tsx` - Visual divider
- `tooltip.tsx` - Hover tooltips
- `label.tsx` - Form labels

### Layout Components (5+)

**Header.tsx** (230 lines)
- Navigation bar
- Logo/branding
- Search bar
- Cart icon
- User menu
- Admin links (if admin)

**Sidebar.tsx** (727 lines)
- Navigation sidebar
- Menu items
- Active state tracking
- Collapsible sections
- User profile section

**Footer.tsx**
- Footer content
- Links
- Social media
- Newsletter signup
- Copyright

**AdminLayout.tsx**
- Admin wrapper
- Sidebar + Main content
- Admin-only protection
- Admin navbar

**ProtectedRoute.tsx**
- Authentication check
- Redirect if unauthorized
- Loading state

### Form Components (10+)

**ProductForm.tsx** (477 lines)
- Product creation/editing
- Image upload
- Category selection
- Price management
- Stock tracking

**AddressForm.tsx**
- Address input fields
- Validation
- City/Province selection
- ZIP code validation

**PaymentForm.tsx**
- Payment method selection
- Payment gateway forms
- Credit card input (if applicable)

**CouponForm.tsx**
- Coupon code input
- Validation
- Discount calculation

**LoginForm.tsx**
- Email/password input
- Replit login button
- Form validation

**RegisterForm.tsx**
- User registration form
- Password confirmation
- Terms acceptance

### Product Components

**ProductCard.tsx**
- Product display card
- Image
- Title, price
- Add to cart button
- Add to wishlist
- Rating display

**ProductGrid.tsx**
- Grid layout
- Multiple products
- Responsive columns
- Loading states

**ProductFilter.tsx**
- Filter UI
- Category filter
- Price range
- Rating filter
- Apply/Clear buttons

**ProductComparison.tsx**
- Comparison table
- Feature comparison
- Side-by-side view

### Cart Components

**CartIcon.tsx**
- Shopping cart icon
- Item count badge
- Link to cart

**CartDropdown.tsx**
- Quick cart preview
- Recent items
- Checkout link

**CartItems.tsx**
- Cart item list
- Quantity controls
- Remove button
- Item subtotal

**CartSummary.tsx**
- Cart totals
- Subtotal
- Shipping cost
- Discount
- Total price
- Checkout button

### Search Components

**SearchBar.tsx**
- Search input
- Autocomplete
- Recent searches
- Popular searches

**SearchFilters.tsx**
- Filter panel
- Sort options
- Category filter
- Price range

**SearchResults.tsx**
- Results list
- Result cards
- No results message

### Landing Components

**HeroSection.tsx**
- Hero banner
- Call-to-action
- Background image
- Text overlay

**FeaturedProducts.tsx**
- Featured product carousel
- Special products display
- "New" badge indicators

**CategoriesSection.tsx**
- Category grid
- Category cards
- Category images
- Link to category

**BannersSection.tsx**
- Promotional banners
- Carousel of banners
- Banner images/text

---

## 🎯 Component Pattern

### Basic Component Structure

```typescript
import { FC, ReactNode } from 'react';

interface ComponentProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export const ComponentName: FC<ComponentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('base-class', className)} {...props}>
      {children}
    </div>
  );
};
```

### With State Logic

```typescript
export function ComponentName() {
  const [state, setState] = useState('');
  const { data } = useQuery(...);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### With Props and Events

```typescript
interface ComponentProps {
  onAction: (data: any) => void;
  isLoading?: boolean;
  title: string;
}

export function ComponentName({
  onAction,
  isLoading,
  title
}: ComponentProps) {
  return (
    <button onClick={() => onAction(data)}>
      {title}
    </button>
  );
}
```

---

## 💅 Styling

### Tailwind CSS Classes

All components use Tailwind utility classes:

```typescript
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click Me
</button>
```

### cn() Utility

Merge conditional Tailwind classes:

```typescript
import { cn } from '@/lib/utils';

const buttonClass = cn(
  'base-class',
  isActive && 'active-class',
  size === 'lg' && 'large-class'
);
```

### Custom CSS

For complex styling, use CSS modules or index.css:

```typescript
import styles from './Component.module.css';

<div className={styles.container}>
```

---

## 🔌 Common Hooks Used

- `useState` - Local state
- `useEffect` - Side effects
- `useQuery` - Data fetching
- `useMutation` - Data mutations
- `useContext` - Context values
- `useCallback` - Memoized functions
- `useMemo` - Memoized values
- `useToast` - Toast notifications

---

## 📝 Documentation in Components

Add JSDoc comments:

```typescript
/**
 * ProductCard Component
 * 
 * Displays a single product with image, title, price, and actions
 * 
 * @param {ProductCardProps} props - Component props
 * @returns {ReactElement} Rendered component
 * 
 * @example
 * <ProductCard 
 *   product={product}
 *   onAddToCart={handleAdd}
 * />
 */
```

---

## 🚀 Best Practices

1. **Single Responsibility** - Each component does one thing
2. **Props Over State** - Pass data as props when possible
3. **Composition** - Combine small components
4. **Type Safety** - Always define PropTypes or TypeScript types
5. **Performance** - Use React.memo for expensive components
6. **Accessibility** - Use semantic HTML, ARIA labels
7. **Testing** - Add data-testid attributes
8. **Consistent Naming** - PascalCase for components

---

**Components Documentation Version:** 3.0  
**Last Updated:** December 1, 2025
