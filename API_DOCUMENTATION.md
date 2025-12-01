# 📚 API Documentation - فروشگاه اینترنتی فارسی

**نسخه:** 3.0 | **آخرین بروزرسانی:** 1 دسامبر 2025

---

## 🔐 **احراز هویت (Authentication)**

### ورود
```bash
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": {
    "id": 1,
    "firstName": "علی",
    "lastName": "محمدی",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### ثبت‌نام
```bash
POST /api/register
Content-Type: application/json

{
  "firstName": "علی",
  "lastName": "محمدی",
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "user": { ... },
  "message": "ثبت‌نام موفق"
}
```

### دریافت اطلاعات کاربر
```bash
GET /api/auth/user
Authorization: Bearer <token>

Response: 200 OK
{
  "user": { ... }
}
```

### خروج
```bash
POST /api/logout
Response: 200 OK
{ "message": "خروج موفق" }
```

---

## 🛍️ **محصولات (Products)**

### دریافت تمام محصولات
```bash
GET /api/products
Query Parameters:
  - category: string (slug)
  - search: string
  - page: number
  - limit: number
  - sort: "price" | "newest" | "popular"

Response: 200 OK
{
  "products": [
    {
      "id": 1,
      "name": "گوشی",
      "price": "8500000",
      "stock": 50,
      "image": "/images/phone.jpg"
    }
  ],
  "total": 100,
  "page": 1
}
```

### دریافت محصول
```bash
GET /api/products/:slug

Response: 200 OK
{
  "product": {
    "id": 1,
    "name": "گوشی سامسونگ",
    "description": "توضیحات محصول",
    "price": "8500000",
    "comparePrice": "10000000",
    "stock": 50,
    "images": [],
    "attributes": [],
    "reviews": []
  }
}
```

### جستجو در محصولات
```bash
GET /api/search?q=کلمه

Response: 200 OK
{
  "results": [
    {
      "id": 1,
      "name": "گوشی",
      "type": "product",
      "score": 0.95
    }
  ]
}
```

---

## 🛒 **سبد خرید (Cart)**

### دریافت سبد
```bash
GET /api/cart
Authorization: Bearer <token>

Response: 200 OK
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": "8500000",
      "subtotal": "17000000"
    }
  ],
  "total": "17000000"
}
```

### افزودن به سبد
```bash
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}

Response: 201 Created
{
  "item": { ... },
  "message": "محصول به سبد اضافه شد"
}
```

### حذف از سبد
```bash
DELETE /api/cart/:itemId
Authorization: Bearer <token>

Response: 200 OK
{ "message": "محصول حذف شد" }
```

---

## 💳 **پرداخت (Checkout)**

### پرداخت
```bash
POST /api/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "cartItems": [...],
  "shippingMethodId": 1,
  "couponCode": "WELCOME10",
  "paymentGateway": "zarinpal"
}

Response: 200 OK
{
  "orderId": 1,
  "paymentUrl": "https://payment-gateway...",
  "total": "17000000"
}
```

---

## 📦 **سفارشات (Orders)**

### دریافت سفارشات کاربر
```bash
GET /api/orders
Authorization: Bearer <token>

Response: 200 OK
{
  "orders": [
    {
      "id": 1,
      "orderNumber": "ORD-2024-001",
      "total": "17000000",
      "status": "processing",
      "createdAt": "2024-01-01"
    }
  ]
}
```

### دریافت سفارش
```bash
GET /api/orders/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "order": {
    "id": 1,
    "orderNumber": "ORD-2024-001",
    "items": [...],
    "status": "processing",
    "shippingAddress": {...},
    "paymentStatus": "paid"
  }
}
```

### تغییر وضعیت سفارش (Admin)
```bash
PATCH /api/admin/orders/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRK-123456"
}

Response: 200 OK
{
  "order": { ... },
  "message": "سفارش بروزرسانی شد"
}
```

---

## 👥 **کاربران (Users)**

### دریافت پروفایل
```bash
GET /api/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "user": {
    "id": 1,
    "firstName": "علی",
    "lastName": "محمدی",
    "email": "ali@example.com",
    "phone": "09123456789",
    "addresses": [...]
  }
}
```

### بروزرسانی پروفایل
```bash
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "علی",
  "lastName": "محمدی",
  "phone": "09123456789"
}

Response: 200 OK
{
  "user": { ... }
}
```

---

## ⭐ **نظرات (Reviews)**

### دریافت نظرات محصول
```bash
GET /api/products/:productId/reviews

Response: 200 OK
{
  "reviews": [
    {
      "id": 1,
      "rating": 5,
      "comment": "محصول عالی است",
      "author": "علی",
      "createdAt": "2024-01-01"
    }
  ],
  "average": 4.5,
  "total": 10
}
```

### ثبت نظر
```bash
POST /api/products/:productId/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "محصول بسیار خوب است"
}

Response: 201 Created
{
  "review": { ... }
}
```

---

## 🏷️ **کوپن‌ها (Coupons)**

### بررسی کوپن
```bash
GET /api/coupons/:code

Response: 200 OK
{
  "coupon": {
    "code": "WELCOME10",
    "discountType": "percentage",
    "discountValue": "10",
    "minOrderValue": "100000",
    "description": "تخفیف خوش‌آمدگویی"
  }
}
```

---

## 📰 **محتوا (Content)**

### مقالات
```bash
GET /api/articles
Query Parameters:
  - page: number
  - limit: number

Response: 200 OK
{
  "articles": [
    {
      "id": 1,
      "title": "راهنمای خرید",
      "excerpt": "...",
      "author": "علی",
      "createdAt": "2024-01-01"
    }
  ]
}
```

### اخبار
```bash
GET /api/news
Query Parameters:
  - page: number
  - limit: number

Response: 200 OK
{
  "news": [...]
}
```

---

## 🏥 **Health Check**

### وضعیت سرور
```bash
GET /api/health

Response: 200 OK
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00Z",
  "uptime": 3600
}
```

### وضعیت مدیریتی
```bash
GET /api/admin/health
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "healthy",
  "database": {
    "users": 10,
    "products": 50
  }
}
```

---

## 🌐 **Rate Limiting**

الگوهای محدودیت درخواست:
- **ورود:** 5 تلاش / 15 دقیقه
- **ثبت‌نام:** 3 تلاش / ساعت
- **پرداخت:** 10 درخواست / دقیقه
- **سایر:** 100 درخواست / دقیقه

---

## 📊 **Error Responses**

### خطای اعتبار
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### خطای احراز هویت
```json
{
  "error": "Unauthorized",
  "errorId": "abc123"
}
```

### Too Many Requests
```json
{
  "error": "Too many requests",
  "retryAfter": 300
}
```

---

## 📋 **Status Codes**

| کد | معنی |
|-----|------|
| 200 | موفق |
| 201 | ایجاد شد |
| 400 | درخواست نادرست |
| 401 | غیرمجاز |
| 403 | محدود |
| 404 | یافت نشد |
| 429 | بیش از حد درخواست |
| 500 | خطای سرور |

---

**آخرین ویرایش:** 1 دسامبر 2025
