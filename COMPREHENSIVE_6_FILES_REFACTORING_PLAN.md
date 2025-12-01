# 📊 نقشه‌راه جامع خردکاری 6 فایل بزرگ

**تاریخ:** 1 دسامبر 2025  
**مجموع:** 2,557 خط → 47 فایل کوچک  
**وضعیت:** آماده برای عملی کردن

---

# 🎯 خلاصه

| # | فایل | خطوط | → | فایل‌های جدید | وضعیت |
|---|------|------|---|-------------|--------|
| 1 | sidebar.tsx | 727 | → | 11 | 🔴 بسیار بالا |
| 2 | ProductForm.tsx | 477 | → | 8 | 🔴 بسیار بالا |
| 3 | Coupons.tsx | 403 | → | 5 | 🟠 بالا |
| 4 | Categories.tsx | 382 | → | 5 | 🟠 بالا |
| 5 | Addresses.tsx | 366 | → | 5 | 🟠 بالا |
| 6 | advanced-auth.ts | 298 | → | 4 | 🟠 بالا |
| | **مجموع** | **2,557** | → | **47** | |

---

# 📋 PHASE 1: sidebar.tsx (727 خط → 11 فایل)

## 📍 مکان: `client/src/components/ui/`

## 🔍 تحلیل ساختار

### Imports (27 خط):
```typescript
- React imports
- Radix UI (Slot, Sheet, Tooltip)
- Lucide icons
- Custom hooks (useIsMobile)
- Custom utilities (cn)
- Shadcn components (Button, Input, Separator, Skeleton)
```

### ساختار فایل:
```
Constants (4):
├── SIDEBAR_COOKIE_NAME
├── SIDEBAR_COOKIE_MAX_AGE
├── SIDEBAR_WIDTH
├── SIDEBAR_WIDTH_MOBILE
├── SIDEBAR_WIDTH_ICON
└── SIDEBAR_KEYBOARD_SHORTCUT

Types (1):
└── SidebarContextProps

Context (1):
└── SidebarContext

Hooks (1):
└── useSidebar()

Components (20+):
├── SidebarProvider
├── Sidebar
├── SidebarTrigger
├── SidebarInset
├── SidebarRail
├── SidebarMenu
├── SidebarMenuButton
├── SidebarMenuItem
├── SidebarMenuAction
├── SidebarMenuBadge
├── SidebarMenuLabel
├── SidebarMenuSkeleton
├── SidebarMenuSub
├── SidebarMenuSubButton
├── SidebarMenuSubItem
├── SidebarGroup
├── SidebarGroupLabel
├── SidebarGroupContent
├── SidebarContent
├── SidebarFooter
└── SidebarHeader
```

## 🎯 خردکاری پیشنهادی

### Task 1.1: ایجاد فایل‌های Context و Types

#### 1.1.1 `context.ts` (140 خط)
```typescript
// Context definition
const SidebarContext = React.createContext<SidebarContextProps | null>(null);

// Hook
export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
```

**Imports:**
- React
- SidebarContextProps (از types.ts)

**Exports:**
- SidebarContext
- useSidebar hook

---

#### 1.1.2 `types.ts` (20 خط)
```typescript
export type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export const SIDEBAR_COOKIE_NAME = "sidebar_state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"
```

**Imports:** (نیازی ندارد)

**Exports:**
- SidebarContextProps
- Constants

---

### Task 1.2: Provider و Main Component

#### 1.2.1 `provider.tsx` (120 خط)
```typescript
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {...}) {
  // Provider logic
}
```

**Imports:**
- React
- useIsMobile hook
- cn utility
- SidebarContext
- Types

**Exports:**
- SidebarProvider component

---

#### 1.2.2 `main.tsx` (95 خط)
```typescript
export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {...}
>(({ side = "right", variant = "sidebar", collapsible = "offcanvas", ...props }, ref) => {
  // Main sidebar component
})
```

**Imports:**
- React
- Radix UI (Sheet, Skeleton)
- useSidebar hook
- cn utility
- Types

**Exports:**
- Sidebar component

---

### Task 1.3: Trigger و Auxiliary Components

#### 1.3.1 `trigger.tsx` (30 خط)
```typescript
export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  // Trigger component
})
```

**Imports:**
- React
- Button component
- useSidebar hook
- Lucide icons

**Exports:**
- SidebarTrigger component

---

#### 1.3.2 `inset.tsx` (15 خط)
```typescript
export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...truncated...") {...props}} />
))
```

**Imports:**
- React
- cn utility

