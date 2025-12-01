# 🔧 تنظیم محیط متغیرها

## بررسی کلی

متغیرهای محیط تنظیمات سرور، دیتابیس، و خدمات خارجی را کنترل می‌کنند.

## متغیرهای دیتابیس

```env
# PostgreSQL Connection
DATABASE_URL=postgresql://user:password@host:5432/dbname
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=secure_password
PGDATABASE=ecommerce_db
```

**توضیح:**
- `DATABASE_URL`: کامل connection string (Drizzle برای)
- `PGHOST`: میزبان دیتابیس
- `PGPORT`: پورت PostgreSQL (معمولا 5432)
- `PGUSER`: کاربر دیتابیس
- `PGPASSWORD`: رمز عبور
- `PGDATABASE`: نام دیتابیس

## متغیرهای احراز

```env
# Replit OAuth
REPLIT_AUTH_TOKEN=your_replit_token

# JWT
JWT_SECRET=your_jwt_secret_key_min_32_chars
SESSION_SECRET=your_session_secret_min_32_chars
```

## متغیرهای سرور

```env
# Environment
NODE_ENV=development|staging|production
PORT=5000

# Logging
LOG_LEVEL=debug|info|warn|error
LOG_DIR=./logs
```

## متغیرهای اختیاری

```env
# Cache
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Payment Gateways
ZARINPAL_MERCHANT_ID=xxx
MELLAT_MERCHANT_ID=xxx

# AWS/Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
```

## شکل .env.local

```env
# Database
DATABASE_URL=postgresql://postgres:mypass@localhost:5432/ecommerce
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=mypass
PGDATABASE=ecommerce

# Server
NODE_ENV=development
PORT=5000

# Security
SESSION_SECRET=abcdefghijklmnopqrstuvwxyz123456
JWT_SECRET=zyxwvutsrqponmlkjihgfedcba654321
REPLIT_AUTH_TOKEN=token_from_replit

# Logging
LOG_LEVEL=debug
```

## ایمن‌سازی

### متغیرهای حساس
```bash
# نمی‌رود git میں:
echo ".env.local" >> .gitignore

# برای CI/CD از Secrets استفاده کنید
# GitHub: Settings > Secrets
# Replit: Secrets tab
```

### بهترین عملکردها

1. **Dev vs Production**
   - Development: DEBUG logs فعال
   - Production: صرف ERROR logs

2. **بدون Hardcoded Secrets**
   ```typescript
   // ❌ نه
   const PASSWORD = "12345";
   
   // ✅ بلی
   const PASSWORD = process.env.DB_PASSWORD;
   ```

3. **Validation**
   ```typescript
   if (!process.env.DATABASE_URL) {
     throw new Error('DATABASE_URL not set');
   }
   ```

## تست متغیرها

```bash
# فهرست تمام متغیرها
env | grep DATABASE

# چک یک متغیر
echo $DATABASE_URL

# موقتی متغیر را تنظیم کنید
DATABASE_URL=... npm run dev
```

---

**محدثه:** 1 دسامبر 2025
