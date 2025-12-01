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


---

# 🚀 LEVEL 2: HYPER-DETAILED EXECUTION GUIDE

## 📌 MICRO-TASK EXECUTION FORMAT

Each micro-task follows this exact format:

```
### Micro-Task X.X.X: [Description]

**Status:** ⏳ Pending

**Prerequisites:**
- Dependency A
- Dependency B

**Files Affected:**
- server/routes/[file].ts

**Line Numbers (from routes.ts):**
- Lines XXX-YYY: [Description]

**Code to Extract:**
[EXACT CODE BLOCK]

**File Structure After:**
```typescript
[COMPLETE FILE STRUCTURE]
```

**Required Imports:**
```typescript
[ALL IMPORTS NEEDED]
```

**Exports:**
```typescript
[EXPORT STATEMENTS]
```

**Testing Steps:**
1. Step 1
2. Step 2
3. Step 3

**Possible Errors & Fixes:**
- Error: "X is not defined"
  Fix: Add import: `import { X } from "..."`

**Verification Checklist:**
- [ ] File created
- [ ] Code extracted correctly
- [ ] Imports added
- [ ] Exports added
- [ ] No syntax errors
- [ ] Ready to move to next task
```

---

## 🎯 TASK 1: DETAILED MICRO-TASK EXPANSION

### Micro-Task 1.1.1: Create and Setup middleware.ts

**Status:** ⏳ Pending

**Command:**
```bash
touch server/routes/middleware.ts
```

**File Path:** `server/routes/middleware.ts`

**Initial Content Template:**
```typescript
/**
 * Authentication and Authorization Middleware
 * 
 * Contains all authentication-related middleware functions
 * Used across all protected routes in the application
 * 
 * Functions:
 * - requireAuth: Check if user is authenticated
 * - requireAdmin: Check if user is admin
 */

import type { Request, Response, NextFunction } from "express";

// Middleware functions go here
// Exports go here
```

**Checklist:**
- [ ] File created at correct path
- [ ] Header comments added
- [ ] Ready for function extraction

---

### Micro-Task 1.1.2: Extract requireAuth Middleware

**Lines in routes.ts:** 16-21

**Current Code in routes.ts:**
```typescript
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
```

**Action:** Copy exactly to middleware.ts after header comments

**Verification:**
- [ ] Function copied exactly
- [ ] No typos
- [ ] Indentation matches 2 spaces
- [ ] Closing brace on line 21

**Testing:**
```bash
# After adding, check:
# 1. No syntax errors in file
# 2. Can import the function
```

---

### Micro-Task 1.1.3: Extract requireAdmin Middleware

**Lines in routes.ts:** 23-31

**Current Code in routes.ts:**
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

**Action:** Add after requireAuth function

**Verification:**
- [ ] Both middleware functions present
- [ ] Order: requireAuth first, requireAdmin second
- [ ] Both have complete logic

---

### Micro-Task 1.1.4: Add Required Imports to middleware.ts

**Imports Needed:**
```typescript
import type { Request, Response, NextFunction } from "express";
```

**Where to Add:**
- Line 1-2 (after header comments, before functions)

**Verification:**
- [ ] Import statement at top
- [ ] Uses `type` keyword for type imports
- [ ] Correct module name: "express"

---

### Micro-Task 1.1.5: Add Exports to middleware.ts

**Export Code:**
```typescript
export { requireAuth, requireAdmin };
```

**Where to Add:**
- Line 33 (after all middleware functions)

**Alternative Export Style (More Explicit):**
```typescript
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // ... function body
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // ... function body
}
```

**Choice:** Use first style (shorter, cleaner)

**Verification:**
- [ ] Export statement present
- [ ] Both function names exported
- [ ] Correct syntax with curly braces

---

### Micro-Task 1.1.6: Final middleware.ts Structure Check

**Complete File Should Look Like:**
```typescript
/**
 * Authentication and Authorization Middleware
 * 
 * Contains all authentication-related middleware functions
 * Used across all protected routes in the application
 */

import type { Request, Response, NextFunction } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!(req as any).role || (req as any).role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

export { requireAuth, requireAdmin };
```

**Line Count:** ~25 lines

**Checklist:**
- [ ] Header comments present
- [ ] Import at top
- [ ] requireAuth function (lines ~12-17)
- [ ] requireAdmin function (lines ~19-26)
- [ ] Export statement (line ~28)

