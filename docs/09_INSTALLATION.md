# 💾 راهنمای نصب

## شروع سریع (5 دقیقه)

```bash
# 1. کلون پروژه
git clone https://github.com/yourrepo/ecommerce.git
cd ecommerce

# 2. نصب وابستگی‌ها
npm install

# 3. تنظیم محیط
cp .env.example .env.local
# ویرایش .env.local با متغیرهای واقعی

# 4. تهیه دیتابیس
npm run db:push

# 5. شروع توسعه
npm run dev
```

## متطلبات سیستم

| نرم‌افزار | نسخه | نحوه نصب |
|-----------|------|----------|
| Node.js | 18.0+ | https://nodejs.org |
| npm | 9.0+ | با Node.js شامل |
| PostgreSQL | 14+ | https://postgresql.org |
| Git | 2.40+ | https://git-scm.com |

## نصب تفصیلی

### مرحله 1: نصب Node.js

**macOS:**
```bash
brew install node@18
node --version  # v18.x.x
npm --version   # 9.x.x
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
- دانلود: https://nodejs.org/
- راه‌اندازی installer و دنبال کردن مراحل

### مرحله 2: نصب PostgreSQL

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql-14 postgresql-contrib-14
sudo systemctl start postgresql
```

**Windows:**
- دانلود: https://postgresql.org/download/windows
- راه‌اندازی Installer

### مرحله 3: کلون پروژه

```bash
# SSH (توصیه شده)
git clone git@github.com:yourrepo/ecommerce.git cd ecommerce

# یا HTTPS
git clone https://github.com/yourrepo/ecommerce.git
cd ecommerce
```

### مرحله 4: نصب وابستگی‌ها

```bash
# نصب تمام packages
npm install

# اگر خطا داشت:
npm cache clean --force
npm install

# اگر هنوز خطا:
npm install --legacy-peer-deps
```

### مرحله 5: تنظیم متغیرهای محیط

```bash
# کپی کن فایل نمونه
cp .env.example .env.local

# ویرایش با IDE یا nano
nano .env.local
```

**متغیرهای ضروری:**
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=ecommerce

# Server
NODE_ENV=development
PORT=5000

# Security
SESSION_SECRET=your_super_secret_key_min_32_characters_long
REPLIT_AUTH_TOKEN=get_from_replit

# Optional
JWT_SECRET=your_jwt_secret
LOG_LEVEL=debug
```

### مرحله 6: تهیه دیتابیس

```bash
# اطمینان از اجرای PostgreSQL
psql -U postgres -c "SELECT 1"

# اجرای migrations
npm run db:push

# اگر خطا:
npm run db:push -- --force

# بررسی schema
npm run db:studio
```

### مرحله 7: شروع سرور

```bash
# حالت توسعه (HMR فعال)
npm run dev

# حالت production
npm run build
npm run start
```

**خروجی موفق:**
```
✓ vite connected
[INFO] express: serving on port 5000
```

## بررسی نصب

```bash
# آزمایش قطعات مختلف
node --version           # v18.x.x ✓
npm --version            # 9.x.x ✓
git --version            # 2.4x.x ✓
psql --version           # PostgreSQL 14.x ✓
curl http://localhost:5000  # Success ✓
```

## مشکلات شایع

| مشکل | حل |
|------|-----|
| **npm install fails** | `npm cache clean --force && npm install` |
| **Port 5000 در استفاده** | `lsof -i :5000` سپس `kill -9 <PID>` |
| **PostgreSQL connect error** | `sudo service postgresql start` |
| **Schema mismatch** | `npm run db:push --force` |
| **HMR not working** | ریفرش مرورگر یا `npm run dev` دوباره شروع |

---

**محدثه:** 1 دسامبر 2025
