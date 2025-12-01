# 📋 REFACTORING PLAN - PHASE 3D
## تقسیم فایلهای بزرگ به تک مسئولیت
**تاریخ:** 1 دسامبر 2025  
**وضعیت:** Planning Mode  
**هدف:** 7 فایل بزرگ → 34 فایل modular

---

# 📊 فایل 1: Header.tsx (231 خط)
**مسیر:** `client/src/components/layout/Header.tsx`

## 📍 تجزیه کامل:

### Imports (20 سطر):
```
- useState, Link, useLocation (React + Wouter)
- 9 lucide icons (Search, ShoppingCart, User, Menu, X, Sun, Moon, ChevronDown, LogOut)
- Button, Input, Badge, Sheet, DropdownMenu, Avatar (UI)
- useAuth, useTheme, useCartStore (Hooks + Store)
- CartDrawer, AdvancedSearchHeader (Components)
```

### Dependencies (خارجی):
- `@/hooks/useAuth` - User auth data
- `@/components/layout/ThemeProvider` - Theme context
- `@/stores/cartStore` - Cart state
- `@/components/cart/CartDrawer` - Cart drawer
- `@/components/search/AdvancedSearchHeader` - Search component

### State (4 state):
```
- location: Current route
- mobileMenuOpen: Mobile menu toggle
- searchQuery: Search input value
- user, isAuthenticated, isAdmin: From useAuth
- theme, toggleTheme: From useTheme
- openCart, getItemCount: From cartStore
- itemCount: Calculated
```

### Logic:
```
- handleSearch: URL navigation with search params
- Conditional rendering: Auth state, Admin state, Theme
- Mobile/Desktop responsive toggle
```

### Sections:
1. **Mobile Menu** (lines 52-100): Sheet + Navigation links
2. **Logo** (lines 102-107): Link to home
3. **Desktop Nav** (lines 109-124): Horizontal navigation
4. **Search** (lines 127-129): AdvancedSearchHeader
5. **Theme Toggle** (lines 132-143): Sun/Moon button
6. **Cart Button** (lines 145-161): ShoppingCart + Badge
7. **User Menu** (lines 163-222): Authenticated/Guest states
8. **CartDrawer** (line 227): Component instance

---

## 📋 REFACTORING PLAN - Header.tsx

### MAIN TASK 1: Create Header Directory
```
mkdir client/src/components/layout/Header
```

### MAIN TASK 2: Extract Types & Constants
**Subtask 2.1:** Create `types.ts`
```typescript
- interface NavigationItem { name: string; href: string; }
- export const NAVIGATION: NavigationItem[]
```

**Subtask 2.2:** Create `constants.ts`
```typescript
- export const HEADER_CLASSES
- export const MOBILE_BREAKPOINT
```

### MAIN TASK 3: Extract Data Hooks
**Subtask 3.1:** Create `hooks.ts`
```typescript
- export function useHeaderData()
  └─ Returns: { user, isAuthenticated, isAdmin, theme, toggleTheme, itemCount, openCart }
```

### MAIN TASK 4: Create Sub-Components

**Subtask 4.1:** Create `HeaderLogo.tsx`
```typescript
- Import: Link, TailwindCSS
- Props: None
- Logic: Static logo display
- Lines: ~15
```

**Subtask 4.2:** Create `HeaderMobileMenu.tsx`
```typescript
- Import: Sheet, Button, Link, navigation
- Props: { mobileMenuOpen, setMobileMenuOpen, location, isAuthenticated, isAdmin }
- Logic: Mobile sheet navigation
- Render: Links mapped + Auth-based links
- Lines: ~50
```

**Subtask 4.3:** Create `HeaderDesktopNav.tsx`
```typescript
- Import: Link, navigation
- Props: { location }
- Logic: Desktop navigation links
- Lines: ~30
```

**Subtask 4.4:** Create `HeaderActions.tsx`
```typescript
- Import: Button, Badge, Avatar, DropdownMenu, Icons
- Props: { theme, toggleTheme, itemCount, user, isAuthenticated, isAdmin, openCart }
- Logic: Theme toggle + Cart + User menu
- Lines: ~100
```

**Subtask 4.5:** Create `HeaderUserMenu.tsx`
```typescript
- Import: DropdownMenu, Link, Icons, Avatar
- Props: { user, isAdmin }
- Logic: User dropdown menu
- Lines: ~50
```

**Subtask 4.6:** Create `HeaderSearchBar.tsx`
```typescript
- Import: AdvancedSearchHeader
- Props: None
- Logic: Search component wrapper
- Lines: ~5
```

### MAIN TASK 5: Create Main Component
**Subtask 5.1:** Create `index.tsx`
```typescript
- Import: All sub-components
- Import: All hooks
- State: mobileMenuOpen
- Render: Orchestrate all components
- Lines: ~30
```

