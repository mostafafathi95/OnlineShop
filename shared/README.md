# 🔗 Shared Code - Shared Documentation

**Location:** `/shared`  
**Purpose:** Type definitions and database schema  
**Language:** TypeScript  
**Key File:** `schema.ts` (658 lines)

---

## 📋 Overview

The `shared` directory contains code and types shared between frontend and backend applications. This ensures type safety and consistency across the entire application stack.

### Key File
- **schema.ts** - Database schema + Zod validation schemas

### Key Metrics
- **Tables Defined:** 29
- **Type Definitions:** 50+
- **Zod Schemas:** 40+
- **Lines of Code:** 658

---

## 📊 Database Schema Structure

### Schema Definition Pattern

Each table is defined using Drizzle ORM with TypeScript:

```typescript
// Table Definition
export const tableName = pgTable("table_name", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Type Inference
export type TableName = typeof tableName.$inferSelect;
export const insertTableNameSchema = createInsertSchema(tableName);
export type InsertTableName = z.infer<typeof insertTableNameSchema>;
```

---

## 📚 Core Tables

### Authentication & Users

**users** (User Accounts)
```typescript
{
  id: string (UUID)
  email: string (unique)
  firstName: string
  lastName: string
  profileImageUrl: string
  role: 'user' | 'admin'
  phone: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

**sessions** (Session Storage)
```typescript
{
  sid: string (primary key)
  sess: jsonb (session data)
  expire: timestamp (expiration)
}
```

### Product Catalog

**categories** (Product Categories)
```typescript
{
  id: integer (auto-increment)
  name: string (required)
  nameEn: string
  slug: string (unique)
  description: text
  image: string (URL)
  parentId: integer (nullable, for nested categories)
  isActive: boolean (default: true)
  sortOrder: integer (for ordering)
  createdAt: timestamp
}
```

**products** (Product Records)
```typescript
{
  id: integer (auto-increment)
  name: string (required, max 200)
  nameEn: string
  slug: string (unique)
  description: text
  shortDescription: text
  price: decimal (precision: 12, scale: 0)
  comparePrice: decimal (for discounts)
  sku: string (stock keeping unit)
  stock: integer (default: 0)
  categoryId: integer (foreign key)
  image: string (main image URL)
  videoUrl: string (YouTube/MP4 URL)
  isActive: boolean (default: true)
  isFeatured: boolean (for homepage)
  weight: decimal
  createdAt: timestamp
  updatedAt: timestamp
}
```

**productImages** (Product Gallery)
```typescript
{
  id: integer (auto-increment)
  productId: integer (foreign key, cascade delete)
  url: string (image URL)
  alt: string (alt text)
  sortOrder: integer (display order)
}
```

### Shopping & Orders

**cart** (Shopping Cart)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key)
  productId: integer (foreign key)
  quantity: integer (min: 1)
  createdAt: timestamp
  updatedAt: timestamp
}
```

**orders** (Order Records)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key)
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'processing_return' | 'refunded' | 'on_hold'
  totalAmount: decimal
  discount: decimal
  taxAmount: decimal
  shippingAmount: decimal
  paymentMethod: string
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  shippingAddress: jsonb
  billingAddress: jsonb
  notes: text
  createdAt: timestamp
  updatedAt: timestamp
}
```

**orderItems** (Order Line Items)
```typescript
{
  id: integer (auto-increment)
  orderId: integer (foreign key, cascade delete)
  productId: integer (foreign key)
  quantity: integer
  price: decimal (price at time of order)
  discount: decimal
  subtotal: decimal
}
```

### Reviews & Ratings

**reviews** (Product Reviews)
```typescript
{
  id: integer (auto-increment)
  productId: integer (foreign key, cascade delete)
  userId: string (foreign key, cascade delete)
  rating: integer (1-5 stars)
  title: string (max 100)
  content: text (review content)
  helpful: integer (helpful count)
  unhelpful: integer (unhelpful count)
  isApproved: boolean (moderation)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### User Data

**addresses** (Shipping Addresses)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key, cascade delete)
  title: string (e.g., "Home", "Office")
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  province: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: timestamp
}
```

**wishlist** (Favorites)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key, cascade delete)
  productId: integer (foreign key, cascade delete)
  createdAt: timestamp
}
```

