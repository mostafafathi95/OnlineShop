# 📁 مکمل Project Structure

## شجرہ

```
persian-ecommerce/
│
├── 📄 README.md                          # Main documentation
├── ⚡ QUICK_START.md                     # یہاں سے شروع کریں!
├── 🗂️ STRUCTURE.md                       # یہ فائل
│
├── 📊 Configuration Files
│   ├── Makefile                          # Commands
│   ├── DEPENDENCIES.md                   # تمام packages
│   ├── API_FLOW.md                       # API flow diagram
│   ├── ROUTES_MAP.md                     # تمام routes
│   ├── ARCHITECTURE_DIAGRAM.md           # معماری
│   ├── BLUEPRINT.md                      # Technical blueprint
│   └── HISTORY.md                        # تاریخچہ
│
├── 📚 docs/ (41 comprehensive guides)
│   ├── 01_ARCHITECTURE.md
│   ├── 02_DATABASE.md
│   ├── 03_FRONTEND_GUIDE.md
│   ├── ... (38+ مزید guides)
│   └── README.md
│
├── server/ (Backend - Express)
│   ├── index.ts                          # Server entry
│   ├── routes.ts                         # 129+ API endpoints
│   ├── storage.ts                        # Database operations
│   ├── vite.ts                           # Vite config
│   ├── utils/
│   │   ├── logger.ts                     # Logging system
│   │   ├── advanced-auth.ts              # Auth helpers
│   │   └── README.md                     # Documentation
│   ├── logs/                             # Log files
│   └── README.md
│
├── client/ (Frontend - React)
│   ├── src/
│   │   ├── main.tsx                      # Entry point
│   │   ├── App.tsx                       # Root component
│   │   ├── index.css                     # Global styles
│   │   │
│   │   ├── pages/ (27+ pages)
│   │   │   ├── Landing.tsx
│   │   │   ├── Products.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Products.tsx
│   │   │   │   └── ... (13+ pages)
│   │   │   ├── account/
│   │   │   │   ├── Profile.tsx
│   │   │   │   ├── Orders.tsx
│   │   │   │   └── ... (6+ pages)
│   │   │   ├── auth/
│   │   │   └── README.md
│   │   │
│   │   ├── components/ (78+ components)
│   │   │   ├── ui/ (25+ Shadcn)
│   │   │   ├── layout/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── forms/
│   │   │   ├── common/
│   │   │   ├── checkout/
│   │   │   ├── discovery/
│   │   │   ├── search/
│   │   │   ├── landing/
│   │   │   └── README.md
│   │   │
│   │   ├── hooks/ (8+ custom hooks)
│   │   │   ├── use-auth.ts
│   │   │   ├── use-cart.ts
│   │   │   └── README.md
│   │   │
│   │   ├── lib/
│   │   │   ├── queryClient.ts           # React Query setup
│   │   │   ├── api.ts                   # API client
│   │   │   ├── utils.ts                 # Helpers
│   │   │   ├── constants.ts             # Constants
│   │   │   └── README.md
│   │   │
│   │   ├── stores/ (Zustand)
│   │   │   ├── cartStore.ts
│   │   │   ├── authStore.ts
│   │   │   └── README.md
│   │   │
│   │   └── README.md
│   │
│   └── README.md
│
├── shared/ (Shared types & schema)
│   ├── schema.ts                         # 29 tables + Zod schemas
│   └── README.md
│
└── package.json                          # Dependencies
```

---

## 📊 اعدادوشمار

```
Files:          100+
Lines of Code:  20,000+
Components:     78+
Pages:          27+
API Routes:     129+
Database Tables: 29
Custom Hooks:   8+
Documentation:  85+ files
```

---

## 🎯 اہم Directories

| Directory | مقصد | Files |
|-----------|--------|-------|
| `docs/` | تمام documentation | 41 |
| `server/` | Backend API | 3 + utils |
| `client/src/pages/` | صفحات | 27+ |
| `client/src/components/` | اجزاء | 78+ |
| `shared/` | Schema + types | 1 |

---

**محدثه:** 1 دسامبر 2025
