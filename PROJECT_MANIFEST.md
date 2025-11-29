# پروجکت مانیفست - فروشگاه اینترنتی جامع

## نمای کلی پروژه
یک پلتفرم تجارت الکترونیک کامل با تمام قابلیت‌های اصلی شامل مدیریت محصولات، سبد خرید، پرداخت آنلاین، و پنل مدیریت پیشرفته.

---

## فاز ۱: Schema و Frontend (تسک ۱)

### ۱.۱ طراحی مدل داده‌ها
- [x] ۱.۱.۱ جدول کاربران (users) - با Replit Auth
- [x] ۱.۱.۲ جدول sessions برای احراز هویت
- [x] ۱.۱.۳ جدول دسته‌بندی‌ها (categories)
- [x] ۱.۱.۴ جدول محصولات (products)
- [x] ۱.۱.۵ جدول تصاویر محصولات (product_images)
- [x] ۱.۱.۶ جدول آدرس‌ها (addresses)
- [x] ۱.۱.۷ جدول سبد خرید (cart_items)
- [x] ۱.۱.۸ جدول سفارشات (orders)
- [x] ۱.۱.۹ جدول آیتم‌های سفارش (order_items)
- [x] ۱.۱.۱۰ ایجاد روابط بین جداول

### ۱.۲ پیکربندی طراحی
- [x] ۱.۲.۱ تنظیم فونت‌ها در index.html
- [x] ۱.۲.۲ تنظیم رنگ‌ها در tailwind.config.ts
- [x] ۱.۲.۳ افزودن متغیرهای CSS سفارشی

### ۱.۳ کامپوننت‌های مشترک
- [x] ۱.۳.۱ Header با منوی ناوبری و سبد خرید
- [x] ۱.۳.۲ Footer با لینک‌ها و اطلاعات تماس
- [x] ۱.۳.۳ ProductCard برای نمایش محصولات
- [x] ۱.۳.۴ CartDrawer برای سبد خرید کشویی
- [x] ۱.۳.۵ SearchBar با جستجوی زنده
- [x] ۱.۳.۶ CategoryFilter برای فیلتر دسته‌بندی
- [x] ۱.۳.۷ PriceFilter برای فیلتر قیمت
- [x] ۱.۳.۸ Loading و Skeleton states
- [x] ۱.۳.۹ ThemeToggle برای تغییر تم

### ۱.۴ صفحات عمومی
- [x] ۱.۴.۱ Landing Page با Hero section
- [x] ۱.۴.۲ صفحه محصولات با فیلترها
- [x] ۱.۴.۳ صفحه جزئیات محصول
- [x] ۱.۴.۴ صفحه سبد خرید
- [x] ۱.۴.۵ صفحه Checkout چندمرحله‌ای
- [x] ۱.۴.۶ صفحه درباره ما
- [x] ۱.۴.۷ صفحه تماس با ما
- [x] ۱.۴.۸ صفحه قوانین و مقررات

### ۱.۵ صفحات کاربری
- [x] ۱.۵.۱ داشبورد کاربر
- [x] ۱.۵.۲ لیست سفارشات کاربر
- [x] ۱.۵.۳ جزئیات سفارش
- [x] ۱.۵.۴ مدیریت آدرس‌ها
- [x] ۱.۵.۵ پروفایل کاربری

### ۱.۶ پنل ادمین
- [x] ۱.۶.۱ داشبورد ادمین با آمار
- [x] ۱.۶.۲ لیست و مدیریت محصولات
- [x] ۱.۶.۳ افزودن/ویرایش محصول
- [x] ۱.۶.۴ مدیریت دسته‌بندی‌ها
- [x] ۱.۶.۵ لیست و مدیریت سفارشات
- [x] ۱.۶.۶ جزئیات و تغییر وضعیت سفارش
- [x] ۱.۶.۷ لیست کاربران

---

## فاز ۲: Backend (تسک ۲)

### ۲.۱ پایگاه داده
- [ ] ۲.۱.۱ ایجاد فایل db.ts
- [ ] ۲.۱.۲ اجرای migration با db:push
- [ ] ۲.۱.۳ Seed داده‌های اولیه

### ۲.۲ Storage Interface
- [ ] ۲.۲.۱ متدهای کاربران
- [ ] ۲.۲.۲ متدهای دسته‌بندی‌ها
- [ ] ۲.۲.۳ متدهای محصولات
- [ ] ۲.۲.۴ متدهای سبد خرید
- [ ] ۲.۲.۵ متدهای آدرس‌ها
- [ ] ۲.۲.۶ متدهای سفارشات

### ۲.۳ API Routes
- [ ] ۲.۳.۱ Authentication routes
- [ ] ۲.۳.۲ Categories API
- [ ] ۲.۳.۳ Products API
- [ ] ۲.۳.۴ Cart API
- [ ] ۲.۳.۵ Addresses API
- [ ] ۲.۳.۶ Orders API
- [ ] ۲.۳.۷ Admin routes

---

## فاز ۳: Integration و Testing (تسک ۳)

### ۳.۱ اتصال فرانت‌اند به بک‌اند
- [ ] ۳.۱.۱ اتصال صفحه اصلی
- [ ] ۳.۱.۲ اتصال لیست محصولات
- [ ] ۳.۱.۳ اتصال جزئیات محصول
- [ ] ۳.۱.۴ اتصال سبد خرید
- [ ] ۳.۱.۵ اتصال Checkout
- [ ] ۳.۱.۶ اتصال پنل کاربری
- [ ] ۳.۱.۷ اتصال پنل ادمین

### ۳.۲ بهینه‌سازی نهایی
- [ ] ۳.۲.۱ Loading states
- [ ] ۳.۲.۲ Error handling
- [ ] ۳.۲.۳ Empty states
- [ ] ۳.۲.۴ Responsive design check
- [ ] ۳.۲.۵ Accessibility check

### ۳.۳ تست
- [ ] ۳.۳.۱ تست مسیر خرید
- [ ] ۳.۳.۲ تست پنل ادمین
- [ ] ۳.۳.۳ تست احراز هویت

---

## تکنولوژی‌های استفاده شده

### Frontend
- React 18 + TypeScript
- Tailwind CSS + Shadcn UI
- React Query (TanStack Query)
- Wouter برای routing
- React Hook Form + Zod

### Backend
- Express.js + TypeScript
- PostgreSQL + Drizzle ORM
- Replit Auth (OpenID Connect)

### ابزارها
- Vite برای bundling
- ESBuild برای build

---

## ساختار پوشه‌ها

```
├── client/
│   └── src/
│       ├── components/
│       │   ├── ui/           # Shadcn components
│       │   ├── layout/       # Header, Footer, Sidebar
│       │   ├── products/     # Product related components
│       │   ├── cart/         # Cart components
│       │   └── admin/        # Admin panel components
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Products.tsx
│       │   ├── ProductDetail.tsx
│       │   ├── Cart.tsx
│       │   ├── Checkout.tsx
│       │   ├── admin/        # Admin pages
│       │   └── user/         # User dashboard pages
│       ├── hooks/
│       ├── lib/
│       └── stores/           # Cart state management
├── server/
│   ├── routes.ts
│   ├── storage.ts
│   ├── db.ts
│   └── replitAuth.ts
└── shared/
    └── schema.ts
```

---

## وضعیت فعلی
- ✅ پایگاه داده PostgreSQL ایجاد شد
- ✅ Blueprintهای Database و Auth اضافه شدند
- 🔄 در حال پیاده‌سازی فاز ۱ (Schema و Frontend)
