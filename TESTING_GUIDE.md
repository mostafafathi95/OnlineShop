# 🧪 Testing Guide - آزمائشی رہنما

## درباره
پروژے کی جانچ اور تنقیح

---

## ✅ Manual Testing

### 1️⃣ بنیادی Flows

**صارف کی رجسٹریشن**
```
1. /auth/register جائیں
2. معلومات درج کریں
3. Verify کریں
4. Login کریں
```

**محصول کی خریداری**
```
1. /products جائیں
2. محصول منتخب کریں
3. سبد میں شامل کریں
4. Checkout کریں
5. ادائیگی کریں
```

### 2️⃣ Admin Testing

**Dashboard**
```
1. /admin/dashboard
2. اعدادوشمار چیک کریں
3. تقریریں دیکھیں
```

**Products Management**
```
1. /admin/products
2. محصول شامل کریں
3. Edit کریں
4. Delete کریں
```

---

## 🔍 API Testing

### Postman Collection

**Auth Endpoints**
```
POST /api/auth/register
  Body: { email, password, firstName, lastName }

POST /api/auth/login
  Body: { email, password }

GET /api/auth/me
  Header: Authorization: Bearer {token}
```

**Product Endpoints**
```
GET /api/products
  Params: page, limit, category, sort

GET /api/products/:id
  
POST /api/products (admin)
  Body: { name, price, description, ... }
```

---

## 🐛 Debugging Tips

### Browser DevTools
1. F12 دبائیں
2. Network tab دیکھیں
3. API responses چیک کریں
4. Console errors دیکھیں

### Server Logs
```bash
cat server/logs/api/*.log
cat server/logs/errors/*.log
```

### Database
```bash
npm run db:studio
```

---

## ✨ Checklist

- [ ] صارف رجسٹریشن
- [ ] صارف لاگ ان
- [ ] محصول تلاش
- [ ] سبد خرید
- [ ] چیک آؤٹ
- [ ] ادائیگی
- [ ] آرڈر تاریخ
- [ ] Admin dashboard
- [ ] محصول شامل کریں
- [ ] صارفین دیکھیں

---

**محدثه:** 1 دسامبر 2025
