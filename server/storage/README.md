# 💾 Storage Layer - Data Operations

## درباره
Database operations - CRUD methods for all 29 tables

---

## 📦 Storage Methods

### Users Operations
- `getUser(id)` - صارف حاصل کریں
- `getUserByEmail(email)` - Email سے
- `createUser(data)` - نیا صارف
- `updateUser(id, data)` - اپڈیٹ کریں
- `deleteUser(id)` - حذف کریں

### Products Operations
- `getProducts(filters)` - List with filters
- `getProduct(id)` - تفصیلات
- `createProduct(data)` - نیا محصول
- `updateProduct(id, data)` - اپڈیٹ
- `deleteProduct(id)` - حذف

### Orders Operations
- `getOrders(userId)` - صارف کی سفارشات
- `getOrder(id)` - تفصیلات
- `createOrder(data)` - نیا آرڈر
- `updateOrderStatus(id, status)` - سٹیٹس
- `deleteOrder(id)` - حذف

### Cart Operations
- `getCart(userId)` - سبد حاصل کریں
- `addToCart(userId, productId)` - شامل کریں
- `removeFromCart(userId, productId)` - نکالیں
- `updateCartItem(userId, itemId, qty)` - مقدار
- `clearCart(userId)` - خالی کریں

### Payment Operations
- `createPayment(data)` - ادائیگی بنائیں
- `verifyPayment(id, data)` - تصدیق کریں
- `getPaymentStatus(id)` - سٹیٹس
- `updatePaymentStatus(id, status)` - اپڈیٹ

**اور 20+ مزید operations!**

---

**محدثه:** 1 دسامبر 2025
