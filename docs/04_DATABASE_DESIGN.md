# 🗄️ طراحی دیتابیس

## نمای کلی جداول (29)

### کاربران و احراز هویت
```sql
users - کاربران سیستم
├── id (UUID)
├── email (unique)
├── firstName, lastName
├── profileImageUrl
├── role (user|admin)
├── phone
├── createdAt, updatedAt

sessions - جلسات کاربران (Replit Auth)
├── sid (string)
├── sess (JSONB)
├── expire (timestamp)

profiles - پروفایل کاربران
├── userId (FK)
├── bio, website
├── location
├── socialLinks (JSONB)
```

### محصولات
```sql
categories - دسته‌بندی‌ها
├── id
├── name, nameEn
├── slug
├── description, image
├── parentId (self-reference)
├── isActive, sortOrder

products - محصولات
├── id
├── name, nameEn, slug
├── description, shortDescription
├── price, comparePrice
├── sku, stock
├── categoryId (FK)
├── image, videoUrl
├── isActive, isFeatured
├── weight
├── createdAt, updatedAt

productImages - تصاویر محصول
├── id
├── productId (FK)
├── url, alt
├── sortOrder

productAttributes - ویژگی‌های محصول
├── id
├── productId (FK)
├── attributeName
├── attributeValue
```

### سفارشات
```sql
orders - سفارشات
├── id
├── orderNumber (unique)
├── userId (FK)
├── status (pending|processing|shipped|...)
├── subtotal, shippingCost
├── discount, total
├── addressId (FK)
├── shippingAddress (JSONB)
├── couponCode
├── notes
├── createdAt, updatedAt

orderItems - اشیاء سفارش
├── id
├── orderId (FK) ← اصلاح شد: orderItems.id → orders.id
├── productId (FK)
├── productName, productImage
├── price, quantity, total

cart_items - سبد خرید
├── id
├── userId (FK)
├── productId (FK)
├── quantity
├── createdAt, updatedAt
```

### نقد و نظر و تعاملات
```sql
reviews - نقد و نظرات
├── id
├── productId (FK)
├── userId (FK)
├── rating (1-5)
├── title, content
├── helpful, unhelpful
├── isApproved
├── createdAt, updatedAt

wishlist - لیست علاقه‌مندی‌ها
├── id
├── userId (FK)
├── productId (FK)
├── createdAt

questions - پرسش‌های کاربران
├── id
├── productId (FK)
├── userId (FK)
├── question
├── status (pending|answered|closed)
├── createdAt

answers - پاسخ‌های کاربران
├── id
├── questionId (FK)
├── userId (FK)
├── answer
├── createdAt
```

### تخفیف‌ها و دارایی
```sql
coupons - کوپن‌ها و کد تخفیف
├── id
├── code (unique)
├── description
├── discountType (percent|fixed)
├── discountValue
├── minOrderAmount
├── maxUses, currentUses
├── expiresAt
├── isActive

creditPoints - نقاط اعتباری
├── id
├── userId (FK)
├── points (decimal)
├── description
├── createdAt

userWallets - کیف‌پول کاربران
├── id
├── userId (FK)
├── balance (decimal)
├── currency
├── createdAt, updatedAt
```

### محتوا و صفحات
```sql
articles - مقالات بلاگ
├── id
├── title, slug
├── content
├── authorId (FK)
├── image
├── viewCount
├── createdAt, updatedAt

news - اخبار
├── id
├── title, slug
├── content, summary
├── image
├── viewCount
├── createdAt, updatedAt

pages - صفحات سفارشی
├── id
├── title, slug
├── content
├── isActive
├── createdAt, updatedAt

brands - برندها
├── id
├── name, slug
├── logo, description
├── isActive
├── createdAt
```

### تنظیمات و سیستم
```sql
shippingMethods - روش‌های ارسال
├── id
├── name
├── description
├── baseCost
├── estimatedDays
├── isActive
├── createdAt

settings - تنظیمات سیستم
├── id
├── key (unique)
├── value (JSONB)
├── description
├── category
├── createdAt, updatedAt

sliders - اسلایدرها
├── id
├── title, image
├── link
├── order
├── isActive
├── createdAt, updatedAt

banners - بنرهای تبلیغاتی
├── id
├── title, image
├── content, link
├── position
├── isActive, isVisible
├── createdAt, updatedAt

landingPageSections - بخش‌های صفحه فرود
├── id
├── key (unique)
├── title, description
├── isVisible
├── config (JSONB)
├── createdAt, updatedAt
```

### جستجو و آنالیتیکس
```sql
searchAnalytics - تحلیل جستجو
├── id
├── query
├── userId (FK)
├── resultsCount
├── clickedProductId (FK)
├── isZeroResult
├── sessionId
├── userAgent, ipAddress
├── createdAt

userRequests - درخواست‌های کاربر
├── id
├── userId (FK)
├── type
├── subject, description
├── status
├── response
├── createdAt, updatedAt

addresses - آدرس‌های کاربران
├── id
├── userId (FK)
├── title, fullName
├── phone
├── province, city
├── address, postalCode
├── isDefault
├── createdAt
```

## روابط (Relations)

```
users ──→ orders (one-to-many)
       ├→ cartItems
       ├→ reviews
       ├→ wishlist
       ├→ addresses
       ├→ creditPoints
       ├→ articles (author)
       ├→ questions
       ├→ answers
       ├→ userWallets
       └→ userRequests

products ──→ orderItems
         ├→ reviews
         ├→ productImages
         ├→ productAttributes
         ├→ questions
         ├→ wishlist
         └→ cartItems

orders ──→ orderItems (one-to-many)
       └→ address (many-to-one)

categories ──→ products (one-to-many)
```

## Indexes

```sql
CREATE INDEX idx_products_category ON products(categoryId);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(isActive);
CREATE INDEX idx_orders_user ON orders(userId);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(productId);
CREATE INDEX idx_reviews_user ON reviews(userId);
CREATE INDEX idx_wishlist_user ON wishlist(userId);
CREATE INDEX idx_cartitems_user ON cartItems(userId);
CREATE INDEX idx_questions_product ON questions(productId);
CREATE INDEX idx_searchanalytics_query ON searchAnalytics(query);
```

## صحت داده (Constraints)

```sql
-- Unique
UNIQUE(users.email)
UNIQUE(products.slug)
UNIQUE(categories.slug)
UNIQUE(coupons.code)
UNIQUE(landingPageSections.key)

-- Not Null
products.name NOT NULL
products.price NOT NULL
orders.orderNumber NOT NULL
reviews.rating NOT NULL

-- Default
users.role DEFAULT 'user'
products.isActive DEFAULT true
products.isFeatured DEFAULT false
orders.status DEFAULT 'pending'
```

## Backup Strategy

```bash
# Backup دوره‌ای
0 2 * * * pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# بازیابی
psql -d database < backup-20251201.sql

# Point-in-time Recovery (PITR)
- نرم‌افزار WAL (Write-Ahead Logging)
- روزانه backup
- Replication
```

---

**محدثه:** 1 دسامبر 2025