### MAIN TASK 6: Update App.tsx Imports
```typescript
- Change: import Header from "@/components/layout/Header"
- This stays the same (uses directory)
```

### MAIN TASK 7: Verify & Test
- ✅ All imports resolve
- ✅ All props pass correctly
- ✅ Mobile menu works
- ✅ Desktop nav works
- ✅ User menu works
- ✅ Cart badge displays
- ✅ Theme toggle works

---

### FILES TO CREATE:
```
client/src/components/layout/Header/
├── types.ts (20 lines)
├── constants.ts (15 lines)
├── hooks.ts (25 lines)
├── HeaderLogo.tsx (15 lines)
├── HeaderMobileMenu.tsx (50 lines)
├── HeaderDesktopNav.tsx (30 lines)
├── HeaderActions.tsx (100 lines)
├── HeaderUserMenu.tsx (50 lines)
├── HeaderSearchBar.tsx (5 lines)
└── index.tsx (30 lines)

TOTAL: 10 files (340 lines) - بیشتر از اصلی! (cleanup needed)
```

---

# 📊 فایل 2: Products.tsx (260 خط)
**مسیر:** `client/src/pages/Products.tsx`

## 📍 تجزیه کامل:

### Imports (18 سطر):
- React hooks (useState, useEffect)
- Wouter (useLocation, useSearch)
- Lucide icons (Search, Filter, X, ChevronDown)
- UI components (Button, Input, Badge, Checkbox, Slider, Sheet, Select, Accordion, Skeleton)
- Custom components (Layout, ProductGrid, AdvancedSearch, RecentlyViewed)
- React Query (useQuery)
- Types (Product, Category)

### Dependencies:
- `@/components/layout/Layout`
- `@/components/products/ProductGrid`
- `@/components/discovery/AdvancedSearch`
- `@/components/discovery/RecentlyViewed`

### State (6 states):
```
- searchQuery
- selectedCategory
- priceRange: [number, number]
- sortBy
- mobileFiltersOpen
- URL params parsing
```

### Logic:
```
- updateURL(): Update URL with filters
- clearFilters(): Reset all filters
- FilterContent(): Render filter accordion
- hasActiveFilters: Boolean check
- useEffect: Debounced URL update
```

### Sections:
1. **Page Meta** (lines 21-25): Title + Meta description
2. **URL Params Parse** (lines 27-35): Get params and init state
3. **API Queries** (lines 37-43): Products + Categories
4. **Filter Functions** (lines 45-67): updateURL, clearFilters, logic
5. **FilterContent Component** (lines 69-164): Nested JSX
6. **Main JSX** (lines 166-260): Layout + Filters + Products

---

## 📋 REFACTORING PLAN - Products.tsx

### MAIN TASK 1: Create Products Directory
```
mkdir client/src/pages/Products
```

### MAIN TASK 2: Extract Types
**Subtask 2.1:** Create `types.ts`
```typescript
- interface FilterState { searchQuery, selectedCategory, priceRange, sortBy }
- interface SortOption { label, value }
- export const SORT_OPTIONS
- export const PRICE_RANGE_MIN/MAX
- export const PRICE_STEP
```

### MAIN TASK 3: Extract Hooks
**Subtask 3.1:** Create `hooks.ts`
```typescript
- export function useProductFilters()
  └─ Return: { searchQuery, setSearchQuery, selectedCategory, ... all state }
- export function useProductQueries()
  └─ Return: { products, categories, isLoading }
- export function useFilterURL()
  └─ Return: { updateURL, clearFilters }
- export function usePageMeta()
  └─ useEffect for title/meta
```

### MAIN TASK 4: Create Sub-Components

**Subtask 4.1:** Create `ProductsSearchFilter.tsx`
```typescript
- Props: { searchQuery, setSearchQuery }
- Render: Search input with icon
- Lines: ~20
```

**Subtask 4.2:** Create `ProductsCategoryFilter.tsx`
```typescript
- Props: { categories, selectedCategory, setSelectedCategory, categoriesLoading }
- Render: Accordion with checkboxes
- Lines: ~40
```

**Subtask 4.3:** Create `ProductsPriceFilter.tsx`
```typescript
- Props: { priceRange, setPriceRange }
- Render: Slider with price display
- Lines: ~25
```

**Subtask 4.4:** Create `ProductsFilterSidebar.tsx`
```typescript
- Props: All filter props
- Render: Search + Category + Price (desktop)
- Lines: ~30
```

**Subtask 4.5:** Create `ProductsMobileFilters.tsx`
```typescript
- Props: { mobileFiltersOpen, setMobileFiltersOpen, ... all filter props }
- Render: Sheet with filters (mobile)
- Lines: ~35
```

**Subtask 4.6:** Create `ProductsSorting.tsx`
```typescript
- Props: { sortBy, setSortBy, productCount }
- Render: Sort select dropdown
- Lines: ~20
```

