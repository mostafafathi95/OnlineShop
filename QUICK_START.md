# ⚡ تیز رفتار شروع - Quick Start

## 🚀 فوری شروع (5 منٹ)

### 1️⃣ نصب کریں
```bash
npm install
```

### 2️⃣ Database بنائیں
```bash
npm run db:push
```

### 3️⃣ شروع کریں
```bash
npm run dev
```

### 4️⃣ کھولیں
```
http://localhost:5000
```

---

## 📚 اہم فائلیں

| فائل | درباره |
|------|--------|
| `README.md` | مکمل documentation |
| `docs/01_ARCHITECTURE.md` | معماری |
| `shared/schema.ts` | Database schema |
| `server/routes.ts` | API endpoints |
| `client/src/App.tsx` | Frontend routes |

---

## 🎯 آنے والی اگلی اقدام

1. **صارف بنائیں** → `/auth/register`
2. **محصول شامل کریں** → `/admin/products`
3. **سفارش کریں** → `/products`

---

## 🔧 مفید Commands

```bash
# Development
npm run dev        # شروع کریں
npm run check      # Type check
npm run build      # تیار کریں

# Database
npm run db:push    # Schema sync
npm run db:drop    # Reset (احتیاط!)

# Admin
npm run db:studio  # Drizzle Studio
```

---

## 📞 مسائل؟

- **API خرابی؟** → `docs/34_TROUBLESHOOTING.md`
- **Database error؟** → `docs/02_DATABASE.md`
- **Deployment؟** → `docs/11_DEPLOYMENT.md`

---

**ورژن:** 3.0 | **آخری تاریخ:** 1 دسامبر 2025
