# 🔥 Schema.ts Refactoring Plan (661 خط)

**تاریخ:** 1 دسامبر 2025 | **وضعیت:** Planning & Execution

---

## 📊 تقسیم Schema به 10 فایل

### Target Structure:
```
shared/schema/
├── auth.ts                  (users, sessions, enums - auth related)
├── products.ts              (products, categories, productImages)
├── orders.ts                (orders, orderItems, addresses, cartItems)
├── content.ts               (articles, news, pages)
├── commerce.ts              (coupons, wishlist, reviews, productComparison)
├── catalog.ts               (brands, productAttributes, shippingMethods)
├── admin.ts                 (questions, answers, sliders, banners, landingPageSections)
├── wallet.ts                (creditPoints, userWallets, userRequests)
├── analytics.ts             (searchAnalytics)
├── relations.ts             (تمام relations)
└── index.ts                 (export همه)
```

### توزیع Tables:

**auth.ts** (6 exports):
- sessions table
- users table
- userRoleEnum, orderStatusEnum, questionStatusEnum, userRequestStatusEnum

**products.ts** (3 exports):
- categories table
- products table
- productImages table

**orders.ts** (4 exports):
- addresses table
- cartItems table
- orders table
- orderItems table

**content.ts** (3 exports):
- articles table
- news table
- pages table

**commerce.ts** (4 exports):
- coupons table
- wishlist table
- reviews table
- productComparisons table

**catalog.ts** (3 exports):
- brands table
- productAttributes table
- shippingMethods table

**admin.ts** (5 exports):
- questions table
- answers table
- sliders table
- banners table
- landingPageSections table

**wallet.ts** (3 exports):
- creditPoints table
- userWallets table
- userRequests table

**analytics.ts** (1 export):
- searchAnalytics table

**relations.ts** (8 exports):
- تمام relations

**index.ts** (100+ exports):
- export * from all

---

## ✅ Tasks

**Task 1:** Create shared/schema/ directory
**Task 2:** Split auth.ts from schema.ts
**Task 3:** Split products.ts from schema.ts
**Task 4:** Split orders.ts from schema.ts
**Task 5:** Split content.ts from schema.ts
**Task 6:** Split commerce.ts from schema.ts
**Task 7:** Split catalog.ts from schema.ts
**Task 8:** Split admin.ts from schema.ts
**Task 9:** Split wallet.ts from schema.ts
**Task 10:** Split analytics.ts from schema.ts
**Task 11:** Create relations.ts with all relations
**Task 12:** Create index.ts with all exports
**Task 13:** Update all imports across codebase
**Task 14:** Delete old schema.ts

---

**Implementation Startting NOW...**
