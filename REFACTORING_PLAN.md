# 📋 ROUTES.TS REFACTORING PLAN - COMPLETE BREAKDOWN

**File to Refactor:** `server/routes.ts`  
**Current Size:** 2,264 lines  
**Target:** Split into 15+ modular files with Single Responsibility Principle  
**Status:** Planning Phase ✅ | Ready to Execute 🚀

---

## 📊 ANALYSIS SUMMARY

### Current Structure (20 Sections)
```
Total Routes: 150+ endpoints
Total Lines: 2,264
Current Sections:
  1. Public Routes (Categories, Products)
  2. Auth Routes (Login, Register, Logout)
  3. Address Routes (CRUD)
  4. Orders Routes (CRUD)
  5. Admin Routes (Dashboard, Products, Categories)
  6. Reviews Routes (CRUD + Admin)
  7. Wishlist Routes (CRUD)
  8. Coupon Routes (CRUD)
  9. Payment Routes
  10. Comparison Routes
  11. Related Products
  12. Seed Data
  13. Articles Routes (CRUD)
  14. News Routes (CRUD)
  15. Pages Routes (CRUD)
  16. Brands Routes (CRUD)
  17. Product Attributes Routes (CRUD)
  18. Shipping Methods Routes (CRUD)
  19. Credit Points Routes (CRUD)
  20. User Wallets Routes (CRUD)
  21. User Requests Routes (CRUD)
  22. Settings Routes (CRUD)
  23. Questions Routes (CRUD)
  24. Answers Routes (CRUD)
  25. Sliders Routes (CRUD + Admin)
  26. Banners Routes (CRUD + Admin)
  27. Search Routes
  28. Misc Routes (Cart, Checkout, etc.)
```

---

## 🎯 REFACTORING STRATEGY

### Phase 1: Shared Utilities
**File:** `server/routes/middleware.ts`
- `requireAuth` middleware
- `requireAdmin` middleware
- Error handling utilities
- Response formatting

**File:** `server/routes/utils.ts`
- `generateOrderNumber()` function
- Validation helpers
- Common transformations

### Phase 2: Core Features (Public)
**File:** `server/routes/public/products.ts`
- GET /api/products
- GET /api/products/:slug
- Product related endpoints

**File:** `server/routes/public/categories.ts`
- GET /api/categories
- Category related endpoints

### Phase 3: Authentication
**File:** `server/routes/auth.ts`
- POST /api/login
- POST /api/register
- POST /api/logout
- GET /api/auth/user
- PATCH /api/auth/user

### Phase 4: User Features
**File:** `server/routes/user/addresses.ts`
- GET /api/addresses
- POST /api/addresses
- PATCH /api/addresses/:id
- DELETE /api/addresses/:id

**File:** `server/routes/user/orders.ts`
- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PATCH /api/orders/:id/cancel

**File:** `server/routes/user/reviews.ts`
- GET /api/reviews/product/:productId
- POST /api/reviews
- GET /api/user/reviews
- PATCH /api/reviews/:id
- DELETE /api/reviews/:id

**File:** `server/routes/user/wishlist.ts`
- GET /api/wishlist
- POST /api/wishlist
- DELETE /api/wishlist/:productId

**File:** `server/routes/user/wallet.ts`
- GET /api/wallet
- POST /api/wallet/add
- GET /api/wallet/history

**File:** `server/routes/user/cart.ts`
- GET /api/cart
- POST /api/cart
- PATCH /api/cart/:id
- DELETE /api/cart/:id
- POST /api/checkout

### Phase 5: Admin Management
**File:** `server/routes/admin/dashboard.ts`
- GET /api/admin/dashboard
- GET /api/admin/stats

**File:** `server/routes/admin/products.ts`
- GET /api/admin/products
- POST /api/admin/products
- PATCH /api/admin/products/:id
- DELETE /api/admin/products/:id

**File:** `server/routes/admin/categories.ts`
- GET /api/admin/categories
- POST /api/admin/categories
- PATCH /api/admin/categories/:id
- DELETE /api/admin/categories/:id

**File:** `server/routes/admin/orders.ts`
- GET /api/admin/orders
- PATCH /api/admin/orders/:id/status

**File:** `server/routes/admin/users.ts`
- GET /api/admin/users

**File:** `server/routes/admin/coupons.ts`
- GET /api/admin/coupons
- POST /api/admin/coupons
- PATCH /api/admin/coupons/:id
- DELETE /api/admin/coupons/:id

**File:** `server/routes/admin/reviews.ts`
- GET /api/admin/reviews
- PATCH /api/admin/reviews/:id/approve
- DELETE /api/admin/reviews/:id

### Phase 6: Content Management
**File:** `server/routes/content/articles.ts`
- GET /api/articles
- GET /api/articles/:id
- POST /api/articles
- PATCH /api/articles/:id
- DELETE /api/articles/:id

**File:** `server/routes/content/news.ts`
- GET /api/news
- GET /api/news/:id
- POST /api/news
- PATCH /api/news/:id
- DELETE /api/news/:id