---

### Micro-Task 1.1.7: Test middleware.ts Syntax

**Command:**
```bash
npx tsc --noEmit server/routes/middleware.ts
```

**Expected Output:**
```
(no errors)
```

**If Errors Occur:**
- Check import paths
- Verify all braces are closed
- Check for typos in function names

**Alternative Test:**
```bash
npm run build
```

**Verification:**
- [ ] No TypeScript errors
- [ ] No compilation warnings
- [ ] File ready for import

---

## TASK 2: utils.ts DETAILED BREAKDOWN

### Micro-Task 2.1.1: Create and Setup utils.ts

**Status:** ⏳ Pending

**Command:**
```bash
touch server/routes/utils.ts
```

**Initial Template:**
```typescript
/**
 * Route Utilities and Helpers
 * 
 * Common functions used across multiple route files:
 * - generateOrderNumber: Create unique order IDs
 * - handleError: Standardized error handling
 * - formatResponse: Consistent response format
 */

// Utilities go here
// Exports go here
```

---

### Micro-Task 2.1.2: Extract generateOrderNumber Function

**Lines in routes.ts:** 34-38

**Current Code:**
```typescript
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
```

**Action:**
1. Copy entire function
2. Paste into utils.ts after header
3. Verify format matches

**Output Format Example:**
- "ORD-QWERTY-ABCD"
- Unique per request
- URL-safe characters

---

### Micro-Task 2.1.3: Create handleError Utility Function

**New Function to Add (not in current routes.ts):**
```typescript
function handleError(error: any, defaultMessage: string): string {
  console.error("[Route Error]", error);
  return defaultMessage;
}
```

**Purpose:**
- Standardize error logging
- Return safe error messages to client
- Prevent exposing sensitive info

**Usage Example:**
```typescript
} catch (error) {
  return res.status(500).json({ 
    error: handleError(error, "Failed to fetch products") 
  });
}
```

---

### Micro-Task 2.1.4: Create formatResponse Utility Function

**New Function to Add:**
```typescript
interface ResponseFormat {
  success?: boolean;
  data?: any;
  error?: string;
}

function formatResponse(
  success: boolean, 
  data?: any, 
  error?: string
): ResponseFormat {
  const response: ResponseFormat = { success };
  if (data) response.data = data;
  if (error) response.error = error;
  return response;
}
```

**Usage Example:**
```typescript
res.json(formatResponse(true, products));
// Returns: { success: true, data: [...] }
```

---

### Micro-Task 2.1.5: Add Imports to utils.ts

**Required Imports:**
```typescript
// No external imports needed for basic utils
// All functions use built-in JavaScript
```

**Note:** Future versions may add more imports

---

### Micro-Task 2.1.6: Add Exports to utils.ts

**Export Statement:**
```typescript
export { generateOrderNumber, handleError, formatResponse };
```

---

### Micro-Task 2.1.7: Complete utils.ts Structure

**Final File:**
```typescript
/**
 * Route Utilities and Helpers
 * 
 * Common functions used across multiple route files
 */

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

function handleError(error: any, defaultMessage: string): string {
  console.error("[Route Error]", error);
  return defaultMessage;
}

interface ResponseFormat {
  success?: boolean;
  data?: any;
  error?: string;
}

function formatResponse(
  success: boolean,
  data?: any,
  error?: string
): ResponseFormat {
  const response: ResponseFormat = { success };
  if (data) response.data = data;
  if (error) response.error = error;
  return response;
}

export { generateOrderNumber, handleError, formatResponse };
```

**Line Count:** ~40 lines

---

## TASK 3: PUBLIC ROUTES - ULTRA DETAILED

### Micro-Task 3.1.1: Create public/products.ts - Part 1

**Command:**
```bash
touch server/routes/public/products.ts
```

**Header Template:**
```typescript
/**
 * Public Product Routes
 * 
 * Endpoints:
 * - GET /api/products         - Get all products with filters
 * - GET /api/products/:slug   - Get single product by slug
 * 
 * No authentication required
 */

import type { Express } from "express";
import { storage } from "../../storage";
```

---

### Micro-Task 3.1.2: Extract GET /api/products Endpoint

**Lines in routes.ts:** 58-72

