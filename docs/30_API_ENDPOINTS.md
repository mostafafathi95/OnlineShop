# 📡 فهرست تمام API Endpoints

## Authentication (15 endpoints)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/user
GET    /api/auth/replit
GET    /api/auth/callback
POST   /api/auth/refresh
POST   /api/auth/change-password
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
GET    /api/auth/profile
PATCH  /api/auth/profile
POST   /api/auth/upload-avatar
DELETE /api/auth/account
```

## Products (20+ endpoints)
```
GET    /api/products
GET    /api/products/:id
POST   /api/products (admin)
PATCH  /api/products/:id (admin)
DELETE /api/products/:id (admin)
POST   /api/products/:id/upload (admin)
GET    /api/products/:id/attributes
POST   /api/products/:id/attributes (admin)
GET    /api/products/:id/images
POST   /api/products/:id/images (admin)
DELETE /api/products/:id/images/:imageId (admin)
GET    /api/categories
POST   /api/categories (admin)
PATCH  /api/categories/:id (admin)
DELETE /api/categories/:id (admin)
GET    /api/brands
POST   /api/brands (admin)
GET    /api/search
GET    /api/search/suggestions
POST   /api/compare
```

## Orders (15+ endpoints)
```
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id (admin)
DELETE /api/orders/:id (admin)
POST   /api/orders/:id/cancel
POST   /api/orders/:id/return
GET    /api/orders/:id/invoice
POST   /api/orders/:id/payment-verify
```

## Shopping (10+ endpoints)
```
GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:itemId
DELETE /api/cart/:itemId
DELETE /api/cart
POST   /api/wishlist
DELETE /api/wishlist/:id
GET    /api/wishlist
POST   /api/compare
GET    /api/compare
```

## Reviews (10+ endpoints)
```
GET    /api/products/:id/reviews
POST   /api/products/:id/reviews
PATCH  /api/reviews/:id
DELETE /api/reviews/:id
POST   /api/reviews/:id/helpful
POST   /api/reviews/:id/unhelpful
GET    /api/products/:id/questions
POST   /api/products/:id/questions
POST   /api/questions/:id/answers
```

## Users (12+ endpoints)
```
GET    /api/users/:id
GET    /api/users/:id/addresses
POST   /api/users/addresses
PATCH  /api/users/addresses/:id
DELETE /api/users/addresses/:id
GET    /api/users/:id/orders
GET    /api/users/:id/reviews
GET    /api/users/:id/credits
POST   /api/users/:id/wallet
PATCH  /api/users/:id/profile
```

## Admin (40+ endpoints)
```
GET    /api/admin/dashboard
GET    /api/admin/analytics
GET    /api/admin/users
GET    /api/admin/coupons
POST   /api/admin/coupons
GET    /api/admin/reports
GET    /api/admin/settings
PATCH  /api/admin/settings
GET    /api/admin/logs
GET    /api/admin/sliders
POST   /api/admin/sliders
GET    /api/admin/banners
POST   /api/admin/banners
```

---

**محدثه:** 1 دسامبر 2025