**File:** `server/routes/content/pages.ts`
- GET /api/pages
- GET /api/pages/:id
- POST /api/pages
- PATCH /api/pages/:id
- DELETE /api/pages/:id

### Phase 7: Catalog Management
**File:** `server/routes/catalog/brands.ts`
- GET /api/brands
- POST /api/brands
- PATCH /api/brands/:id
- DELETE /api/brands/:id

**File:** `server/routes/catalog/attributes.ts`
- GET /api/product-attributes
- POST /api/product-attributes
- PATCH /api/product-attributes/:id
- DELETE /api/product-attributes/:id

**File:** `server/routes/catalog/shipping.ts`
- GET /api/shipping-methods
- POST /api/shipping-methods
- PATCH /api/shipping-methods/:id
- DELETE /api/shipping-methods/:id

### Phase 8: Features
**File:** `server/routes/features/questions.ts`
- GET /api/questions
- GET /api/questions/:id
- POST /api/questions
- PATCH /api/questions/:id
- DELETE /api/questions/:id

**File:** `server/routes/features/answers.ts`
- GET /api/answers
- POST /api/answers
- PATCH /api/answers/:id
- DELETE /api/answers/:id

**File:** `server/routes/features/sliders.ts`
- GET /api/sliders
- POST /api/sliders
- PATCH /api/sliders/:id
- DELETE /api/sliders/:id

**File:** `server/routes/features/banners.ts`
- GET /api/banners
- POST /api/banners
- PATCH /api/banners/:id
- DELETE /api/banners/:id

**File:** `server/routes/features/comparisons.ts`
- GET /api/compare
- POST /api/compare
- DELETE /api/compare/:id

**File:** `server/routes/features/credit-points.ts`
- GET /api/credit-points
- POST /api/credit-points

### Phase 9: Utilities
**File:** `server/routes/payment.ts`
- GET /api/payment/initiate
- GET /api/payment/callback

**File:** `server/routes/search.ts`
- GET /api/search
- GET /api/search/advanced

**File:** `server/routes/upload.ts`
- POST /api/upload/image
- DELETE /api/upload/:id

**File:** `server/routes/settings.ts`
- GET /api/settings
- POST /api/settings
- PATCH /api/settings/:key

**File:** `server/routes/requests.ts`
- GET /api/requests
- POST /api/requests
- PATCH /api/requests/:id
- DELETE /api/requests/:id

---

## 📂 NEW FILE STRUCTURE

```
server/
├── routes.ts (Main router registration - 50-100 lines)
├── routes/
│   ├── index.ts (Export all routes)
│   ├── middleware.ts
│   ├── utils.ts
│   ├── auth.ts
│   ├── payment.ts
│   ├── search.ts
│   ├── upload.ts
│   ├── settings.ts
│   ├── requests.ts
│   ├── public/
│   │   ├── products.ts
│   │   └── categories.ts
│   ├── user/
│   │   ├── addresses.ts
│   │   ├── orders.ts
│   │   ├── reviews.ts
│   │   ├── wishlist.ts
│   │   ├── wallet.ts
│   │   └── cart.ts
│   ├── admin/
│   │   ├── dashboard.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── orders.ts
│   │   ├── users.ts
│   │   ├── coupons.ts
│   │   └── reviews.ts
│   ├── content/
│   │   ├── articles.ts
│   │   ├── news.ts
│   │   └── pages.ts
│   ├── catalog/
│   │   ├── brands.ts
│   │   ├── attributes.ts
│   │   └── shipping.ts
│   └── features/
│       ├── questions.ts
│       ├── answers.ts
│       ├── sliders.ts
│       ├── banners.ts
│       ├── comparisons.ts
│       └── credit-points.ts
```

---

## 🎯 DETAILED TASK BREAKDOWN

### TASK 1: Create Middleware & Utils
**Sub-tasks:**
1. Extract `requireAuth` to `middleware.ts`
2. Extract `requireAdmin` to `middleware.ts`
3. Extract `generateOrderNumber` to `utils.ts`
4. Create common error handlers
5. Create response formatters

**Dependencies:** None

### TASK 2: Create Route Registration System
**Sub-tasks:**
1. Create `routes/index.ts` that exports all route functions
2. Update main `routes.ts` to call all route registration functions
3. Ensure all imports are correct
4. Test that all routes still work

**Dependencies:** Task 1

### TASK 3: Extract Public Routes
**Sub-tasks:**
1. Create `routes/public/products.ts`
   - Move GET /api/products
   - Move GET /api/products/:slug
   - Import storage, schemas, middleware
2. Create `routes/public/categories.ts`
   - Move GET /api/categories
   - Import storage

**Dependencies:** Task 2

### TASK 4: Extract Auth Routes
**Sub-tasks:**
1. Create `routes/auth.ts`
   - Move POST /api/login
   - Move POST /api/register
   - Move POST /api/logout (both instances)
   - Move GET /api/auth/user
   - Move PATCH /api/auth/user
   - Import required schemas and middleware

**Dependencies:** Task 1, Task 2

### TASK 5: Extract User Routes
**Sub-tasks:**
1. Create `routes/user/addresses.ts`
   - Move all address CRUD endpoints
