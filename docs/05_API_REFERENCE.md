# 🔌 مرجع API - تمام Endpoints

## بنیادی معلومات

**Base URL:** `http://localhost:5000/api`  
**Authentication:** Bearer Token in header  
**Response Format:** JSON  
**Error Format:** `{ error: string, details?: object }`

---

## 🔐 احراز هویت (15+ endpoints)

### ثبت‌نام
```
POST /auth/register
Body: { email, password, firstName, lastName }
Response: { user, token }
Status: 201
```

### ورود
```
POST /auth/login
Body: { email, password }
Response: { user, token }
Status: 200
```

### Replit OAuth
```
GET  /auth/replit
GET  /auth/callback?code=xxx
Response: { user, token }
```

### خروج
```
POST /auth/logout
Headers: Authorization: Bearer <token>
Response: { success: true }
```

### چک کاربر فعلی
```
GET /auth/user
Headers: Authorization: Bearer <token>
Response: User object
```

### تحدیث پروفایل
```
PATCH /auth/profile
Body: { firstName, lastName, phone }
Response: Updated user

### تغییر رمز عبور
```
POST /auth/change-password
Body: { oldPassword, newPassword }
Response: { success: true }
```

---

## 📦 محصولات (20+ endpoints)

### فهرست محصولات
```
GET /products?page=1&limit=20&category=1&sort=newest
Response: { products: [], total, pages }
```

### جزئیات محصول
```
GET /products/:id
Response: {
  id, name, price, description,
  images, reviews, relatedProducts
}
```

### ایجاد محصول (Admin)
```
POST /api/admin/products
Headers: Authorization: Bearer <token>
Body: {
  name, description, price, categoryId,
  stock, sku, image, videoUrl
}
Response: Created product
```

### بروزرسانی محصول
```
PATCH /api/admin/products/:id
Body: Partial product data
Response: Updated product
```

### حذف محصول
```
DELETE /api/admin/products/:id
Response: { success: true }
```

### آپلود تصویر
```
POST /api/admin/products/:id/upload
Content-Type: multipart/form-data
Body: { file }
Response: { imageUrl }
```

### ویژگی‌های محصول
```
GET /products/:id/attributes
POST /api/admin/products/:id/attributes
PATCH /api/admin/products/:id/attributes/:attrId
DELETE /api/admin/products/:id/attributes/:attrId
```

### تصاویر محصول
```
GET /products/:id/images
POST /api/admin/products/:id/images
DELETE /api/admin/products/:id/images/:imageId
```

---

## 🛒 سبد خرید (10+ endpoints)

### مشاهده سبد
```
GET /cart
Headers: Authorization: Bearer <token>
Response: { items: [], total, itemCount }
```

### اضافه کردن به سبد
```
POST /cart
Body: { productId, quantity }
Response: Updated cart
```

### حذف از سبد
```
DELETE /cart/:itemId
Response: { success: true }
```

### بروزرسانی تعداد
```
PATCH /cart/:itemId
Body: { quantity }
Response: Updated item
```

### خالی کردن سبد
```
DELETE /cart
Response: { success: true }
```

---

## 📋 سفارشات (15+ endpoints)

### فهرست سفارشات کاربر
```
GET /orders
Headers: Authorization: Bearer <token>
Response: { orders: [], total }
```

### جزئیات سفارش
```
GET /orders/:id
Response: Order with items
```

### ایجاد سفارش
```
POST /orders
Headers: Authorization: Bearer <token>
Body: {
  items: [{ productId, quantity }],
  addressId, couponCode
}
Response: Created order
```

### تغییر وضعیت (Admin)
```
PATCH /api/admin/orders/:id
Body: { status: 'shipped' | 'delivered' }
Response: Updated order
```

### درخواست بازگشت
```
POST /orders/:id/return
Body: { reason, description }
Response: Return request
```

---

## 💬 نقد و نظر (10+ endpoints)

### نقدهای محصول
```
GET /products/:id/reviews
Response: { reviews: [], average: 4.5 }
```

### اضافه کردن نقد
```
POST /products/:id/reviews
Headers: Authorization: Bearer <token>
Body: {
  rating: 5,
  title: "عالی است",
  content: "واقعا خوب بود"
}
Response: Created review
```

### به‌روزرسانی نقد
```
PATCH /reviews/:id
Body: Partial review data
Response: Updated review
```

### حذف نقد
```
DELETE /reviews/:id
Response: { success: true }
```

---

## ❓ پرسش و پاسخ (10+ endpoints)

### فهرست پرسش‌ها
```
GET /products/:id/questions
Response: { questions: [] }
```

### اضافه کردن پرسش
```
POST /products/:id/questions
Body: { question }
Response: Created question
```

### پاسخ دادن
```
POST /questions/:id/answers
Body: { answer }
Response: Created answer
```

---

## 🏷️ کوپن‌ها و تخفیف‌ها (8+ endpoints)

### اعتبار‌سنجی کوپن
```
POST /coupons/validate
Body: { code, orderTotal }
Response: { discount, newTotal }
```

### فهرست کوپن‌ها (Admin)
```
GET /api/admin/coupons
Response: { coupons: [] }
```

### ایجاد کوپن
```
POST /api/admin/coupons
Body: {
  code, discountType, discountValue,
  minOrderAmount, expiresAt
}
Response: Created coupon
```

---

## 👤 کاربران (12+ endpoints)

### پروفایل کاربر
```
GET /users/:id
Response: User data
```

### فهرست آدرس‌ها
```
GET /users/addresses
Response: { addresses: [] }
```

### اضافه آدرس
```
POST /users/addresses
Body: {
  title, fullName, phone, province,
  city, address, postalCode
}
Response: Created address
```

### به‌روزرسانی آدرس
```
PATCH /users/addresses/:id
Response: Updated address
```

### حذف آدرس
```
DELETE /users/addresses/:id
Response: { success: true }
```

---

## 🔍 جستجو (8+ endpoints)

### جستجوی متقدم
```
GET /search?q=تلویزیون&filters[]=price&sort=newest
Response: { results: [], total }
```

### سازنده‌های جستجو
```
GET /search/suggestions?q=تل
Response: [ "تلویزیون", "تلفن" ]
```

---

## 📊 مدیریت (Admin - 40+ endpoints)

### Dashboard
```
GET /api/admin/dashboard
Response: {
  stats: { totalSales, totalOrders, users },
  charts: { sales: [], orders: [] }
}
```

### دسته‌بندی‌ها
```
GET    /api/admin/categories
POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

### برندها
```
GET    /api/admin/brands
POST   /api/admin/brands
PATCH  /api/admin/brands/:id
DELETE /api/admin/brands/:id
```

### تنظیمات
```
GET    /api/admin/settings
PATCH  /api/admin/settings
```

---

## 🔄 خطاهای معمول

| کد | معنی | حل |
|-----|-------|------|
| 400 | درخواست نامعتبر | بررسی body |
| 401 | احراز هویت نشده | ارسال token |
| 403 | دسترسی ممنوع | نیازمند نقش admin |
| 404 | یافت نشد | بررسی ID |
| 500 | خطای سرور | برگزارش |