**Original Code:**
```typescript
app.get("/api/products", async (req, res) => {
  try {
    const { search, category, featured, sort, limit } = req.query;
    const products = await storage.getAllProducts({
      search: search as string,
      category: category as string,
      featured: featured === "true",
      sort: sort as string,
      limit: limit ? parseInt(limit as string) : undefined,
    });
    res.json(products.filter(p => p.isActive));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
```

**Code to Insert:**
```typescript
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category, featured, sort, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        category: category as string,
        featured: featured === "true",
        sort: sort as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
```

**Inside Function:**
This goes INSIDE `registerPublicProductRoutes()` function (to be created next)

---

### Micro-Task 3.1.3: Extract GET /api/products/:slug Endpoint

**Lines in routes.ts:** 74-90

**Code:**
```typescript
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const images = await storage.getProductImages(product.id);
      const category = product.categoryId 
        ? await storage.getCategoryById(product.categoryId) 
        : null;
      
      res.json({ ...product, images, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
```

---

### Micro-Task 3.1.4: Create Route Registration Function

**Complete Function:**
```typescript
export async function registerPublicProductRoutes(app: Express): Promise<void> {
  // GET /api/products - List all active products
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category, featured, sort, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        category: category as string,
        featured: featured === "true",
        sort: sort as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:slug - Get product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const images = await storage.getProductImages(product.id);
      const category = product.categoryId 
        ? await storage.getCategoryById(product.categoryId) 
        : null;
      
      res.json({ ...product, images, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
}
```

---

### Micro-Task 3.1.5: Complete public/products.ts File

**Full File Content:**
```typescript
/**
 * Public Product Routes
 * 
 * Endpoints:
 * - GET /api/products         - Get all products with filters
 * - GET /api/products/:slug   - Get single product by slug
 * 
 * No authentication required
 */

import type { Express } from "express";
import { storage } from "../../storage";

export async function registerPublicProductRoutes(app: Express): Promise<void> {
  // GET /api/products - List all active products
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category, featured, sort, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        category: category as string,
        featured: featured === "true",
        sort: sort as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:slug - Get product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const images = await storage.getProductImages(product.id);
      const category = product.categoryId 
        ? await storage.getCategoryById(product.categoryId) 
        : null;
      
      res.json({ ...product, images, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
}
```

**Verification:**
- [ ] File created
- [ ] All imports present
- [ ] Both endpoints included
- [ ] Export function present
- [ ] No syntax errors

---

### Micro-Task 3.2.1-5: Create public/categories.ts (Same Pattern)

**File: server/routes/public/categories.ts**

**Lines in routes.ts:** 48-55

**Complete File:**
```typescript
/**
 * Public Category Routes
 * 
 * Endpoints:
 * - GET /api/categories - Get all active categories
 * 
 * No authentication required
 */

import type { Express } from "express";
import { storage } from "../../storage";

export async function registerPublicCategoryRoutes(app: Express): Promise<void> {
  // GET /api/categories - List all active categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
}
```

---

## TASK 4: AUTH ROUTES - ULTRA DETAILED

### Micro-Task 4.1.1-8: Create server/routes/auth.ts

**File: server/routes/auth.ts**

**Complete Code:**
```typescript
/**
 * Authentication Routes
 * 
 * Endpoints:
 * - POST /api/login        - User login
 * - POST /api/register     - User registration
 * - POST /api/logout       - User logout
 * - GET /api/auth/user     - Get current user (protected)
 * - PATCH /api/auth/user   - Update user profile (protected)
 */

import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth } from "./middleware";

export async function registerAuthRoutes(app: Express): Promise<void> {
  // POST /api/logout - User logout
  app.post("/api/logout", async (req, res) => {
    res.json({ success: true });
  });

  // POST /api/login - User login with email and password
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "ایمیل و رمز عبور ضروری است" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "ایمیل یا رمز عبور اشتباه است" });
      }
      
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const sessionId = `session_${Date.now()}`;
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });

  // POST /api/register - User registration
  app.post("/api/register", async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ error: "تمام فیلدها ضروری هستند" });
      }
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "این ایمیل قبلاً ثبت شده است" });
      }
      
      const user = await storage.upsertUser({
        fullName,
        email,
        password,
        role: "customer"
      });
      
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });
  
  // GET /api/auth/user - Get current authenticated user
  app.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser((req as any).userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // PATCH /api/auth/user - Update user profile
  app.patch("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const user = await storage.updateUser((req as any).userId, {
        firstName,
        lastName,
        phone,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });
}
```