2. Create `routes/user/orders.ts`
   - Move all order endpoints
   - Keep order creation logic intact
3. Create `routes/user/reviews.ts`
   - Move all review endpoints
4. Create `routes/user/wishlist.ts`
   - Move all wishlist endpoints
5. Create `routes/user/wallet.ts`
   - Move wallet endpoints
6. Create `routes/user/cart.ts`
   - Move cart endpoints

**Dependencies:** Task 1, Task 2

### TASK 6: Extract Admin Routes
**Sub-tasks:**
1. Create `routes/admin/dashboard.ts`
2. Create `routes/admin/products.ts`
3. Create `routes/admin/categories.ts`
4. Create `routes/admin/orders.ts`
5. Create `routes/admin/users.ts`
6. Create `routes/admin/coupons.ts`
7. Create `routes/admin/reviews.ts`

**All require:** Task 1, Task 2

### TASK 7: Extract Content Routes
**Sub-tasks:**
1. Create `routes/content/articles.ts`
2. Create `routes/content/news.ts`
3. Create `routes/content/pages.ts`

**All require:** Task 1, Task 2

### TASK 8: Extract Catalog Routes
**Sub-tasks:**
1. Create `routes/catalog/brands.ts`
2. Create `routes/catalog/attributes.ts`
3. Create `routes/catalog/shipping.ts`

**All require:** Task 1, Task 2

### TASK 9: Extract Features Routes
**Sub-tasks:**
1. Create `routes/features/questions.ts`
2. Create `routes/features/answers.ts`
3. Create `routes/features/sliders.ts`
4. Create `routes/features/banners.ts`
5. Create `routes/features/comparisons.ts`
6. Create `routes/features/credit-points.ts`

**All require:** Task 1, Task 2

### TASK 10: Extract Utility Routes
**Sub-tasks:**
1. Create `routes/payment.ts`
2. Create `routes/search.ts`
3. Create `routes/upload.ts`
4. Create `routes/settings.ts`
5. Create `routes/requests.ts`

**All require:** Task 1, Task 2

### TASK 11: Update Main Routes File
**Sub-tasks:**
1. Replace entire content of `routes.ts` with new structure
2. Import all route registration functions
3. Call each function in registerRoutes()
4. Keep only middleware exports

**Dependencies:** All Tasks 1-10

### TASK 12: Testing & Verification
**Sub-tasks:**
1. Build project: `npm run build`
2. Verify no import errors
3. Restart workflow
4. Test all endpoints return correct responses
5. Check browser console for errors

**Dependencies:** Task 11

### TASK 13: Update replit.md
**Sub-tasks:**
1. Document new routes structure
2. Update project status
3. Add notes about refactoring
4. Update file list

**Dependencies:** Task 12

---

## 📋 EXECUTION ORDER

```
Phase 1: Prepare
  └─ TASK 1: Create Middleware & Utils

Phase 2: Setup
  └─ TASK 2: Create Route Registration System

Phase 3: Parallel Extract (Can run in parallel)
  ├─ TASK 3: Extract Public Routes
  ├─ TASK 4: Extract Auth Routes
  ├─ TASK 5: Extract User Routes (6 files parallel)
  ├─ TASK 6: Extract Admin Routes (7 files parallel)
  ├─ TASK 7: Extract Content Routes (3 files parallel)
  ├─ TASK 8: Extract Catalog Routes (3 files parallel)
  ├─ TASK 9: Extract Features Routes (6 files parallel)
  └─ TASK 10: Extract Utility Routes (5 files parallel)

Phase 4: Integration
  └─ TASK 11: Update Main Routes File

Phase 5: Verification
  └─ TASK 12: Testing & Verification

Phase 6: Documentation
  └─ TASK 13: Update replit.md
```

---

## ⚙️ TECHNICAL DETAILS

### Import Pattern for Each File
```typescript
import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth, requireAdmin } from "./middleware";
import { insertXSchema } from "@shared/schema";
```

### Export Pattern for Each File
```typescript
export async function registerXRoutes(app: Express): Promise<void> {
  // Route definitions here
}
```

### Main Routes File Pattern
```typescript
export async function registerRoutes(httpServer, app) {
  await registerPublicProductRoutes(app);
  await registerAuthRoutes(app);
  await registerUserRoutes(app);
  // ... etc
}
```

---

## ✅ SUCCESS CRITERIA

- [x] Plan created
- [ ] All routes split into logical modules
- [ ] Each file has single responsibility
- [ ] All imports working correctly
- [ ] No duplicate routes
- [ ] Build completes with zero errors
- [ ] All 150+ endpoints still functional
- [ ] Test all endpoints return correct status codes
- [ ] Documentation updated

---

## 📈 ESTIMATED EFFORT

- **Total Lines to Process:** 2,264 lines
- **Average Lines per File:** 80-150 lines
- **Number of Files Created:** 35+ files
- **Estimated Time:** 2-3 hours (3 turns recommended)
- **Parallel Tasks:** Yes (Many files can be created simultaneously)

---

**Next Step:** Execute TASK 1: Create Middleware & Utils Files