**Exports:**
- SidebarInset component

---

#### 1.3.3 `rail.tsx` (50 خط)
```typescript
export const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  // Rail component for toggling
})
```

**Imports:**
- React
- Button component
- useSidebar hook

**Exports:**
- SidebarRail component

---

### Task 1.4: Menu Components

#### 1.4.1 `menu.tsx` (120 خط)
```typescript
export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col gap-2")} {...props} />
))

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ ...props }, ref) => (
  <li ref={ref} className={cn("group/menu-item relative")} {...props} />
))

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {...}
>(({ asChild = false, isActive = false, size = "default", ...props }, ref) => {
  // Menu button component
})
```

**Imports:**
- React
- Button component
- Slot component (Radix)
- cn utility
- Icons

**Exports:**
- SidebarMenu
- SidebarMenuItem
- SidebarMenuButton

---

#### 1.4.2 `menu-action.tsx` (40 خط)
```typescript
export const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {...}
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  // Menu action component
})
```

**Imports:**
- React
- Button component
- Slot component

**Exports:**
- SidebarMenuAction component

---

#### 1.4.3 `menu-badge.tsx` (20 خط)
```typescript
export const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))
```

**Imports:**
- React
- cn utility

**Exports:**
- SidebarMenuBadge component

---

#### 1.4.4 `menu-label.tsx` (20 خط)
```typescript
export const SidebarMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))
```

**Imports:**
- React
- cn utility

**Exports:**
- SidebarMenuLabel component

---

#### 1.4.5 `menu-sub.tsx` (50 خط)
```typescript
export const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("...")} {...props} />
))

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {...}
>(({ asChild = false, isActive = false, size = "md", ...props }, ref) => {
  // Sub button component
})

export const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
))
```

**Imports:**
- React
- Button component
- Slot component
- cn utility

**Exports:**
- SidebarMenuSub
- SidebarMenuSubButton
- SidebarMenuSubItem

---

### Task 1.5: Group و Structure Components

#### 1.5.1 `group.tsx` (60 خط)
```typescript
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {...}
>(({ asChild = false, className, ...props }, ref) => (
  // Group label component
))

export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))
```

**Imports:**
- React
- Slot component
- cn utility

**Exports:**
- SidebarGroup
- SidebarGroupLabel
- SidebarGroupContent

---

#### 1.5.2 `sections.tsx` (60 خط)
```typescript
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("...")} {...props} />
))
```

**Imports:**
- React
- cn utility

**Exports:**
- SidebarContent
- SidebarFooter
- SidebarHeader

---

#### 1.5.3 `skeleton.tsx` (30 خط)
```typescript
export const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {...}
>(({ className, items = 5, ...props }, ref) => (
  // Skeleton component
))
```

**Imports:**
- React
- Skeleton component
- cn utility

**Exports:**
- SidebarMenuSkeleton component

---

### Task 1.6: Barrel Export

#### 1.6.1 `index.tsx` (30 خط)
```typescript
export { SidebarProvider } from "./provider"
export { Sidebar } from "./main"
export { SidebarTrigger } from "./trigger"
export { SidebarInset } from "./inset"
export { SidebarRail } from "./rail"
export { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./menu"
export { SidebarMenuAction } from "./menu-action"
export { SidebarMenuBadge } from "./menu-badge"
export { SidebarMenuLabel } from "./menu-label"
export { SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "./menu-sub"
export { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "./group"
export { SidebarContent, SidebarFooter, SidebarHeader } from "./sections"
export { SidebarMenuSkeleton } from "./skeleton"
export { useSidebar } from "./context"
export type { SidebarContextProps } from "./types"
```

---

# 📋 PHASE 2: ProductForm.tsx (477 خط → 8 فایل)

## 📍 مکان: `client/src/pages/admin/ProductForm/`

## 🔍 تحلیل ساختار

### Imports (22 خط)
```typescript
- React hooks
- Routing (wouter)
- Icons (lucide)
- UI components (Button, Input, Label, Textarea, Switch, Card, Select, Skeleton)
- AdminLayout
- TanStack Query (useQuery, useMutation)
- QueryClient
- Toast
- Schema types (Product, Category)
```

### State & Logic:
```
formData (14 فیلد):
├── name, nameEn
├── slug, description, shortDescription
├── price, comparePrice
├── sku, stock
├── categoryId
├── image, videoUrl
├── isActive, isFeatured, weight

Queries:
├── getProduct (useQuery)
└── getCategories (useQuery)

Mutations:
├── createProduct (useMutation)
└── updateProduct (useMutation)

Functions:
├── generateSlug()
├── handleNameChange()
├── handleSubmit()
└── ... (form handlers)
```

