# 🗄️ Database Guide - PostgreSQL & Drizzle ORM

**Persian E-Commerce Platform - Database Documentation**

---

## 📋 Overview

The application uses PostgreSQL (Neon backend) with Drizzle ORM for type-safe database operations. The database schema consists of 29 tables with proper relationships, indexes, and constraints.

---

## 🔧 Database Setup

### Connection String Format

```
postgresql://username:password@host:port/database
```

**Example (Neon):**
```
postgresql://user:password@ep-xyz.neon.tech:5432/dbname
```

### Environment Variables

```
DATABASE_URL=postgresql://...
PGHOST=host.neon.tech
PGPORT=5432
PGUSER=username
PGPASSWORD=password
PGDATABASE=database_name
```

---

## 📊 Schema Overview

### 29 Tables Grouped by Purpose

#### Authentication (2 tables)
- `users` - User accounts
- `sessions` - Session storage

#### Products (4 tables)
- `categories` - Product categories
- `products` - Product information
- `product_images` - Gallery images
- `brands` - Brand information

#### Shopping (5 tables)
- `cart` - Shopping cart items
- `orders` - Order records
- `order_items` - Line items per order
- `coupons` - Discount codes
- `wishlists` - Favorite products

#### User Data (4 tables)
- `addresses` - Shipping addresses
- `user_wallets` - Wallet balances
- `wallet_transactions` - Transaction history
- `user_profiles` - Extended profile info

#### Reviews & Q&A (2 tables)
- `reviews` - Product reviews
- `questions` - Q&A system

#### Management (6+ tables)
- `banners` - Homepage banners
- `landing_sections` - Landing page content
- `notifications` - User notifications
- `shipping_methods` - Delivery options
- `payment_methods` - Payment options
- `user_requests` - Support requests

#### Admin (2+ tables)
- `admin_logs` - Activity logs
- `analytics` - Performance metrics

---

## 🔗 Table Relationships

### One-to-Many
```
Users
  ├─ has many Orders
  ├─ has many Reviews
  ├─ has many Addresses
  ├─ has many Wishlists
  └─ has many WalletTransactions

Orders
  ├─ has many OrderItems
  ├─ belongs to User
  └─ belongs to Coupon (optional)

Products
  ├─ has many Reviews
  ├─ has many ProductImages
  ├─ has many OrderItems
  └─ belongs to Category
```

### Many-to-Many
```
Users ←→ Products (via Wishlist)
Users ←→ Products (via Cart)
Orders ←→ Coupons (via OrderCoupon)
```

### Self-Join
```
Categories
  ├─ has many SubCategories (parentId)
  └─ belongs to ParentCategory
```

---

## 📈 Indexes Strategy

### Performance Indexes

```typescript
// Frequently searched columns
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_cart_user ON cart(user_id);
```

### Unique Constraints

```typescript
// Ensure uniqueness
CREATE UNIQUE INDEX idx_products_slug ON products(slug);
CREATE UNIQUE INDEX idx_categories_slug ON categories(slug);
CREATE UNIQUE INDEX idx_coupons_code ON coupons(code);
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

---

## 🔐 Data Integrity

### Foreign Key Constraints

```typescript
// Cascade delete
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

// Set null on delete
FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL;

// Prevent delete (restrict)
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT;
```

### Constraint Types

- **PRIMARY KEY** - Unique identifier
- **UNIQUE** - Ensure uniqueness
- **NOT NULL** - Required field
- **CHECK** - Value validation
- **FOREIGN KEY** - Referential integrity
- **DEFAULT** - Default values

---

## 🚀 Common Queries

### Select Operations

```typescript
// Get all products
const products = await db.select().from(products).all();

// Filter with where
const active = await db
  .select()
  .from(products)
  .where(eq(products.isActive, true))
  .all();

// Join tables
const orders = await db
  .select()
  .from(orders)
  .innerJoin(users, eq(orders.userId, users.id))
  .all();

// Aggregate
const count = await db
  .select({ count: count() })
  .from(products)
  .all();

// Pagination
const page1 = await db
  .select()
  .from(products)
  .limit(20)
  .offset(0)
  .all();
