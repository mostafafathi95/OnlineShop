# 📡 API Reference - Complete Endpoints

**Persian E-Commerce Platform - RESTful API Documentation**

---

## 🔗 Base URL

**Development:** `http://localhost:5000/api`  
**Production:** `https://your-domain.com/api`

---

## 🔐 Authentication

All protected endpoints require Bearer token in header:

```
Authorization: Bearer <token>
```

Get token:
```
POST /api/auth/replit-login
```

---

## 📋 Authentication Endpoints

### Replit Login
```
POST /api/auth/replit-login

Response:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user" | "admin"
  }
}
```

### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{ "success": true }
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user" | "admin",
  "profileImageUrl": "https://..."
}
```

---

## 🛍️ Product Endpoints

### List Products
```
GET /api/products?page=1&limit=20&category=1&sort=newest

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20)
- category: number (optional)
- sort: 'newest' | 'price_low' | 'price_high' | 'popular'
- search: string (optional)

Response:
{
  "products": [...],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### Get Product
```
GET /api/products/:id

Response:
{
  "id": 1,
  "name": "Product Name",
  "slug": "product-name",
  "price": "1500000",
  "comparePrice": "2000000",
  "description": "...",
  "stock": 50,
  "categoryId": 5,
  "images": [...],
  "videoUrl": "https://...",
  "reviews": [...],
  "averageRating": 4.5,
  "reviewCount": 25
}
```

### Create Product (Admin)
```
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

Body:
{
  "name": "Product Name",
  "price": "1500000",
  "categoryId": 5,
  "description": "...",
  "stock": 50,
  "sku": "SKU123"
}

Response:
{
  "id": 1,
  "name": "Product Name",
  ...
}
```

### Update Product (Admin)
```
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

Body: { ... }

Response: { ... }
```

### Delete Product (Admin)
```
DELETE /api/products/:id
Authorization: Bearer <admin_token>

Response:
{ "success": true }
```

### Search Products
```
GET /api/products/search?q=keyword&category=1

Response:
{
  "results": [...]
}
```

---

## 🛒 Cart Endpoints

### Get Cart
```
GET /api/cart
Authorization: Bearer <token>

Response:
{
  "items": [
    {
      "id": 1,
      "productId": 5,
      "quantity": 2,
      "product": { ... }
    }
  ],
  "total": "3000000"
}
```

### Add to Cart
```
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "productId": 5,
  "quantity": 2
}

Response:
{
  "id": 1,
  "productId": 5,
  "quantity": 2
}
```

### Update Cart Item
```
PUT /api/cart/:id
Authorization: Bearer <token>
Content-Type: application/json

Body:
{ "quantity": 3 }

Response: { ... }
```

### Remove from Cart
```
DELETE /api/cart/:id
Authorization: Bearer <token>

Response:
{ "success": true }
```

---

## 📦 Order Endpoints

### List Orders
```
GET /api/orders?page=1&status=pending
Authorization: Bearer <token>

Query Parameters:
- page: number
- status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
- limit: number

Response:
{
  "orders": [...]
}
```

### Get Order
```
GET /api/orders/:id
Authorization: Bearer <token>

Response:
{
  "id": 1,
  "userId": "uuid",
  "status": "processing",
  "totalAmount": "1500000",
  "items": [...],
  "shippingAddress": { ... },
  "createdAt": "2025-12-01T10:00:00Z"
}
```

### Create Order
```
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "items": [
    {
      "productId": 5,
      "quantity": 2
    }
  ],
  "shippingAddressId": 1,
  "couponCode": "DISCOUNT20" (optional)
}

Response:
{
  "id": 1,
  "totalAmount": "1500000",
  "paymentGateway": "zarinpal"
}
```

### Update Order Status (Admin)
```
PUT /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

Body:
{ "status": "shipped" }

Response: { ... }
```

---

## 💳 Payment Endpoints

### Process Payment
```
POST /api/orders/:id/payment
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "gateway": "zarinpal" | "mellat" | "parsian" | "pasargad" | "saman",
  "amount": "1500000"
}

Response:
{
  "redirectUrl": "https://zarinpal.com/pg/..."
}
```

### Verify Payment
```
POST /api/orders/:id/verify-payment
Content-Type: application/json

Body:
{
  "transactionId": "...",
  "gateway": "zarinpal"
}

Response:
{
  "success": true,
  "order": { ... }
}
```

---

## 👥 User Endpoints

### Get Profile
```
GET /api/users/me
Authorization: Bearer <token>

Response:
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+98...",
  "profileImageUrl": "https://..."
}
```

### Update Profile
```
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+98..."
}

Response: { ... }
```

### Get Addresses
```
GET /api/users/addresses
Authorization: Bearer <token>

Response:
{
  "addresses": [
    {
      "id": 1,
      "title": "Home",
      "address": "123 Main St",
      "city": "Tehran",
      "zipCode": "1234567890",
      "isDefault": true
    }
  ]
}
```

### Add Address
```
POST /api/users/addresses
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Office",
  "address": "456 Business Ave",
  "city": "Tehran",
  "province": "Tehran",
  "zipCode": "0987654321",
  "phone": "+98..."
}

Response: { ... }
```

### Delete Address
```
DELETE /api/users/addresses/:id
Authorization: Bearer <token>

Response:
{ "success": true }
```

---

## ❤️ Wishlist Endpoints

### Get Wishlist
```
GET /api/users/wishlist
Authorization: Bearer <token>

Response:
{
  "items": [
    {
      "id": 1,
      "productId": 5,
      "product": { ... }
    }
  ]
}
```

### Add to Wishlist
```
POST /api/users/wishlist
Authorization: Bearer <token>
Content-Type: application/json

Body:
{ "productId": 5 }

Response: { ... }
```

### Remove from Wishlist
```
DELETE /api/users/wishlist/:id
Authorization: Bearer <token>

Response:
{ "success": true }
```

---

## ⭐ Review Endpoints

### Get Reviews
```
GET /api/products/:id/reviews?page=1

Response:
{
  "reviews": [
    {
      "id": 1,
      "productId": 5,
      "userId": "uuid",
      "rating": 5,
      "title": "Excellent product",
      "content": "Very satisfied...",
      "helpful": 10,
      "unhelpful": 1
    }
  ]
}
```

### Add Review
```
POST /api/products/:id/reviews
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "rating": 5,
  "title": "Great product",
  "content": "Highly recommended..."
}

Response: { ... }
```

---

## 🎟️ Coupon Endpoints

### Validate Coupon
```
POST /api/coupons/validate
Content-Type: application/json

Body:
{
  "code": "DISCOUNT20",
  "totalAmount": "1500000"
}

Response:
{
  "valid": true,
  "discountType": "percentage",
  "discountValue": 20,
  "discountAmount": "300000",
  "finalAmount": "1200000"
}
```

---

## 📊 Admin Endpoints

### Dashboard
```
GET /api/admin/dashboard
Authorization: Bearer <admin_token>

Response:
{
  "totalOrders": 100,
  "totalRevenue": "50000000",
  "totalCustomers": 25,
  "todayOrders": 5,
  "recentOrders": [...],
  "topProducts": [...]
}
```

### Analytics
```
GET /api/admin/analytics?period=month
Authorization: Bearer <admin_token>

Response:
{
  "chartData": [...],
  "stats": {
    "ordersCount": 100,
    "revenueTotal": "50000000",
    "averageOrderValue": "500000"
  }
}
```

### All Users (Admin)
```
GET /api/admin/users?page=1&limit=20
Authorization: Bearer <admin_token>

Response:
{
  "users": [...]
}
```

### All Orders (Admin)
```
GET /api/admin/orders?page=1&status=pending
Authorization: Bearer <admin_token>

Response:
{
  "orders": [...]
}
```

---

## 🔧 Public Endpoints

### Categories
```
GET /api/categories

Response:
{
  "categories": [
    {
      "id": 1,
      "name": "Electronics",
      "slug": "electronics",
      "image": "https://...",
      "parentId": null
    }
  ]
}
```

### Banners
```
GET /api/banners

Response:
{
  "banners": [...]
}
```

### Settings
```
GET /api/settings

Response:
{
  "storeName": "My Store",
  "supportEmail": "support@store.com",
  "currency": "IRR"
}
```

---

## 📤 File Upload

### Upload Image
```
POST /api/upload
Content-Type: multipart/form-data

Form Data:
- file: <image_file>

Response:
{
  "success": true,
  "imageUrl": "https://..."
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request parameters",
  "statusCode": 400
}
```

### 401 Unauthorized
```json
{
  "message": "Missing or invalid token",
  "statusCode": 401
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions",
  "statusCode": 403
}
```

### 404 Not Found
```json
{
  "message": "Resource not found",
  "statusCode": 404
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "statusCode": 500
}
```

---

**API Reference Version:** 3.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready
