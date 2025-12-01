# 📋 فرصت‌های Refactoring - فایل‌های Backend بزرگ

## 🎯 خلاصه
در backend 2 فایل بسیار بزرگ وجود دارد که می‌توان آنها را به 15+ فایل کوچک تقسیم کرد.

---

## 1️⃣ **server/routes.ts** ⚠️ URGENT
### 📊 وضعیت کنونی:
- **اندازه:** 2267 خط (74KB)
- **مسئولیت:** 129+ مسیر API

### 📝 مسئولیت‌های مختلف:
```
✅ Auth Routes           (login, register, logout)
✅ Public Routes         (categories, products, articles)
✅ Cart Routes           (add, remove, update items)
✅ Order Routes          (create, update, list)
✅ User Routes           (profile, addresses, wallet)
✅ Admin Routes          (CRUD for all models)
✅ Image Upload Routes   (banner, slider, product images)
✅ Search Analytics      (tracking searches)
```

### 🔄 پیشنهاد تقسیم‌بندی:
```
server/
├── routes/
│   ├── auth.ts           (20-30 خط)
│   ├── public.ts         (50-70 خط)
│   ├── cart.ts           (30-50 خط)
│   ├── orders.ts         (40-60 خط)
│   ├── users.ts          (30-50 خط)
│   ├── products.ts       (50-80 خط)
│   ├── categories.ts     (20-30 خط)
│   ├── reviews.ts        (20-30 خط)
│   ├── admin/
│   │   ├── articles.ts   (20-30 خط)
│   │   ├── banners.ts    (20-30 خط)
│   │   ├── sliders.ts    (20-30 خط)
│   │   ├── brands.ts     (20-30 خط)
│   │   ├── settings.ts   (15-20 خط)
│   │   ├── questions.ts  (15-20 خط)
│   │   ├── reports.ts    (15-20 خط)
│   │   └── index.ts      (export همه‌ها)
│   └── index.ts          (تعریف و export)
├── middleware/
│   ├── auth.ts           (auth middleware)
│   ├── admin.ts          (admin check)
│   └── validate.ts       (validation)
└── routes.ts             (فقط registerRoutes)
```

### 🎯 نتیجه:
```
routes.ts   :  2267 → 200 خط
routes/     :  13 فایل جدید
middleware/ :  3 فایل جدید
```

---

## 2️⃣ **server/storage.ts** ⚠️ URGENT
### 📊 وضعیت کنونی:
- **اندازه:** 1227 خط (41KB)
- **متدهای مختلف:** 120+ متد

### 📝 مسئولیت‌های مختلف:
```
✅ User Operations       (getUser, createUser, updateUser)
✅ Category Operations   (CRUD categories)
✅ Product Operations    (CRUD products)
✅ Cart Operations       (add, remove, cart items)
✅ Order Operations      (create orders, update status)
✅ Review Operations     (CRUD reviews)
✅ Wishlist Operations   (add, remove, get wishlist)
✅ Coupon Operations     (validate, create, apply)
✅ Article Operations    (CRUD articles)
✅ Admin Operations      (banners, sliders, brands, etc.)
✅ Wallet Operations     (credit points, user wallets)
```

### 🔄 پیشنهاد تقسیم‌بندی:
```
server/
├── storage/
│   ├── users.ts          (30-40 خط)
│   ├── categories.ts     (20-30 خط)
│   ├── products.ts       (50-70 خط)
│   ├── cart.ts           (20-30 خط)
│   ├── orders.ts         (40-60 خط)
│   ├── reviews.ts        (20-30 خط)
│   ├── wishlist.ts       (15-25 خط)
│   ├── coupons.ts        (20-30 خط)
│   ├── addresses.ts      (15-20 خط)
│   ├── articles.ts       (20-30 خط)
│   ├── news.ts           (20-30 خط)
│   ├── pages.ts          (15-20 خط)
│   ├── admin/
│   │   ├── banners.ts    (15-20 خط)
│   │   ├── sliders.ts    (15-20 خط)
│   │   ├── brands.ts     (15-20 خط)
│   │   ├── attributes.ts (15-20 خط)
│   │   ├── shipping.ts   (15-20 خط)
│   │   ├── questions.ts  (15-20 خط)
│   │   ├── answers.ts    (15-20 خط)
│   │   └── index.ts      (export)
│   ├── wallet.ts         (20-30 خط)
│   ├── analytics.ts      (10-15 خط)
│   ├── types.ts          (interface IStorage)
│   └── index.ts          (export class Storage)
└── storage.ts            (فقط export)
```

### 🎯 نتیجه:
```
storage.ts  :  1227 → 100 خط
storage/    :  18 فایل جدید
```

---

## 3️⃣ **server/utils/advanced-auth.ts**
### 📊 وضعیت کنونی:
- **اندازه:** 298 خط
- **وظایف:** Advanced authentication logic

### 🔄 پیشنهاد تقسیم‌بندی:
```
server/
├── auth/
│   ├── strategies/
│   │   ├── local.ts        (20-30 خط)
│   │   ├── openid.ts       (30-40 خط)
│   │   └── index.ts
│   ├── tokens.ts           (20-30 خط)
│   ├── validation.ts       (20-30 خط)
│   ├── middleware.ts       (15-20 خط)
│   └── index.ts            (export)
└── utils/
    └── advanced-auth.ts    (150 خط - باقی‌مانده)
```

### 🎯 نتیجه:
```
advanced-auth.ts  :  298 → 100 خط
auth/             :  5 فایل جدید
```

---

## 4️⃣ **server/utils/logger.ts**
### 📊 وضعیت کنونی:
- **اندازه:** 284 خط
- **وظایف:** Professional logging system

### 🔄 پیشنهاد تقسیم‌بندی:
```
server/
├── logging/
│   ├── logger.ts       (100-120 خط - core logging)
│   ├── formatters.ts   (50-60 خط - format helpers)
│   ├── transports.ts   (40-50 خط - file transports)
│   ├── middleware.ts   (30-40 خط - logging middleware)
│   └── index.ts        (export)
└── utils/
    └── logger.ts       (60 خط - wrapper)
```

### 🎯 نتیجه:
```
logger.ts   :  284 → 60 خط
logging/    :  4 فایل جدید
```

---

## 📊 خلاصه کلی

| فایل | خط | → | پیشنهاد | فایل جدید |
|------|-----|---|---------|----------|
| routes.ts | 2267 | → | 200 | 16 |
| storage.ts | 1227 | → | 100 | 18 |
| advanced-auth.ts | 298 | → | 100 | 5 |
| logger.ts | 284 | → | 60 | 4 |
| **کل** | **4076** | → | **460** | **43 فایل جدید** |

---

## 🎯 مرحله‌ی اجرا (ترتیب اولویت)

### مرحله 1 (اول): **server/routes.ts** ✅
- بزرگ‌ترین فایل
- بیشترین مسئولیت
- تقسیم‌بندی واضح

### مرحله 2: **server/storage.ts**
- دومین فایل بزرگ
- بیشترین تعداد متد
- ساختار‌بندی منطقی

### مرحله 3: **server/utils/advanced-auth.ts**
- مسئولیت‌های متنوع
- نیاز‌های امنیتی

### مرحله 4: **server/utils/logger.ts**
- کمتر استفاده به‌صورت مستقیم
- می‌تواند آخر انجام شود

---

## ✅ فوایدی که نتیجه می‌شود

| مزیت | توضیح |
|------|--------|
| 📖 **خوانایی** | هر فایل یک کار دارد |
| 🔧 **نگهداری** | تغییر آسان‌تر و سریع‌تر |
| 🧪 **تست** | هر بخش را جداگانه تست کنید |
| 🔄 **استفاده مجدد** | متدها قابل import در جاهای دیگر |
| 👥 **تیمی** | چند نفر می‌تونند روی فایل‌های مختلف کار کنند |
| 📊 **کارایی** | Lazy loading بهتر شود |
| 🎯 **روشن‌تر** | ساختار backend برای تیم روشن‌تر است |

---

## 🚀 چگونه شروع کنیم؟

اگر می‌خواهید شروع کنیم:

```bash
# مثال: routes.ts را شروع کنیم
server/
└── routes/
    ├── auth.ts         # کپی کنید از routes.ts
    ├── public.ts       # کپی کنید
    ├── cart.ts         # کپی کنید
    └── index.ts        # export همه‌ها
```

---

## 📌 نکات مهم

1. **نترتیب:** ترتیب اولویت فوق را دنبال کنید
2. **تدریجی:** هر فایل را کامل تکمیل کنید
3. **تست:** بعد از هر تقسیم‌بندی، workflow را بررسی کنید
4. **Backup:** قبل از هر تغییر، backup بگیرید (Git commit)
5. **Document:** هر فایل جدید را با نظر توضیح دهید