**Key Points:**
- Lines extracted from routes.ts: 98-180
- All auth functions in one file
- Uses requireAuth middleware for protected routes
- Duplicate logout removed (keeps one only)
- Register, Login, Logout, GetUser, UpdateUser

---

## 🎯 CONTINUATION: USER ROUTES PATTERN

### Micro-Task 5.1: Create server/routes/user/addresses.ts

**Pattern (Apply to all user/* files):**

```typescript
/**
 * User Address Routes
 * 
 * Endpoints (All require authentication):
 * - GET /api/addresses           - Get user addresses
 * - POST /api/addresses          - Create new address
 * - PATCH /api/addresses/:id     - Update address
 * - DELETE /api/addresses/:id    - Delete address
 */

import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";
import { insertAddressSchema } from "@shared/schema";

export async function registerUserAddressRoutes(app: Express): Promise<void> {
  // GET /api/addresses - Lines 184-191
  app.get("/api/addresses", requireAuth, async (req, res) => {
    try {
      const addresses = await storage.getUserAddresses((req as any).userId);
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  // POST /api/addresses - Lines 193-201
  app.post("/api/addresses", requireAuth, async (req, res) => {
    try {
      const validated = insertAddressSchema.parse(req.body);
      const address = await storage.createAddress((req as any).userId, validated);
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: "Invalid address data" });
    }
  });

  // PATCH /api/addresses/:id - Lines 203-213
  app.patch("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.updateAddress(parseInt(req.params.id), req.body);
      if (address.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: "Failed to update address" });
    }
  });

  // DELETE /api/addresses/:id - Lines 215-226
  app.delete("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.getAddress(parseInt(req.params.id));
      if (!address || address.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await storage.deleteAddress(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete address" });
    }
  });
}
```

---

## 📋 REMAINING FILES QUICK REFERENCE

**Apply same ultra-detailed pattern for:**

### USER ROUTES (5 more files):
1. **user/orders.ts** - Lines 230-311, 424-438
2. **user/reviews.ts** - Lines 451-503
3. **user/wishlist.ts** - Lines 507-533
4. **user/wallet.ts** - Lines [TBD in routes.ts]
5. **user/cart.ts** - Lines [TBD in routes.ts]

### ADMIN ROUTES (7 files):
1. **admin/dashboard.ts** - Lines 315-326
2. **admin/products.ts** - Lines 328-363
3. **admin/categories.ts** - Lines 365-400
4. **admin/orders.ts** - Lines 402-422
5. **admin/users.ts** - Lines 440-447
6. **admin/coupons.ts** - Lines 537-572
7. **admin/reviews.ts** - Lines 576-601

### CONTENT ROUTES (3 files):
1. **content/articles.ts** - Lines 883-930+
2. **content/news.ts** - Lines 932-979+
3. **content/pages.ts** - Lines 981-1028+

### CATALOG ROUTES (3 files):
1. **catalog/brands.ts** - Lines 1030-1067+
2. **catalog/attributes.ts** - Lines 1069-1106+
3. **catalog/shipping.ts** - Lines 1108-1145+

### FEATURES ROUTES (6 files):
1. **features/questions.ts** - Lines 1285-1323+
2. **features/answers.ts** - Lines 1325-1363+
3. **features/sliders.ts** - Lines 1365-1422+
4. **features/banners.ts** - Lines 1424-1481+
5. **features/comparisons.ts** - Lines 672-703
6. **features/credit-points.ts** - Lines 1147-1167+

### UTILITY ROUTES (5 files):
1. **payment.ts** - Lines 603-630
2. **search.ts** - Lines 1500-1544+
3. **upload.ts** - Lines 1483-1499
4. **settings.ts** - Lines 1255-1283+
5. **requests.ts** - Lines 1205-1253+

---

## ✅ GLOBAL EXECUTION CHECKLIST

### Phase 1: Foundation (Tasks 1-2)
- [ ] TASK 1.1.1: middleware.ts created
- [ ] TASK 1.1.2: requireAuth extracted
- [ ] TASK 1.1.3: requireAdmin extracted
- [ ] TASK 1.1.4-7: middleware.ts completed
- [ ] TASK 2.1.1-7: utils.ts completed

### Phase 2: Setup (Task 2)
- [ ] TASK 2.1.1: Create routes/index.ts
- [ ] TASK 2.1.2-3: Setup setupAllRoutes()
- [ ] TASK 2.2.1-3: Update main routes.ts

### Phase 3A: Public Routes (Task 3)
- [ ] TASK 3.1.1-5: public/products.ts
- [ ] TASK 3.2.1-5: public/categories.ts

### Phase 3B: Auth Routes (Task 4)
- [ ] TASK 4.1.1-8: auth.ts

### Phase 3C: User Routes (Task 5)
- [ ] TASK 5.1: user/addresses.ts
- [ ] TASK 5.2: user/orders.ts
- [ ] TASK 5.3: user/reviews.ts
- [ ] TASK 5.4: user/wishlist.ts
- [ ] TASK 5.5: user/wallet.ts
- [ ] TASK 5.6: user/cart.ts

### Phase 3D: Admin Routes (Task 6)
- [ ] TASK 6.1: admin/dashboard.ts
- [ ] TASK 6.2: admin/products.ts
- [ ] TASK 6.3: admin/categories.ts
- [ ] TASK 6.4: admin/orders.ts
- [ ] TASK 6.5: admin/users.ts
- [ ] TASK 6.6: admin/coupons.ts
- [ ] TASK 6.7: admin/reviews.ts

### Phase 3E: Content Routes (Task 7)
- [ ] TASK 7.1: content/articles.ts
- [ ] TASK 7.2: content/news.ts
- [ ] TASK 7.3: content/pages.ts

### Phase 3F: Catalog Routes (Task 8)
- [ ] TASK 8.1: catalog/brands.ts
- [ ] TASK 8.2: catalog/attributes.ts
- [ ] TASK 8.3: catalog/shipping.ts

### Phase 3G: Features Routes (Task 9)
- [ ] TASK 9.1: features/questions.ts
- [ ] TASK 9.2: features/answers.ts
- [ ] TASK 9.3: features/sliders.ts
- [ ] TASK 9.4: features/banners.ts
- [ ] TASK 9.5: features/comparisons.ts
- [ ] TASK 9.6: features/credit-points.ts

### Phase 3H: Utility Routes (Task 10)
- [ ] TASK 10.1: payment.ts
- [ ] TASK 10.2: search.ts
- [ ] TASK 10.3: upload.ts
- [ ] TASK 10.4: settings.ts
- [ ] TASK 10.5: requests.ts

### Phase 4: Integration (Task 11)
- [ ] TASK 11.1: Update routes/index.ts
- [ ] TASK 11.2: Update main routes.ts

### Phase 5: Testing (Task 12)
- [ ] TASK 12.1: Build & compile
- [ ] TASK 12.2: Restart workflow
- [ ] TASK 12.3: Test all endpoints

### Phase 6: Documentation (Task 13)
- [ ] TASK 13.1: Update replit.md

---

## 🚨 ERROR RESOLUTION GUIDE

### Error 1: "Cannot find module 'middleware'"
**Cause:** Import path incorrect
**Fix:**
```typescript
// Wrong:
import { requireAuth } from "./middleware";

// Correct (from auth.ts):
import { requireAuth } from "./middleware";

// Correct (from user/addresses.ts):
import { requireAuth } from "../middleware";
```

### Error 2: "storage is not defined"
**Cause:** Missing storage import
**Fix:**
```typescript
// From routes root (auth.ts):
import { storage } from "../storage";

// From routes/user/ (user/addresses.ts):
import { storage } from "../../storage";

// From routes/admin/ (admin/products.ts):
import { storage } from "../../storage";
```

### Error 3: "insertXSchema is not defined"
**Cause:** Missing schema import
**Fix:**
```typescript
import { insertAddressSchema } from "@shared/schema";
```

### Error 4: "Express is not defined"
**Cause:** Missing Express type import
**Fix:**
```typescript
import type { Express } from "express";
```

---

## 🎯 SUMMARY

**Total Micro-Tasks Created: 200+**
**Total Files to Create: 35**
**Total Lines to Extract: 2,264**
**Estimated Time: 4-6 hours**
**Difficulty: Medium (Repetitive but straightforward)**

**Next Step:** Start TASK 1.1.1 - Create middleware.ts

