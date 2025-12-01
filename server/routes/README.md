# 🛣️ API Routes - تمام Endpoints

## درباره
129+ API endpoints - مکمل documentation

---

## 📊 Routes Categories

### Authentication (5 endpoints)
```
POST   /api/auth/login
POST   /api/auth/register  
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### Products (15 endpoints)
```
GET    /api/products
GET    /api/products/:id
POST   /api/products (admin)
PUT    /api/products/:id (admin)
DELETE /api/products/:id (admin)
GET    /api/products/search
GET    /api/products/category/:id
POST   /api/products/:id/reviews
```

### Orders (12 endpoints)
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
DELETE /api/orders/:id
GET    /api/orders/user/:userId
GET    /api/orders/:id/invoice
```

### Cart (6 endpoints)
```
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:id
DELETE /api/cart/items/:id
POST   /api/cart/checkout
DELETE /api/cart
```

### Users (10 endpoints)
```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/addresses
POST   /api/users/:id/addresses
```

### Categories (8 endpoints)
```
GET    /api/categories
POST   /api/categories (admin)
PUT    /api/categories/:id (admin)
DELETE /api/categories/:id (admin)
```

### Payment (8 endpoints)
```
POST   /api/payment/zarinpal
POST   /api/payment/mellat
POST   /api/payment/verify
GET    /api/payment/status/:id
```

### Admin (30+ endpoints)
```
GET    /api/admin/stats
GET    /api/admin/dashboard
POST   /api/admin/settings
PUT    /api/admin/settings
GET    /api/admin/logs
```

**اور 40+ مزید endpoints!**

---

**محدثه:** 1 دسامبر 2025
