# 🚀 راهنمای استقرار

## نمای کلی

پروژه می‌تواند روی چندین پلتفرم اجرا شود:
- Replit (ساده ترین)
- Heroku
- AWS
- DigitalOcean
- Docker Containers

## استقرار روی Replit

### مرحله 1: Push کردن کد

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### مرحله 2: متغیرهای محیط

1. رفتن به Replit > Secrets
2. اضافه کردن تمام متغیرهای ضروری:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `REPLIT_AUTH_TOKEN`

### مرحله 3: اجرای دستورات

```bash
# نصب وابستگی‌ها
npm install

# تهیه دیتابیس
npm run db:push

# ساخت
npm run build
```

### مرحله 4: راه‌اندازی

Replit به صورت خودکار:
- اجرای `npm run dev` یا `npm start`
- نمایش URL عمومی

## استقرار روی Heroku

### نصب Heroku CLI

```bash
brew install heroku
heroku login
```

### راه‌اندازی اپ

```bash
# ایجاد اپ
heroku create my-ecommerce-app

# اضافه کردن PostgreSQL
heroku addons:create heroku-postgresql:standard-0

# متغیرهای محیط
heroku config:set SESSION_SECRET=xxx
heroku config:set REPLIT_AUTH_TOKEN=xxx

# Deploy
git push heroku main

# لاگ‌ها
heroku logs --tail
```

## استقرار با Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# نصب وابستگی‌ها
COPY package*.json ./
RUN npm ci --only=production

# کپی کردن کد
COPY . .

# Build
RUN npm run build

# Port
EXPOSE 5000

# شروع
CMD ["npm", "run", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/ecommerce
      NODE_ENV: production
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### اجرا

```bash
docker-compose up -d
```

## Checklist قبل Deploy

- ✅ تمام Tests pass شد
- ✅ `npm run build` بدون خطا
- ✅ `.env` در `.gitignore` است
- ✅ Database migrations تست شد
- ✅ هیچ sensitive data در کد نیست
- ✅ SSL/HTTPS فعال است
- ✅ Secrets تنظیم شده‌اند
- ✅ Monitoring فعال است

## Health Check

```bash
# بررسی سلامتی سرور
curl https://your-domain.com/api/health

# بررسی دیتابیس
curl https://your-domain.com/api/db/health
```

## Rollback

```bash
# Heroku
heroku releases
heroku rollback v42

# Git
git revert <commit-hash>
git push origin main
```

## مراقبت و نگهداری

```bash
# لاگ‌ها
npm run logs

# Monitoring
- CPU usage
- Memory usage
- Database connections
- API response time
- Error rates
```

---

**محدثه:** 1 دسامبر 2025
