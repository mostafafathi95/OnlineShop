# 🗺️ نقشہ تمام Routes

## Frontend Routes (React Router - Wouter)

```
/                                 → Landing
/products                         → Products List
/products/:id                     → Product Detail
/products/compare                 → Compare Products
/search?q=...                     → Search Results

/cart                            → Shopping Cart
/checkout                        → Checkout Flow
/checkout/payment                → Payment Method
/checkout/confirmation           → Order Confirmation

/auth/login                      → Login Page
/auth/register                   → Register Page
/auth/forgot-password            → Reset Password
/auth/reset/:token               → Reset Form

/account                         → User Dashboard
/account/profile                 → Edit Profile
/account/addresses               → Manage Addresses
/account/orders                  → Order History
/account/orders/:id              → Order Details
/account/reviews                 → My Reviews
/account/wishlist                → Wishlist
/account/wallet                  → Wallet & Credits

/admin                           → Admin Dashboard
/admin/landing                   → Landing Page Manager
/admin/products                  → Product Management
/admin/products/new              → Create Product
/admin/products/:id/edit         → Edit Product
/admin/categories                → Category Management
/admin/brands                    → Brand Management
/admin/orders                    → Order Management
/admin/orders/:id                → Order Details
/admin/users                     → User Management
/admin/coupons                   → Coupon Management
/admin/reviews                   → Review Moderation
/admin/questions                 → Q&A Management
/admin/articles                  → Blog Articles
/admin/news                      → News Management
/admin/pages                     → Page Management
/admin/sliders                   → Slider Management
/admin/banners                   → Banner Management
/admin/credit-points             → Credit Points
/admin/wallet                    → User Wallets
/admin/shipping-methods          → Shipping Settings
/admin/settings                  → System Settings
/admin/reports                   → Analytics & Reports
/admin/logs                      → System Logs

/about                           → About Page
/contact                         → Contact Page
/terms                           → Terms of Service
/privacy                         → Privacy Policy

/404                             → Not Found
```

## Backend API Routes (Express)

### Auth Routes (15+)
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

### Products Routes (20+)
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
POST   /api/products/:id/upload
GET    /api/products/:id/attributes
POST   /api/products/:id/attributes
PATCH  /api/products/:id/attributes/:attrId
DELETE /api/products/:id/attributes/:attrId
GET    /api/products/:id/images
POST   /api/products/:id/images
DELETE /api/products/:id/images/:imageId
GET    /api/categories
POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id
GET    /api/brands
POST   /api/brands
PATCH  /api/brands/:id
DELETE /api/brands/:id
```

### Cart Routes (10+)
```
GET    /api/cart
POST   /api/cart
PATCH  /api/cart/:itemId
DELETE /api/cart/:itemId
DELETE /api/cart
POST   /api/cart/validate
POST   /api/cart/apply-coupon
DELETE /api/cart/remove-coupon
GET    /api/cart/estimate-shipping
POST   /api/cart/convert-to-order
```

### Orders Routes (15+)
```
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id
DELETE /api/orders/:id
POST   /api/orders/:id/cancel
POST   /api/orders/:id/return
GET    /api/orders/:id/invoice
POST   /api/orders/:id/payment-verify
GET    /api/orders/:id/tracking
POST   /api/orders/:id/request-return
PATCH  /api/orders/:id/return-approval
GET    /api/orders/user/:userId
```

### Reviews Routes (10+)
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
PATCH  /api/answers/:id
DELETE /api/answers/:id
```

### Shopping Routes (10+)
```
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:id
POST   /api/compare
GET    /api/compare
DELETE /api/compare/:id
GET    /api/search
GET    /api/search/suggestions
POST   /api/recently-viewed
GET    /api/recently-viewed
```

### User Routes (12+)
```
GET    /api/users/:id
PATCH  /api/users/:id
GET    /api/users/:id/addresses
POST   /api/users/addresses
PATCH  /api/users/addresses/:id
DELETE /api/users/addresses/:id
GET    /api/users/:id/orders
GET    /api/users/:id/reviews
GET    /api/users/:id/credits
GET    /api/users/:id/wallet
POST   /api/users/:id/wallet/topup
PATCH  /api/users/:id/password
```

### Admin Routes (40+)
```
GET    /api/admin/dashboard
GET    /api/admin/dashboard/stats
GET    /api/admin/dashboard/charts
GET    /api/admin/users
GET    /api/admin/users/:id
POST   /api/admin/users/:id/role
POST   /api/admin/users/:id/block
GET    /api/admin/orders
PATCH  /api/admin/orders/:id
GET    /api/admin/coupons
POST   /api/admin/coupons
PATCH  /api/admin/coupons/:id
DELETE /api/admin/coupons/:id
GET    /api/admin/products/analytics
GET    /api/admin/reviews
PATCH  /api/admin/reviews/:id
GET    /api/admin/questions
PATCH  /api/admin/questions/:id
GET    /api/admin/articles
POST   /api/admin/articles
PATCH  /api/admin/articles/:id
DELETE /api/admin/articles/:id
GET    /api/admin/news
POST   /api/admin/news
GET    /api/admin/pages
POST   /api/admin/pages
GET    /api/admin/sliders
POST   /api/admin/sliders
GET    /api/admin/banners
POST   /api/admin/banners
GET    /api/admin/credit-points
POST   /api/admin/credit-points
GET    /api/admin/wallet
POST   /api/admin/wallet
GET    /api/admin/shipping-methods
POST   /api/admin/shipping-methods
GET    /api/admin/settings
PATCH  /api/admin/settings
GET    /api/admin/landing-sections
PATCH  /api/admin/landing-sections/:id
GET    /api/admin/reports/sales
GET    /api/admin/reports/users
GET    /api/admin/logs
```

### System Routes
```
GET    /api/health
GET    /api/health/db
GET    /api/health/services
GET    /api/version
POST   /api/feedback
```

### Payment Routes (10+)
```
POST   /api/payments/create
POST   /api/payments/verify
GET    /api/payments/:id
POST   /api/payments/:id/refund
GET    /api/payments/user/history
```

---

**محدثه:** 1 دسامبر 2025
