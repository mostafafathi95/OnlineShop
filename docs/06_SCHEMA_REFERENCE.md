# 📋 مرجع Schema - تمام Types

## User Types

```typescript
type User = {
  id: string (UUID)
  email: string (unique)
  firstName?: string
  lastName?: string
  profileImageUrl?: string
  role: 'user' | 'admin'
  phone?: string
  createdAt: Date
  updatedAt: Date
}

type InsertUser = Omit<User, 'createdAt' | 'updatedAt'>
```

## Product Types

```typescript
type Product = {
  id: number
  name: string
  nameEn?: string
  slug: string (unique)
  description?: string
  shortDescription?: string
  price: Decimal
  comparePrice?: Decimal
  sku?: string
  stock: number
  categoryId?: number
  image?: string
  videoUrl?: string
  isActive: boolean
  isFeatured: boolean
  weight?: Decimal
  createdAt: Date
  updatedAt: Date
}

type InsertProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
```

## Order Types

```typescript
type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'
  | 'processing_return'
  | 'refunded'
  | 'on_hold'

type Order = {
  id: number
  orderNumber: string (unique)
  userId: string (FK)
  status: OrderStatus
  subtotal: Decimal
  shippingCost: Decimal
  discount: Decimal
  total: Decimal
  addressId?: number (FK)
  shippingAddress?: JSONB
  couponCode?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

type OrderItem = {
  id: number
  orderId: number (FK)
  productId: number (FK)
  productName: string
  productImage?: string
  price: Decimal
  quantity: number
  total: Decimal
}
```

## Category Types

```typescript
type Category = {
  id: number
  name: string
  nameEn?: string
  slug: string (unique)
  description?: string
  image?: string
  parentId?: number (self-reference)
  isActive: boolean
  sortOrder: number
  createdAt: Date
}
```

## Review Types

```typescript
type Review = {
  id: number
  productId: number (FK)
  userId: string (FK)
  rating: number (1-5)
  title: string
  content?: string
  helpful: number (default: 0)
  unhelpful: number (default: 0)
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}
```

## Coupon Types

```typescript
type Coupon = {
  id: number
  code: string (unique)
  description?: string
  discountType: 'percent' | 'fixed'
  discountValue: Decimal
  minOrderAmount?: Decimal
  maxUses?: number
  currentUses: number
  expiresAt?: Date
  isActive: boolean
  createdAt: Date
}
```

## Cart Types

```typescript
type CartItem = {
  id: number
  userId: string (FK)
  productId: number (FK)
  quantity: number
  createdAt: Date
  updatedAt: Date
}
```

## Address Types

```typescript
type Address = {
  id: number
  userId: string (FK)
  title: string (max 50 chars)
  fullName: string
  phone: string
  province: string
  city: string
  address: string
  postalCode: string
  isDefault: boolean
  createdAt: Date
}
```

## Credit Points Types

```typescript
type CreditPoint = {
  id: number
  userId: string (FK)
  points: Decimal
  description?: string
  createdAt: Date
}
```

## Question/Answer Types

```typescript
type Question = {
  id: number
  productId: number (FK)
  userId: string (FK)
  question: string
  status: 'pending' | 'answered' | 'closed'
  createdAt: Date
}

type Answer = {
  id: number
  questionId: number (FK)
  userId: string (FK)
  answer: string
  createdAt: Date
}
```

## Brand Types

```typescript
type Brand = {
  id: number
  name: string
  slug: string
  logo?: string
  description?: string
  isActive: boolean
  createdAt: Date
}
```

## Article Types

```typescript
type Article = {
  id: number
  title: string
  slug: string
  content: string
  authorId: string (FK)
  image?: string
  viewCount: number
  createdAt: Date
  updatedAt: Date
}
```

## API Response Types

```typescript
type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

type ApiError = {
  error: string
  code: string
  details?: Record<string, any>
}

type PaginatedResponse<T> = {
  items: T[]
  total: number
  page: number
  pages: number
  limit: number
}
```

---

**محدثه:** 1 دسامبر 2025
