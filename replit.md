# فروشگاه اینترنتی - پروژه Replit

## نمای کلی
پلتفرم e-commerce کامل با ویژگی‌های پیشرفته شامل:
- کاتالوگ محصولات با جستجو و فیلتر
- سبد خریدی و Checkout چند مرحله‌ای
- سیستم کاربری و احراز هویت
- پنل مدیریت (Admin Dashboard)
- رابط کاربری فارسی (RTL) و Dark Mode
- صفحات ایستا (درباره ما، تماس ما، شرایط و ضوابط)

## معماری پروژه

### Frontend (React + TypeScript)
```
client/src/
├── pages/
│   ├── Landing.tsx          - صفحه اول
│   ├── Products.tsx         - لیست محصولات
│   ├── ProductDetail.tsx    - جزئیات محصول
│   ├── Cart.tsx             - سبد خریدی
│   ├── Checkout.tsx         - فرآیند خرید
│   ├── About.tsx            - درباره ما
│   ├── Contact.tsx          - تماس ما
│   ├── Terms.tsx            - شرایط و ضوابط
│   ├── account/
│   │   ├── Dashboard.tsx    - داشبورد کاربر
│   │   ├── Orders.tsx       - سفارشات
│   │   ├── OrderDetail.tsx  - جزئیات سفارش
│   │   ├── Addresses.tsx    - مدیریت آدرس‌ها
│   │   └── Profile.tsx      - پروفایل کاربری
│   └── admin/
│       ├── AdminLayout.tsx  - طراحی پنل ادمین
│       ├── Dashboard.tsx    - داشبورد ادمین
│       ├── Products.tsx     - مدیریت محصولات
│       ├── ProductForm.tsx  - افزودن/ویرایش محصول
│       ├── Categories.tsx   - مدیریت دسته‌بندی‌ها
│       ├── Orders.tsx       - مدیریت سفارشات
│       └── Users.tsx        - مدیریت کاربران
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── ThemeProvider.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── CartDrawer.tsx
│   └── ui/               - shadcn/ui کامپوننت‌ها
├── hooks/
│   ├── useAuth.ts        - احراز هویت
│   └── use-toast.ts
├── stores/
│   └── cartStore.ts      - Zustand state
└── lib/
    └── queryClient.ts    - TanStack Query
```

### Backend (Express + TypeScript)
```
server/
├── routes.ts        - تمام API endpoints
├── storage.ts       - DatabaseStorage implementation
├── db.ts           - Drizzle ORM setup
└── vite.ts         - Vite integration
```

### Database (PostgreSQL + Drizzle)
```
shared/schema.ts    - Drizzle ORM schemas:
├── users           - اطلاعات کاربران
├── categories      - دسته‌بندی‌های محصول
├── products        - محصولات
├── productImages   - تصاویر محصولات
├── addresses       - آدرس‌های کاربران
├── cartItems       - اقلام سبد خریدی
├── orders          - سفارشات
└── orderItems      - اقلام سفارش
```

## تکنولوژی‌های استفاده شده

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Pre-built components
- **Wouter** - Routing
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Express.js** - Web server
- **Drizzle ORM** - Database
- **PostgreSQL** - Database
- **Zod** - Validation
- **Replit Auth** - Authentication

### DevOps
- **Vite** - Frontend build tool
- **TypeScript** - Type checking
- **npm** - Package management

## ویژگی‌های اصلی

### برای کاربران
✅ مرور محصولات با جستجو و فیلتر
✅ مشاهده جزئیات محصول
✅ اضافه کردن به سبد خریدی
✅ Checkout چند مرحله‌ای
✅ مدیریت آدرس‌های تحویل
✅ پروفایل کاربری
✅ تاریخچه سفارشات
✅ ردیابی سفارش
✅ پشتیبانی فارسی و Dark Mode

### برای ادمین
✅ داشبورد با آمار
✅ مدیریت محصولات (CRUD)
✅ مدیریت دسته‌بندی‌ها
✅ ردیابی سفارشات
✅ مدیریت کاربران و نقش‌ها
✅ رابط کاربری بهینه‌شده

## راهنمای اجرا

### Setup اولیه
```bash
npm install           # نصب وابستگی‌ها
npm run db:push      # مهاجرت database
npm run dev          # شروع توسعه
```

### Build برای production
```bash
npm run build        # Build کردن
npm run start        # اجرا
```

## ساختار API

### Public Routes
- `GET /api/categories` - تمام دسته‌بندی‌ها
- `GET /api/products` - لیست محصولات
- `GET /api/products/:slug` - جزئیات محصول

### Auth Routes (نیاز به login)
- `GET /api/auth/user` - اطلاعات کاربر
- `PATCH /api/auth/user` - بروزرسانی کاربر

### User Routes (نیاز به login)
- `GET /api/addresses` - آدرس‌های کاربر
- `POST /api/addresses` - افزودن آدرس
- `PATCH /api/addresses/:id` - ویرایش آدرس
- `DELETE /api/addresses/:id` - حذف آدرس
- `GET /api/cart` - سبد خریدی
- `POST /api/cart` - اضافه کردن به سبد
- `PATCH /api/cart/:id` - بروزرسانی سبد
- `DELETE /api/cart/:id` - حذف از سبد
- `GET /api/orders` - سفارشات کاربر
- `GET /api/orders/:id` - جزئیات سفارش
- `POST /api/orders` - ایجاد سفارش

### Admin Routes (نیاز به admin role)
- `GET /api/admin/stats` - آمار
- `GET /api/admin/categories` - مدیریت دسته‌بندی‌ها
- `GET /api/admin/products` - مدیریت محصولات
- `GET /api/admin/orders` - مدیریت سفارشات
- `GET /api/admin/users` - مدیریت کاربران

## مراحل بعدی

1. ✅ Schema و Frontend کامل
2. ✅ Backend API endpoints
3. ⏳ Test و بهینه‌سازی
4. ⏳ آپلود/استقرار

## پیش‌نیاز‌ها

- Node.js 18+
- PostgreSQL database
- Replit Auth credentials
- Browser مدرن

## توجه نکات

- تمام متون به فارسی هستند
- رابط RTL شده
- Dark mode پشتیبانی‌شده
- Responsive design برای تمام دستگاه‌ها
- State management برای cart بدون اتصال سرور
- Toast notifications برای feedback
