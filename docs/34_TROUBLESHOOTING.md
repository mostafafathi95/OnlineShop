# 🔧 راهنمای حل مشکلات

## شروع

### مشکل: npm install ناموفق

```bash
# حل 1
npm cache clean --force
npm install

# حل 2
rm -rf node_modules package-lock.json
npm install

# حل 3
npm install --legacy-peer-deps
```

### مشکل: PostgreSQL متصل نشود

```bash
# بررسی اگر اجرا میشود
psql -U postgres

# شروع کن
brew services start postgresql@14

# یا
sudo service postgresql start
```

## توسعه

### مشکل: Port 5000 استفاده‌شده

```bash
lsof -i :5000
kill -9 <PID>
npm run dev
```

### مشکل: HMR کار نمی‌کند

```bash
# بازنشانی
npm run dev

# یا
Refresh browser (F5)
```

### مشکل: نوشته‌های دیتابیس کار نمی‌کند

```bash
npm run db:push --force
npm run db:studio
```

## Production

### مشکل: سرور اجرا نمی‌شود

```bash
npm run build
npm run start

# یا
node dist/server/index.js
```

### مشکل: لاگ‌ها جای نیست

```bash
tail -f logs/api/*.log
tail -f logs/errors/*.log
```

---

**محدثه:** 1 دسامبر 2025