```

### Insert Operations

```typescript
// Single insert
const newProduct = await db
  .insert(products)
  .values({ name: 'Product', price: 1000 })
  .returning();

// Bulk insert
const inserted = await db
  .insert(products)
  .values([
    { name: 'Product 1', price: 1000 },
    { name: 'Product 2', price: 2000 }
  ])
  .returning();
```

### Update Operations

```typescript
// Update single field
await db
  .update(products)
  .set({ price: 2000 })
  .where(eq(products.id, 1));

// Update multiple fields
await db
  .update(products)
  .set({
    name: 'New Name',
    price: 2000,
    updatedAt: new Date()
  })
  .where(eq(products.id, 1));
```

### Delete Operations

```typescript
// Delete single
await db
  .delete(products)
  .where(eq(products.id, 1));

// Delete multiple
await db
  .delete(products)
  .where(lt(products.price, 1000));
```

---

## 📝 Migrations

### Creating Migrations

```bash
# Drizzle will auto-generate migrations
npm run db:push

# Generate migration file
npm run db:generate
```

### Running Migrations

```bash
# Push schema to database
npm run db:push

# Force push (if schema is out of sync)
npm run db:push --force
```

### Migration Safety

⚠️ **NEVER** change primary key ID types:
```typescript
// BAD - Changing ID type
id: varchar("id")  // Was serial, now varchar

// GOOD - Keep ID type consistent
id: serial("id")   // Keep as was
```

---

## 🔍 Query Optimization

### Best Practices

1. **Use Indexes**
```typescript
// Indexed queries are faster
db.select().from(products).where(eq(products.slug, 'slug-name'));
```

2. **Limit Results**
```typescript
// Don't fetch all rows
db.select().from(products).limit(20);
```

3. **Select Columns**
```typescript
// Don't select unnecessary columns
db.select({
  id: products.id,
  name: products.name
}).from(products);
```

4. **Use Joins**
```typescript
// Join instead of multiple queries
db
  .select()
  .from(orders)
  .innerJoin(users, eq(orders.userId, users.id));
```

### Query Analysis

```bash
# Analyze query performance
EXPLAIN ANALYZE SELECT * FROM products WHERE category_id = 1;
```

---

## 📊 Database Monitoring

### Connection Pooling

```typescript
// Use connection pool for performance
const pool = new Pool({
  max: 20,              // Max connections
  min: 5,               // Min connections
  idle: 1000,           // Idle timeout
  connectionTimeout: 2000
});
```

### Monitoring Queries

```typescript
// Log slow queries
SET log_min_duration_statement = 1000;  // Log queries > 1s

// Check active queries
SELECT * FROM pg_stat_activity;
```

---

## 🔄 Backup & Recovery

### Backup Schedule

```
Daily: Full backup
Weekly: Archive backup
Monthly: Long-term backup
```

### Manual Backup

```bash
# Export database
pg_dump database_url > backup.sql

# Import backup
psql database_url < backup.sql
```

### Point-in-Time Recovery

```bash
# Restore to specific time (Neon feature)
# Available for last 30 days
```

---

## ⚠️ Common Issues

### Issue: Connection Timeout

**Solution:**
- Check DATABASE_URL format
- Verify Neon project is active
- Wait for cold start (30 seconds)
- Check firewall/network

### Issue: Out of Connections

**Solution:**
```typescript
// Increase connection pool
max: 50  // From 20

// Close unused connections
pool.drain().then(() => pool.end());
```

### Issue: Slow Queries

**Solution:**
1. Add indexes to frequently queried columns
2. Use EXPLAIN to analyze query plan
3. Optimize joins
4. Paginate large result sets
5. Use connection pooling

### Issue: Data Corruption

**Solution:**
1. Check constraints
2. Run VACUUM
3. Restore from backup
4. Contact Neon support

---

## 📚 Useful Commands

```bash
# Connect to database
psql postgresql://...

# List databases
\l

# List tables
\dt

# Describe table
\d table_name

# Show table indexes
\di

# Execute query
\c query.sql

# Exit
\q
```

---

**Database Guide Version:** 1.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready
