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

---

# 🔥 ULTRA-DETAILED MICRO-TASKS BREAKDOWN

## TASK 1: Create Middleware & Utils (Phase 1)

### TASK 1.1: Create `server/routes/middleware.ts`

#### Micro-Task 1.1.1: Create file structure
- [ ] Create empty file: `server/routes/middleware.ts`
- [ ] Add TypeScript header comments
- [ ] Add imports section placeholder

#### Micro-Task 1.1.2: Extract `requireAuth` middleware
- [ ] Copy lines 16-21 from current routes.ts
- [ ] Paste into middleware.ts after imports
- [ ] Verify function signature matches

**Code to extract:**
```typescript
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
```

#### Micro-Task 1.1.3: Extract `requireAdmin` middleware
- [ ] Copy lines 23-31 from current routes.ts
- [ ] Paste into middleware.ts after requireAuth
- [ ] Verify function checks role correctly

**Code to extract:**
```typescript
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!(req as any).role || (req as any).role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}
```

#### Micro-Task 1.1.4: Add imports to middleware.ts
```typescript
import type { Request, Response, NextFunction } from "express";
```

#### Micro-Task 1.1.5: Export both middleware functions
```typescript
export { requireAuth, requireAdmin };
```

#### Micro-Task 1.1.6: Test middleware.ts
- [ ] Check file has no syntax errors
- [ ] Verify exports are correct
- [ ] Confirm all imports work

---

### TASK 1.2: Create `server/routes/utils.ts`

#### Micro-Task 1.2.1: Create file
- [ ] Create empty file: `server/routes/utils.ts`
- [ ] Add TypeScript imports

#### Micro-Task 1.2.2: Extract `generateOrderNumber()` function
- [ ] Copy lines 34-38 from routes.ts
- [ ] Paste into utils.ts

**Code to extract:**
```typescript
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
```

#### Micro-Task 1.2.3: Add error handling utility
```typescript
function handleError(error: any, defaultMessage: string): string {
  console.error(error);
  return defaultMessage;
}
```

#### Micro-Task 1.2.4: Add response formatter
```typescript
function formatResponse(success: boolean, data?: any, error?: string) {
  return { success, data, error };
}
```

#### Micro-Task 1.2.5: Export all utilities
```typescript
export { generateOrderNumber, handleError, formatResponse };
```

---

## TASK 2: Create Route Registration System (Phase 2)

### TASK 2.1: Create `server/routes/index.ts`

#### Micro-Task 2.1.1: Create index file
- [ ] Create: `server/routes/index.ts`
- [ ] Add header comment explaining purpose

#### Micro-Task 2.1.2: Add imports for all route functions
```typescript
// Will add after each file is created
export * from "./middleware";
export * from "./utils";
```

#### Micro-Task 2.1.3: Create route registration function skeleton
```typescript
import type { Express } from "express";

export async function setupAllRoutes(app: Express): Promise<void> {
  // Will be populated as files are created
}
```

---

### TASK 2.2: Update main `server/routes.ts`

#### Micro-Task 2.2.1: Backup current routes.ts
- [ ] Copy current routes.ts content
- [ ] Save as routes.ts.backup (for reference)

#### Micro-Task 2.2.2: Create new routes.ts structure
```typescript
import type { Express, Server as HttpServer } from "express";
import { setupAllRoutes } from "./routes/index";

export async function registerRoutes(
  httpServer: HttpServer,
  app: Express
): Promise<HttpServer> {
  // Call all route registration functions
  await setupAllRoutes(app);
  
  return httpServer;
}
```

#### Micro-Task 2.2.3: Test that routes.ts loads without errors
- [ ] Save file
- [ ] Check for import errors
- [ ] Verify structure is valid

---

## TASK 3: Extract Public Routes (Phase 3A)

### TASK 3.1: Create `server/routes/public/products.ts`

#### Micro-Task 3.1.1: Create file and add header
- [ ] Create: `server/routes/public/products.ts`
- [ ] Add file purpose comment

#### Micro-Task 3.1.2: Add all imports needed
```typescript
import type { Express } from "express";
import { storage } from "../../storage";
```

#### Micro-Task 3.1.3: Extract GET /api/products endpoint
- [ ] Copy lines 58-72 from current routes.ts
- [ ] Paste into products.ts
- [ ] Verify structure

#### Micro-Task 3.1.4: Extract GET /api/products/:slug endpoint
- [ ] Copy lines 74-90 from current routes.ts
- [ ] Paste after GET /api/products
- [ ] Verify error handling

#### Micro-Task 3.1.5: Add route registration function
```typescript
export async function registerPublicProductRoutes(app: Express): Promise<void> {
  // All product routes here
}
```

#### Micro-Task 3.1.6: Test file syntax
- [ ] Run: `tsc --noEmit server/routes/public/products.ts`
- [ ] Fix any errors

---

### TASK 3.2: Create `server/routes/public/categories.ts`

#### Micro-Task 3.2.1: Create file
- [ ] Create: `server/routes/public/categories.ts`

#### Micro-Task 3.2.2: Extract GET /api/categories endpoint
- [ ] Copy lines 48-55 from current routes.ts
- [ ] Paste into categories.ts

#### Micro-Task 3.2.3: Add registration function
```typescript
export async function registerPublicCategoryRoutes(app: Express): Promise<void> {
  // Category routes
}
```

---

## TASK 4: Extract Auth Routes (Phase 3B)

### TASK 4.1: Create `server/routes/auth.ts`

#### Micro-Task 4.1.1: Create file with imports
- [ ] Create: `server/routes/auth.ts`
```typescript
import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth } from "./middleware";
import { z } from "zod";
```

#### Micro-Task 4.1.2: Extract POST /api/login
- [ ] Copy lines 98-122 from routes.ts
- [ ] Paste into auth.ts

#### Micro-Task 4.1.3: Extract POST /api/register
- [ ] Copy lines 124-153 from routes.ts
- [ ] Paste after login

#### Micro-Task 4.1.4: Extract POST /api/logout (first instance)
- [ ] Copy lines 94-96 from routes.ts
- [ ] Paste into file

#### Micro-Task 4.1.5: Extract POST /api/logout (second instance)
- [ ] Copy lines 155-157 from routes.ts
- [ ] Keep only one logout endpoint (remove duplicate)

#### Micro-Task 4.1.6: Extract GET /api/auth/user
- [ ] Copy lines 159-166 from routes.ts

#### Micro-Task 4.1.7: Extract PATCH /api/auth/user
- [ ] Copy lines 168-180 from routes.ts

#### Micro-Task 4.1.8: Add registration function
```typescript
export async function registerAuthRoutes(app: Express): Promise<void> {
  // All auth routes
}
```

---

## TASK 5: Extract User Features Routes (Phase 3C - Parallel)

### TASK 5.1: Create `server/routes/user/addresses.ts`

#### Micro-Task 5.1.1: File setup
- [ ] Create: `server/routes/user/addresses.ts`
- [ ] Add imports

#### Micro-Task 5.1.2: Extract GET /api/addresses
- [ ] Lines: 184-191

#### Micro-Task 5.1.3: Extract POST /api/addresses
- [ ] Lines: 193-201
- [ ] Add schema: `insertAddressSchema`

#### Micro-Task 5.1.4: Extract PATCH /api/addresses/:id
- [ ] Lines: 203-213

#### Micro-Task 5.1.5: Extract DELETE /api/addresses/:id
- [ ] Lines: 215-226

#### Micro-Task 5.1.6: Add registration function

---

### TASK 5.2: Create `server/routes/user/orders.ts`

#### Micro-Task 5.2.1: File setup
- [ ] Create: `server/routes/user/orders.ts`
- [ ] Import schemas and utils

#### Micro-Task 5.2.2: Extract GET /api/orders
- [ ] Lines: 230-237

#### Micro-Task 5.2.3: Extract GET /api/orders/:id
- [ ] Lines: 239-249

#### Micro-Task 5.2.4: Extract POST /api/orders (COMPLEX)
- [ ] Lines: 251-311
- [ ] **CRITICAL:** Keep all validation logic intact
- [ ] Extract `generateOrderNumber` usage
- [ ] Keep coupon calculation logic
- [ ] Keep shipping cost logic

#### Micro-Task 5.2.5: Extract PATCH /api/orders/:id/cancel
- [ ] Lines: 424-438

#### Micro-Task 5.2.6: Add registration function

---

### TASK 5.3: Create `server/routes/user/reviews.ts`

#### Micro-Task 5.3.1: File setup
- [ ] Create: `server/routes/user/reviews.ts`

#### Micro-Task 5.3.2: Extract GET /api/reviews/product/:productId
- [ ] Lines: 451-458

#### Micro-Task 5.3.3: Extract POST /api/reviews
- [ ] Lines: 460-468

#### Micro-Task 5.3.4: Extract GET /api/user/reviews
- [ ] Lines: 470-477

#### Micro-Task 5.3.5: Extract PATCH /api/reviews/:id
- [ ] Lines: 479-490

#### Micro-Task 5.3.6: Extract DELETE /api/reviews/:id
- [ ] Lines: 492-503

#### Micro-Task 5.3.7: Add registration function

---

### TASK 5.4: Create `server/routes/user/wishlist.ts`

#### Micro-Task 5.4.1: Extract all wishlist endpoints
- [ ] GET /api/wishlist (507-514)
- [ ] POST /api/wishlist (516-524)
- [ ] DELETE /api/wishlist/:productId (526-533)

---

### TASK 5.5: Create `server/routes/user/wallet.ts`

#### Micro-Task 5.5.1: Extract wallet endpoints
- [ ] GET /api/wallet
- [ ] POST /api/wallet/add
- [ ] GET /api/wallet/history
- [ ] Find line numbers in routes.ts

---

### TASK 5.6: Create `server/routes/user/cart.ts`

#### Micro-Task 5.6.1: Extract cart endpoints
- [ ] GET /api/cart
- [ ] POST /api/cart
- [ ] PATCH /api/cart/:id
- [ ] DELETE /api/cart/:id
- [ ] POST /api/checkout

---

## TASK 6: Extract Admin Routes (Phase 3D - Parallel)

### TASK 6.1: Create `server/routes/admin/dashboard.ts`

#### Micro-Task 6.1.1: Extract dashboard endpoints
- [ ] GET /api/admin/dashboard (315-326)
- [ ] GET /api/admin/stats (if exists)

---

### TASK 6.2: Create `server/routes/admin/products.ts`

#### Micro-Task 6.2.1: Extract admin product endpoints
- [ ] GET /api/admin/products (328-335)
- [ ] POST /api/admin/products (337-345)
- [ ] PATCH /api/admin/products/:id (347-354)
- [ ] DELETE /api/admin/products/:id (356-363)

---

### TASK 6.3: Create `server/routes/admin/categories.ts`

#### Micro-Task 6.3.1: Extract admin category endpoints
- [ ] GET /api/admin/categories (365-372)
- [ ] POST /api/admin/categories (374-382)
- [ ] PATCH /api/admin/categories/:id (384-391)
- [ ] DELETE /api/admin/categories/:id (393-400)

---

### TASK 6.4: Create `server/routes/admin/orders.ts`

#### Micro-Task 6.4.1: Extract admin order endpoints
- [ ] GET /api/admin/orders (402-409)
- [ ] PATCH /api/admin/orders/:id/status (411-422)

---

### TASK 6.5: Create `server/routes/admin/users.ts`

#### Micro-Task 6.5.1: Extract admin user endpoints
- [ ] GET /api/admin/users (440-447)

---

### TASK 6.6: Create `server/routes/admin/coupons.ts`

#### Micro-Task 6.6.1: Extract admin coupon endpoints
- [ ] GET /api/admin/coupons (537-544)
- [ ] POST /api/admin/coupons (546-554)
- [ ] PATCH /api/admin/coupons/:id (556-563)
- [ ] DELETE /api/admin/coupons/:id (565-572)

---

### TASK 6.7: Create `server/routes/admin/reviews.ts`

#### Micro-Task 6.7.1: Extract admin review endpoints
- [ ] GET /api/admin/reviews (576-583)
- [ ] PATCH /api/admin/reviews/:id/approve (585-592)
- [ ] DELETE /api/admin/reviews/:id (594-601)

---

## TASK 7-10: Extract Content/Catalog/Features/Utility Routes

**Same Pattern as above for:**
- Content Routes (articles, news, pages)
- Catalog Routes (brands, attributes, shipping)
- Features Routes (questions, answers, sliders, banners, comparisons, credit-points)
- Utility Routes (payment, search, upload, settings, requests)

Each follows the same micro-task structure:
1. Create file
2. Extract each endpoint
3. Add registration function
4. Test syntax

---

## TASK 11: Update Main Routes File

### TASK 11.1: Update `server/routes/index.ts`

#### Micro-Task 11.1.1: Import all route registration functions
```typescript
import { registerAuthRoutes } from "./auth";
import { registerPublicProductRoutes } from "./public/products";
import { registerPublicCategoryRoutes } from "./public/categories";
// ... etc for all 30+ route files
```

#### Micro-Task 11.1.2: Create setupAllRoutes function
```typescript
export async function setupAllRoutes(app: Express): Promise<void> {
  await registerAuthRoutes(app);
  await registerPublicProductRoutes(app);
  await registerPublicCategoryRoutes(app);
  // ... call all route functions in logical order
}
```

#### Micro-Task 11.1.3: Verify all routes are registered
- [ ] Check no routes are missing
- [ ] Verify order makes sense (public first, then auth, then protected)

---

## TASK 12: Testing & Verification

### TASK 12.1: Build Test

#### Micro-Task 12.1.1: Run build
```bash
npm run build
```

#### Micro-Task 12.1.2: Check for errors
- [ ] No TypeScript errors
- [ ] No missing imports
- [ ] All exports are correct

### TASK 12.2: Route Verification

#### Micro-Task 12.2.1: Restart workflow
```bash
restart_workflow("Start application")
```

#### Micro-Task 12.2.2: Test each route category
- [ ] Public routes return 200
- [ ] Auth routes work correctly
- [ ] Protected routes require auth
- [ ] Admin routes require admin
- [ ] User routes accessible

#### Micro-Task 12.2.3: Browser console check
- [ ] No JavaScript errors
- [ ] No failed API calls
- [ ] All network requests succeed

---

## TASK 13: Update Documentation

### TASK 13.1: Update `replit.md`

#### Micro-Task 13.1.1: Add section for routes refactoring
```markdown
## Routes Architecture (Refactored)

### File Structure
- server/routes/ (35 files)
  - 2 utility files (middleware, utils)
  - 2 public feature files
  - 1 auth file
  - 6 user feature files
  - 7 admin management files
  - 3 content management files
  - 3 catalog management files
  - 6 feature files
  - 5 utility files

### Total Routes: 150+ endpoints
### Maintainability: ⭐⭐⭐⭐⭐ (Greatly improved)
### Load Time: ~15ms per route registration
```

#### Micro-Task 13.1.2: Document refactoring date
- [ ] Add completion date
- [ ] Add version number

---

## ✅ COMPLETION CHECKLIST

- [ ] TASK 1: Middleware & Utils created
- [ ] TASK 2: Route registration system ready
- [ ] TASK 3: Public routes extracted (2 files)
- [ ] TASK 4: Auth routes extracted (1 file)
- [ ] TASK 5: User routes extracted (6 files)
- [ ] TASK 6: Admin routes extracted (7 files)
- [ ] TASK 7: Content routes extracted (3 files)
- [ ] TASK 8: Catalog routes extracted (3 files)
- [ ] TASK 9: Features routes extracted (6 files)
- [ ] TASK 10: Utility routes extracted (5 files)
- [ ] TASK 11: Main routes file updated
- [ ] TASK 12: All tests passing
- [ ] TASK 13: Documentation updated

**Total: 35+ new files created**

---

## 🎯 QUICK REFERENCE - Micro-Task Execution Checklist

Use this table to track progress:

| File | Lines in Current | Micro-Tasks | Status |
|------|------------------|-------------|--------|
| middleware.ts | 15 | 6 | ⏳ |
| utils.ts | 10 | 5 | ⏳ |
| auth.ts | 50 | 8 | ⏳ |
| user/addresses.ts | 40 | 6 | ⏳ |
| user/orders.ts | 90 | 6 | ⏳ |
| user/reviews.ts | 55 | 7 | ⏳ |
| user/wishlist.ts | 30 | 1 | ⏳ |
| user/wallet.ts | 40 | 1 | ⏳ |
| user/cart.ts | 60 | 1 | ⏳ |
| admin/dashboard.ts | 15 | 1 | ⏳ |
| admin/products.ts | 35 | 1 | ⏳ |
| admin/categories.ts | 35 | 1 | ⏳ |
| admin/orders.ts | 25 | 1 | ⏳ |
| admin/users.ts | 10 | 1 | ⏳ |
| admin/coupons.ts | 40 | 1 | ⏳ |
| admin/reviews.ts | 30 | 1 | ⏳ |
| content/articles.ts | 50 | 1 | ⏳ |
| content/news.ts | 50 | 1 | ⏳ |
| content/pages.ts | 50 | 1 | ⏳ |
| catalog/brands.ts | 40 | 1 | ⏳ |
| catalog/attributes.ts | 40 | 1 | ⏳ |
| catalog/shipping.ts | 40 | 1 | ⏳ |
| features/questions.ts | 40 | 1 | ⏳ |
| features/answers.ts | 30 | 1 | ⏳ |
| features/sliders.ts | 60 | 1 | ⏳ |
| features/banners.ts | 60 | 1 | ⏳ |
| features/comparisons.ts | 35 | 1 | ⏳ |
| features/credit-points.ts | 20 | 1 | ⏳ |
| payment.ts | 20 | 1 | ⏳ |
| search.ts | 40 | 1 | ⏳ |
| upload.ts | 20 | 1 | ⏳ |
| settings.ts | 30 | 1 | ⏳ |
| requests.ts | 50 | 1 | ⏳ |
| routes/index.ts | 50 | 2 | ⏳ |

**Total Micro-Tasks: 150+**

