# 🛍️ فروشگاه اینترنتی فارسی - نصب و راهنمای استفاده

**نسخه:** 3.0 | **وضعیت:** تکمیل Phase 3 ✅

---

## 🚀 **شروع سریع**

```bash
# 1. نصب وابستگی‌ها
npm install

# 2. اجرای برنامه
npm run dev

# 3. دسترسی به برنامه
http://localhost:5000
```

---

## 📊 **معماری پلتفرم**

### Backend (Express.js + TypeScript)
- **28+ فایل رِوت** سازمان‌یافته (modules)
- **100+ API endpoint** فعال
- **15+ جدول** دیتابیس (PostgreSQL)
- **60+ storage methods** برای CRUD عملیات

### Frontend (React + Vite)
- **60+ صفحه** (pages)
- **22 صفحه‌ی مدیریت** (admin dashboard)
- **Modern RTL UI** (Tailwind + Shadcn)
- **Zustand** برای state management
- **TanStack Query** برای data fetching

### Database (PostgreSQL)
- **Users**: کاربران و احراز هویت
- **Products**: محصولات، تصاویر، ویژگی‌ها
- **Orders**: سفارشات و موارد
- **Content**: مقالات، اخبار، صفحات
- **Features**: برندها، کوپن‌ها، درخواست‌ها، Q&A
- **Settings**: تنظیمات و پیکربندی

---

## 🔑 **اطلاعات ورود (برای تست)**

### Admin
- **Email:** admin@example.com
- **نقش:** admin (دسترسی کامل)

### User
- **Email:** test@example.com
- **نقش:** user (دسترسی عادی)

---

## 🛣️ **مسیرهای API اصلی**

### عمومی (Public)
```
GET  /api/products           - همه محصولات
GET  /api/products/:slug     - جزئیات محصول
GET  /api/categories         - دسته‌بندی‌ها
GET  /api/search?q=...       - جستجو
```

### احراز هویت (Auth)
```
POST /api/login              - ورود
POST /api/register           - ثبت‌نام
POST /api/logout             - خروج
GET  /api/auth/user          - اطلاعات کاربر
```

### کاربر (User)
```
GET  /api/cart               - سبد خریدی
POST /api/cart               - افزودن به سبد
POST /api/checkout           - پرداخت
GET  /api/orders             - سفارشات کاربر
```

### مدیریت (Admin)
```
GET  /api/admin/products     - تمام محصولات
POST /api/admin/products     - ایجاد محصول
GET  /api/admin/orders       - تمام سفارشات
GET  /api/admin/users        - تمام کاربران
```

### محتوای (Content)
```
GET  /api/articles           - مقالات
GET  /api/news               - اخبار
GET  /api/pages              - صفحات
GET  /api/brands             - برندها
```

---

## 📋 **جدول‌های دیتابیس**

| جدول | توضیح |
|------|-------|
| **users** | کاربران (firstName, lastName, email, role) |
| **products** | محصولات (نام، قیمت، موجودی، تصویر) |
| **categories** | دسته‌بندی‌های محصول |
| **orders** | سفارشات (status: pending, processing, shipped...) |
| **articles** | مقالات وبلاگ |
| **news** | اخبار |
| **pages** | صفحات استاتیک |
| **brands** | برندها |
| **coupons** | کوپن‌های تخفیف |
| **reviews** | نظرات و امتیازات |
| **wishlist** | لیست علاقه‌مندی‌ها |
| **shipping_methods** | روش‌های ارسال |
| **product_attributes** | ویژگی‌های محصول |
| **credit_points** | امتیازات اعتباری |
| **user_wallets** | کیف‌پول‌های کاربران |

---

## 🎨 **دسترسی‌های سطح مختلف**

### Admin
- ✅ مدیریت تمام محصولات
- ✅ مدیریت سفارشات
- ✅ مدیریت کاربران
- ✅ مدیریت محتوا (مقالات، اخبار، صفحات)
- ✅ مدیریت تنظیمات

### User
- ✅ مشاهده محصولات
- ✅ خرید و سفارش
- ✅ پروفایل شخصی
- ✅ لیست علاقه‌مندی‌ها
- ✅ نوشتن نظرات

---

## 🔧 **تنظیمات محیط**

فایل `.env` (اختیاری، برای تنظیمات پیشرفته):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/shop
NODE_ENV=development
PORT=5000
```

---

## 📈 **آمار پلتفرم**

| معیار | تعداد |
|------|-------|
| API Endpoints | 100+ |
| Admin Pages | 22 |
| Database Tables | 15+ |
| Routes Files | 28+ |
| Storage Methods | 60+ |
| Frontend Pages | 60+ |

---

## 🛠️ **توسعه و بهتری**

### ساختار پروژه
```
server/
  ├── routes/          # 28 فایل رِوت modular
  ├── storage-base/    # 28 storage class
  ├── utils/           # کمکی‌ها
  └── db.ts            # Database connection

client/src/
  ├── pages/           # 60+ صفحه
  ├── components/      # Reusable components
  ├── hooks/           # Custom hooks
  └── stores/          # Zustand stores

shared/
  └── schema.ts        # Database schema & types
```

---

## ⚡ **بهینه‌سازی‌ها**

✅ **Caching:** TanStack Query برای خودکار caching
✅ **Validation:** Zod برای تمام input data
✅ **Error Handling:** Comprehensive error messages
✅ **Logging:** Professional logging سیستم
✅ **RTL Support:** 100% فارسی‌سازی
✅ **Dark Mode:** Light/Dark theme پشتیبانی

---

## 📞 **پشتیبانی**

برای سوالات یا مشکلات:
1. **مستندات:** این فایل را ببینید
2. **Logs:** `/logs` فوری در سرور
3. **Database:** PostgreSQL management tools

---

**ساخته شده با ❤️ برای کاسب‌های ایرانی**