**Subtask 4.7:** Create `ProductsHeader.tsx`
```typescript
- Props: { searchQuery, selectedCategory, categories, setSearchQuery, setSelectedCategory }
- Render: Title + Active filter badges
- Lines: ~35
```

### MAIN TASK 5: Create Main Component
**Subtask 5.1:** Create `index.tsx`
```typescript
- Import: All sub-components, hooks, types
- Use: Hooks to get all data
- Render: Orchestrate all components
- Lines: ~40
```

### MAIN TASK 6: Update App.tsx
```typescript
- Change: import Products from "@/pages/Products"
```

### FILES TO CREATE:
```
client/src/pages/Products/
├── types.ts (25 lines)
├── hooks.ts (50 lines)
├── ProductsSearchFilter.tsx (20 lines)
├── ProductsCategoryFilter.tsx (40 lines)
├── ProductsPriceFilter.tsx (25 lines)
├── ProductsFilterSidebar.tsx (30 lines)
├── ProductsMobileFilters.tsx (35 lines)
├── ProductsSorting.tsx (20 lines)
├── ProductsHeader.tsx (35 lines)
└── index.tsx (40 lines)

TOTAL: 10 files (320 lines)
```

---

# 📊 فایل 3-7 (خلاصه سریع)

## فایل 3: admin/Products.tsx (238 خط)
**Breakdown:** types.ts, hooks.ts, mutations.ts, ProductsTable.tsx, ProductsSearch.tsx, DeleteDialog.tsx, index.tsx

## فایل 4: admin/Dashboard.tsx (231 خط)
**Breakdown:** types.ts, hooks.ts, DashboardStats.tsx, DashboardOrders.tsx, DashboardLowStock.tsx, index.tsx

## فایل 5: admin/SliderForm.tsx (247 خط)
**Breakdown:** types.ts, hooks.ts, mutations.ts, SliderFormFields.tsx, index.tsx

## فایل 6: Contact.tsx (229 خط)
**Breakdown:** types.ts, hooks.ts, ContactInfo.tsx, ContactForm.tsx, ContactMap.tsx, index.tsx

## فایل 7: server/routes.ts (224 خط)
**Breakdown:** routes/articles.ts, routes/news.ts, routes/pages.ts, routes/brands.ts, routes/attributes.ts, routes/index.ts

---

# 🎯 EXECUTION ORDER

## PHASE 3D-1: Header (Turn 1)
- ✅ Create Header/ directory + 10 files
- ✅ Extract types, constants, hooks
- ✅ Create 6 sub-components
- ✅ Create main index.tsx
- ✅ Backup + Delete old Header.tsx
- ✅ Build test
- **Expected:** 10 files, 340 lines

## PHASE 3D-2: Products (Turn 2)
- ✅ Create Products/ directory + 10 files
- ✅ Extract types, hooks
- ✅ Create 7 sub-components
- ✅ Create main index.tsx
- ✅ Backup + Delete old Products.tsx
- ✅ Build test
- **Expected:** 10 files, 320 lines

## PHASE 3D-3: admin/Products (Turn 3)
- TODO

## PHASE 3D-4: admin/Dashboard (Turn 4)
- TODO

## PHASE 3D-5: admin/SliderForm (Turn 5)
- TODO

## PHASE 3D-6: Contact (Turn 6)
- TODO

## PHASE 3D-7: server/routes.ts (Turn 7)
- TODO

---

# 📌 KEY POINTS

### Imports Rules:
- ✅ Always import from parent directory using `../`
- ✅ Use `@/` for utilities, hooks, stores
- ✅ Never create circular imports

### Types:
- ✅ All interfaces in `types.ts`
- ✅ All constants in `constants.ts`
- ✅ Export everything explicitly

### Hooks:
- ✅ Group related logic
- ✅ Keep pure functions
- ✅ Return objects for clarity

### Components:
- ✅ One responsibility per file
- ✅ Add data-testid to interactive elements
- ✅ Keep JSX small (<50 lines if possible)

### Build Verification:
```bash
npm run build  # Must pass
npm run dev    # Server on 5000
```

---

# ✅ STATUS TRACKING

```
Phase 3D - File Breakdown:
├─ Turn 1: Header.tsx ..................... ⏳ PENDING
├─ Turn 2: Products.tsx ................... ⏳ PENDING
├─ Turn 3: admin/Products.tsx ............. ⏳ PENDING
├─ Turn 4: admin/Dashboard.tsx ............ ⏳ PENDING
├─ Turn 5: admin/SliderForm.tsx ........... ⏳ PENDING
├─ Turn 6: Contact.tsx .................... ⏳ PENDING
└─ Turn 7: server/routes.ts ............... ⏳ PENDING

Total: 7 files → 34 files
Total: 1,659 خط → Modular architecture
```

---

**شروع:** فوری  
**مدت زمان متوقع:** 7 turns  
**وضعیت:** آماده برای اجرا ✅