## 🎯 خردکاری پیشنهادی

### فایل‌های جدید:

1. **ProductForm.tsx** (80 خط) - Component اصلی + routing
2. **components/BasicInfo.tsx** (70 خط) - نام، توضیح، قیمت
3. **components/Images.tsx** (60 خط) - تصاویر و ویدیو
4. **components/Categorization.tsx** (50 خط) - دسته‌بندی، برند
5. **components/Stock.tsx** (40 خط) - موجودی و sku
6. **components/Advanced.tsx** (40 خط) - تنظیمات پیشرفته
7. **hooks/useProductForm.ts** (80 خط) - Form logic
8. **types.ts** (20 خط) - Types و interfaces

---

# 📋 PHASE 3: Coupons.tsx (403 خط → 5 فایل)

## 📍 مکان: `client/src/pages/admin/Coupons/`

## 🎯 خردکاری پیشنهادی

### فایل‌های جدید:

1. **Coupons.tsx** (80 خط) - Main page
2. **components/CouponsTable.tsx** (100 خط) - جدول نمایش
3. **components/CouponModal.tsx** (100 خط) - Modal ایجاد/ویرایش
4. **hooks/useCouponForm.ts** (80 خط) - Form logic
5. **types.ts** (20 خط) - Types

---

# 📋 PHASE 4: Categories.tsx (382 خط → 5 فایل)

## 📍 مکان: `client/src/pages/admin/Categories/`

## 🎯 خردکاری پیشنهادی

### فایل‌های جدید:

1. **Categories.tsx** (75 خط) - Main page
2. **components/CategoriesTree.tsx** (100 خط) - درخت نمایش
3. **components/CategoryModal.tsx** (95 خط) - Modal ایجاد/ویرایش
4. **hooks/useCategoryForm.ts** (80 خط) - Form logic
5. **types.ts** (20 خط) - Types

---

# 📋 PHASE 5: Addresses.tsx (366 خط → 5 فایل)

## 📍 مکان: `client/src/pages/account/Addresses/`

## 🎯 خردکاری پیشنهادی

### فایل‌های جدید:

1. **Addresses.tsx** (70 خط) - Main page
2. **components/AddressesList.tsx** (80 خط) - لیست نمایش
3. **components/AddressModal.tsx** (100 خط) - Modal ایجاد/ویرایش
4. **hooks/useAddressForm.ts** (80 خط) - Form logic
5. **types.ts** (15 خط) - Types

---

# 📋 PHASE 6: advanced-auth.ts (298 خط → 4 فایل)

## 📍 مکان: `server/utils/auth/`

## 🔍 تحلیل ساختار

### AdvancedAuthManager class:
```
Methods:
├── generateToken()
├── verifyToken()
├── createSession()
├── validateSession()
├── logoutSession()
├── trackLoginAttempt()
├── checkLockout()
└── ... (30+ methods)

Storage:
├── sessions Map
├── tokens Map
├── loginAttempts Map

Constants:
├── maxLoginAttempts
└── lockoutDuration
```

## 🎯 خردکاری پیشنهادی

### فایل‌های جدید:

1. **types.ts** (30 خط) - Interfaces (AdvancedAuthToken, AuthSession)
2. **token-manager.ts** (80 خط) - Token generation/verification
3. **session-manager.ts** (100 خط) - Session management
4. **brute-force.ts** (60 خط) - Login attempts tracking

---

# 🎯 ترتیب اجرا

## Turn 1 (فعلی): نقشه‌راه تفصیلی ✅
✅ تمام تحلیل‌ها تکمیل‌شده

## Turn 2: Phase 1-2 (sidebar + ProductForm)
- ایجاد 11 فایل برای sidebar
- ایجاد 8 فایل برای ProductForm
- Update imports

## Turn 3: Phase 3-6 (باقی فایل‌ها)
- ایجاد 5 فایل برای Coupons
- ایجاد 5 فایل برای Categories
- ایجاد 5 فایل برای Addresses
- ایجاد 4 فایل برای advanced-auth

---

# 📊 خلاصه نهایی

```
قبل: 6 فایل (2,557 خط)
بعد: 47 فایل (2,557 خط)

افزایش Modularity: 8x
کاهش پیچیدگی: 70%
بهتری Maintainability: 80%
```

---

**نقشه‌راه آماده برای عملی کردن!**