**wallets** (User Wallets)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key, cascade delete)
  balance: decimal (wallet balance)
  createdAt: timestamp
  updatedAt: timestamp
}
```

**wallet_transactions** (Wallet History)
```typescript
{
  id: integer (auto-increment)
  walletId: integer (foreign key, cascade delete)
  amount: decimal
  type: 'credit' | 'debit'
  description: string
  createdAt: timestamp
}
```

### Management Tables

**banners** (Homepage Banners)
```typescript
{
  id: integer (auto-increment)
  title: string
  subtitle: string
  badgeText: string
  description: text
  link: string
  backgroundColor: string (hex color)
  textColor: string (hex color)
  imageUrl: string
  icon: string (emoji/unicode)
  isActive: boolean (default: true)
  sortOrder: integer
  createdAt: timestamp
}
```

**landing_sections** (Landing Page Content)
```typescript
{
  id: integer (auto-increment)
  section: string (section name)
  content: jsonb (flexible content)
  isVisible: boolean
  sortOrder: integer
  createdAt: timestamp
}
```

**questions** (Product Q&A)
```typescript
{
  id: integer (auto-increment)
  productId: integer (foreign key, cascade delete)
  userId: string (foreign key)
  question: text
  answer: text (nullable)
  status: 'pending' | 'answered' | 'closed'
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Admin & Settings

**coupons** (Discount Codes)
```typescript
{
  id: integer (auto-increment)
  code: string (unique)
  discountType: 'percentage' | 'fixed'
  discountValue: decimal
  maxUses: integer
  usedCount: integer (default: 0)
  minPurchase: decimal
  maxDiscount: decimal
  expiryDate: timestamp
  isActive: boolean (default: true)
  createdAt: timestamp
}
```

**notifications** (User Notifications)
```typescript
{
  id: integer (auto-increment)
  userId: string (foreign key, cascade delete)
  message: string
  type: 'order' | 'promotion' | 'system'
  isRead: boolean (default: false)
  createdAt: timestamp
}
```

**shipping_methods** (Shipping Options)
```typescript
{
  id: integer (auto-increment)
  name: string
  description: text
  basePrice: decimal
  pricePerKg: decimal
  deliveryDays: integer
  isActive: boolean (default: true)
  createdAt: timestamp
}
```

---

## 🛒 Enums

### Order Status
```typescript
export const orderStatusEnum = pgEnum('order_status', [
  'pending',           // Order created, awaiting payment
  'processing',        // Payment confirmed, preparing
  'shipped',           // In transit
  'delivered',         // Delivered to customer
  'cancelled',         // Order cancelled
  'returned',          // Item returned
  'processing_return', // Return in progress
  'refunded',          // Money refunded
  'on_hold'            // Order on hold
]);
```

### User Role
```typescript
export const userRoleEnum = pgEnum('user_role', [
  'user',              // Regular customer
  'admin'              // Administrator
]);
```

### Question Status
```typescript
export const questionStatusEnum = pgEnum('question_status', [
  'pending',           // Awaiting answer
  'answered',          // Question answered
  'closed'             // Closed
]);
```

### User Request Status
```typescript
export const userRequestStatusEnum = pgEnum('user_request_status', [
  'pending',           // Awaiting processing
  'processing',        // Being processed
  'completed',         // Completed
  'rejected'           // Rejected
]);
```

---

## 🔗 Type Exports Pattern

### Types Generated from Schema

```typescript
// Select type (for queries)
export type Banner = typeof banners.$inferSelect;

// Insert type (for mutations)
export const insertBannerSchema = createInsertSchema(banners)
  .omit({ id: true, createdAt: true });
export type InsertBanner = z.infer<typeof insertBannerSchema>;

// Update type (subset of insert)
export const updateBannerSchema = insertBannerSchema.partial();
export type UpdateBanner = z.infer<typeof updateBannerSchema>;
```

---

## ✅ Validation Schemas (Zod)

### Product Validation
```typescript
const createProductSchema = createInsertSchema(products)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    name: z.string().min(1).max(200),
    price: z.string().transform(Number).refine(n => n > 0),
    categoryId: z.number().positive()
  });
```

### Order Validation
```typescript
const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1)
  })),
  shippingAddressId: z.number(),
  couponCode: z.string().optional()
});
```

---

## 🏗️ Relationships

### One-to-Many
```
Users → Orders (one user has many orders)
Products → Reviews (one product has many reviews)
Categories → Products (one category has many products)
```

### Many-to-Many
```
Users ←→ Products (via wishlist, cart)
Orders ←→ Coupons (many orders can use same coupon)
```

### Cascade Delete
- Delete product → Delete product images, reviews
- Delete user → Delete orders, addresses, wishlists
- Delete order → Delete order items

---

## 📝 Database Index Strategy

### Indexed Columns
- `products.categoryId` - Category filtering
- `products.slug` - URL lookups
- `orders.userId` - User order list
- `reviews.productId` - Product reviews
- `reviews.userId` - User reviews
- `cart.userId` - User cart
- `wishlist.userId` - User wishlist
- `addresses.userId` - User addresses

### Unique Constraints
- `products.slug` - Unique product slugs
- `categories.slug` - Unique category slugs
- `coupons.code` - Unique coupon codes
- `users.email` - Unique email

---

## 🔐 Data Integrity

### Foreign Key Constraints
- On delete: CASCADE (products, reviews)
- On delete: SET NULL (optional relations)
- On update: CASCADE (maintain referential integrity)

### NOT NULL Constraints
- Essential fields: name, price, userId
- Status fields: always required
- Timestamps: auto-generated

### Default Values
- `isActive: true` - Default to active
- `createdAt: defaultNow()` - Auto-timestamp
- `stock: 0` - Default empty stock
- `sortOrder: 0` - Default sort order

---

## 📈 Scalability Considerations

### Current Capacity
- Handles millions of products
- Supports thousands of concurrent users
- Millions of orders, reviews, transactions

### Optimization Tips
1. Use pagination for large datasets
2. Index frequently searched columns
3. Denormalize for read-heavy operations
4. Archive old data periodically
5. Use connection pooling (Neon)

---

## 🔄 Version History

### Schema Versions
- **v1.0** - Initial schema with 15 tables
- **v2.0** - Added admin features (25 tables)
- **v3.0** - Current (29 tables, enums, relationships)

---

**Shared Code Documentation Version:** 3.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready
