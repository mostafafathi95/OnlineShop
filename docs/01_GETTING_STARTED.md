# 🚀 شروع سریع - راهنمای اول

## مرحبا! 👋

این دستاویز برای توسعه‌دهندگانی است که می‌خواهند تا 15 دقیقه در 5 مرحله پروژه را شروع کنند.

## ✅ نیازمندی‌های سیستم

```
Node.js: 18.0+
npm: 9.0+
PostgreSQL: 14+
Git: 2.40+
```

## 📋 5 مرحله شروع

### مرحله 1: کلون و نصب (2 دقیقه)

```bash
# کلون پروژه
git clone https://github.com/yourrepo/ecommerce.git
cd ecommerce

# نصب وابستگی‌ها
npm install

# اگر npm install کند نکرد:
npm ci --legacy-peer-deps
```

### مرحله 2: تنظیم محیط (3 دقیقه)

```bash
# فایل متغیرهای محیط را کپی کنید
cp .env.example .env.local

# متغیرها را تکمیل کنید:
nano .env.local
# یا
code .env.local
```

**متغیرهای ضروری:**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
REPLIT_AUTH_TOKEN=your_token
SESSION_SECRET=your_secret_key
NODE_ENV=development
```

### مرحله 3: دیتابیس (5 دقیقه)

```bash
# اگر PostgreSQL اجرا نمی‌شود:
# macOS: brew install postgresql@14
# Ubuntu: sudo apt install postgresql

# شروع سرویس PostgreSQL
sudo service postgresql start

# تهیه دیتابیس
npm run db:push

# بررسی schema
npm run db:studio
```

### مرحله 4: شروع سرور (2 دقیقه)

```bash
# شروع در حالت توسعه
npm run dev

# دیگر ترمینال برای دیدن لاگ‌ها
npm run dev -- --verbose
```

**خروجی موفق:**
```
[INFO] express: serving on port 5000
✓ vite connected
```

### مرحله 5: بررسی (3 دقیقه)

```bash
# بروید به مرورگر
http://localhost:5000

# بخش ادمین
http://localhost:5000/admin

# API سلامتی
curl http://localhost:5000/api/health
```

## 🎯 اولین کارهای شما

### 1️⃣ پروژه را بررسی کنید
```bash
# ساختار فایل‌ها
ls -la client/src/pages
ls -la server
ls -la shared

# تعداد فایل‌های TypeScript
find . -name "*.ts" -o -name "*.tsx" | wc -l
```

### 2️⃣ یک صفحه ساده ایجاد کنید

```typescript
// client/src/pages/Tutorial.tsx
export default function Tutorial() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        🎉 سلام! من اینجا هستم!
      </h1>
    </div>
  )
}
```

### 3️⃣ یک API endpoint ایجاد کنید

```typescript
// server/routes.ts میں اضافه کنید:
app.get('/api/tutorial', (req, res) => {
  res.json({ message: 'سلام جهان!' })
})
```

## 🐛 حل مشکلات سریع

| مشکل | حل |
|------|-----|
| **پورت 5000 در حال استفاده است** | `lsof -i :5000` سپس `kill -9 <PID>` |
| **PostgreSQL متصل نشود** | `psql -U postgres` برای بررسی |
| **npm install ناموفق** | `rm -rf node_modules && npm install` |
| **دیتابیس خالی است** | `npm run db:push --force` |
| **HMR کار نمی‌کند** | `npm run dev` را دوباره شروع کنید |

## 📚 بعدی چیست؟

اگر موفق بودید، اینها را بخوانید:

1. 📖 **02_PROJECT_OVERVIEW.md** - نمای کلی پروژه
2. 🏗️ **03_ARCHITECTURE.md** - معماری سیستم
3. 🔌 **07_BACKEND_GUIDE.md** - توسعه Backend
4. ⚛️ **08_FRONTEND_GUIDE.md** - توسعه Frontend

## 💬 نیاز کمک دارید؟

- 🔍 **34_TROUBLESHOOTING.md** را بخوانید
- 💻 **17_DEBUGGING_TIPS.md** را امتحان کنید
- 🚨 **31_ERROR_CODES.md** را چک کنید

---

**شما آماده‌اید! 🚀 اکنون شروع کنید!**
