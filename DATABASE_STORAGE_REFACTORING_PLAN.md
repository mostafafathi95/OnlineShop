# 📋 DATABASE STORAGE REFACTORING PLAN (server/storage/database-storage.ts)

## 📊 CURRENT STATE ANALYSIS

**File:** `server/storage/database-storage.ts`
- **Size:** 666 lines
- **Methods:** 138 async methods
- **Properties:** 28 private repository instances
- **Pattern:** Adapter/Proxy pattern (delegates to specific repositories)

---

## 🎯 REFACTORING STRATEGY

**Goal:** Split into domain-driven modules (single responsibility)

**Pattern:** 
```
server/storage/
├── database-storage.ts (Main orchestrator - imports all adapters)
├── adapters/
│   ├── auth-storage.ts (Auth operations)
│   ├── product-storage.ts (Products, categories, images)
│   ├── review-storage.ts (Reviews, ratings)
│   ├── commerce-storage.ts (Wishlist, coupons)
│   ├── order-storage.ts (Orders, addresses, cart)
│   ├── content-storage.ts (Articles, news, pages)
│   ├── catalog-storage.ts (Brands, attributes, shipping)
│   ├── wallet-storage.ts (Wallets, credits, requests)
│   ├── admin-storage.ts (Settings, sliders, banners, sections)
│   ├── qa-storage.ts (Questions, answers)
│   ├── comparison-storage.ts (Product comparisons)
│   ├── analytics-storage.ts (Analytics, stats)
│   └── index.ts (Export all adapters)
```

---

## 🔍 DEPENDENCY ANALYSIS

### IMPORTS (Current)
```typescript
// From storage-base/index.ts
Users, Categories, Products, ProductImages, Reviews, Wishlist, Coupons,
Addresses, Cart, Orders, Articles, News, Pages, Brands,
ProductAttributes, ShippingMethods, CreditPoints, Wallets, Requests,
Settings, Questions, Answers, Sliders, Banners, LandingPageSections,
Comparisons, Analytics, Stats

// From @shared/schema
User, UpsertUser, Category, InsertCategory, Product, InsertProduct,
ProductImage, InsertProductImage, Address, InsertAddress, CartItem,
InsertCartItem, Order, InsertOrder, OrderItem, InsertOrderItem,
Review, InsertReview, Coupon, InsertCoupon, WishlistItem, Article,
InsertArticle, News, InsertNews, Page, InsertPage, Brand, InsertBrand,
ProductAttribute, InsertProductAttribute, ShippingMethod,
InsertShippingMethod, CreditPoint, InsertCreditPoint, UserWallet,
InsertUserWallet, UserRequest, InsertUserRequest, Setting, InsertSetting,
Question, InsertQuestion, Answer, InsertAnswer, Slider, InsertSlider,
Banner, InsertBanner, LandingPageSection, InsertLandingPageSection,
SearchAnalytics, InsertSearchAnalytics

// From storage-interface
IStorage
```

### METHODS BREAKDOWN BY DOMAIN

#### AUTH (5 methods)
- `getUser(id)`
- `getUserByEmail(email)`
- `upsertUser(user)`
- `updateUser(id, data)`
- `getAllUsers()`

#### CATEGORIES (6 methods)
- `getAllCategories()`
- `getCategoryById(id)`
- `getCategoryBySlug(slug)`
- `createCategory(category)`
- `updateCategory(id, data)`
- `deleteCategory(id)`

#### PRODUCTS (6 methods)
- `getAllProducts(options)`
- `getProductById(id)`
- `getProductBySlug(slug)`
- `createProduct(product)`
- `updateProduct(id, data)`
- `deleteProduct(id)`

#### PRODUCT IMAGES (3 methods)
- `getProductImages(productId)`
- `addProductImage(image)`
- `deleteProductImage(id)`

#### REVIEWS (7 methods)
- `getProductReviews(productId)`
- `getUserReviews(userId)`
- `getReviewById(id)`
- `getAllReviews()`
- `createReview(review)`
- `updateReview(id, data)`
- `deleteReview(id)`
- `updateReviewHelpfulness(id, helpful, unhelpful)`

#### WISHLIST (4 methods)
- `getUserWishlist(userId)`
- `addToWishlist(userId, productId)`
- `removeFromWishlist(userId, productId)`
- `isInWishlist(userId, productId)`

#### COUPONS (6 methods)
- `getAllCoupons(options)`
- `getCouponByCode(code)`
- `createCoupon(coupon)`
- `updateCoupon(id, data)`
- `deleteCoupon(id)`
- `incrementCouponUses(code)`

#### ADDRESSES (7 methods)
- `getUserAddresses(userId)`
- `getAddressById(id)`
- `createAddress(address)`
- `updateAddress(id, data)`
- `deleteAddress(id)`
- `setDefaultAddress(userId, addressId)`

#### CART (5 methods)
- `getUserCart(userId)`
- `addToCart(item)`
- `updateCartItem(id, quantity)`
- `removeFromCart(id)`
- `clearCart(userId)`

#### ORDERS (6 methods)
- `getUserOrders(userId)`
- `getAllOrders(options)`
- `getOrderById(id)`
- `getOrderWithItems(id)`
- `createOrder(order, items)`
- `updateOrderStatus(id, status)`

#### ARTICLES (6 methods)
- `getAllArticles(options)`
- `getArticleById(id)`
- `getArticleBySlug(slug)`
- `createArticle(article)`
- `updateArticle(id, data)`
- `deleteArticle(id)`

#### NEWS (6 methods)
- `getAllNews(options)`
- `getNewsById(id)`
- `getNewsBySlug(slug)`
- `createNews(news)`
- `updateNews(id, data)`
- `deleteNews(id)`

#### PAGES (6 methods)
- `getAllPages(options)`
- `getPageById(id)`
- `getPageBySlug(slug)`
- `createPage(page)`
- `updatePage(id, data)`
- `deletePage(id)`

#### BRANDS (6 methods)
- `getAllBrands(options)`
- `getBrandById(id)`
- `getBrandBySlug(slug)`
- `createBrand(brand)`
- `updateBrand(id, data)`
- `deleteBrand(id)`

#### PRODUCT ATTRIBUTES (4 methods)
- `getProductAttributes(productId)`
- `createProductAttribute(attr)`
- `updateProductAttribute(id, data)`
- `deleteProductAttribute(id)`

#### SHIPPING METHODS (5 methods)
- `getAllShippingMethods(options)`
- `getShippingMethodById(id)`
- `createShippingMethod(method)`
- `updateShippingMethod(id, data)`
- `deleteShippingMethod(id)`

#### CREDIT POINTS (4 methods)
- `getUserCreditPoints(userId)`
- `getTotalCreditPoints(userId)`
- `addCreditPoints(creditPoint)`
- `removeCreditPoints(id)`

#### USER WALLETS (3 methods)
- `getUserWallet(userId)`
- `createUserWallet(wallet)`
- `updateWalletBalance(userId, balance)`

#### USER REQUESTS (6 methods)
- `getUserRequests(userId)`
- `getAllUserRequests(options)`
- `getUserRequestById(id)`
- `createUserRequest(request)`
- `updateUserRequest(id, data)`
- `deleteUserRequest(id)`

#### SETTINGS (4 methods)
- `getAllSettings()`
- `getSettingByKey(key)`
- `createSetting(setting)`
- `updateSetting(key, value)`

#### QUESTIONS (5 methods)
- `getProductQuestions(productId)`
- `getQuestionById(id)`
- `createQuestion(question)`
- `updateQuestion(id, data)`
- `deleteQuestion(id)`

#### ANSWERS (5 methods)
- `getQuestionAnswers(questionId)`
- `getAnswerById(id)`
- `createAnswer(answer)`
- `updateAnswer(id, data)`
- `deleteAnswer(id)`

#### SLIDERS (7 methods)
- `getAllSliders()`
- `getSliderById(id)`
- `getSliderBySlug(slug)`
- `getActiveSliders()`
- `createSlider(slider)`
- `updateSlider(id, data)`
- `deleteSlider(id)`

#### BANNERS (7 methods)
- `getAllBanners()`
- `getAllBannersAdmin()`
- `getBannerById(id)`
- `createBanner(banner)`
- `updateBanner(id, data)`
- `deleteBanner(id)`
- `updateBannerSortOrder(id, sortOrder)`

#### LANDING PAGE SECTIONS (5 methods)
- `getLandingPageSections()`
- `getLandingPageSectionById(id)`
- `createLandingPageSection(section)`
- `updateLandingPageSection(id, data)`
- `deleteLandingPageSection(id)`

#### COMPARISONS (3 methods)
- `getComparison(sessionId)`
- `addToComparison(sessionId, product1Id, product2Id)`
- `removeFromComparison(sessionId, product1Id, product2Id)`

#### ANALYTICS & STATS (1 method)
- `getStats()`

---

## 🛠 REFACTORING TASKS

### PHASE 1: ADAPTER CREATION (12 files)

#### Task 1.1: Auth Adapter
**File:** `server/storage/adapters/auth-storage.ts`
- **Methods:** 5
- **Imports:** Users, (User, UpsertUser)
- **Dependencies:** storage-base/Users
- **Lines:** ~40

**Subtask 1.1.1:** Create class `AuthStorageAdapter`
**Subtask 1.1.2:** Implement 5 methods
**Subtask 1.1.3:** Export class

---

#### Task 1.2: Product Adapter (Products, Categories, Images)
**File:** `server/storage/adapters/product-storage.ts`
- **Methods:** 15 (6 category + 6 product + 3 images)
- **Imports:** Categories, Products, ProductImages, (Category, InsertCategory, Product, InsertProduct, ProductImage, InsertProductImage)
- **Dependencies:** storage-base/Categories, Products, ProductImages
- **Lines:** ~110

**Subtask 1.2.1:** Create class `ProductStorageAdapter`
**Subtask 1.2.2:** Implement 6 category methods
**Subtask 1.2.3:** Implement 6 product methods
**Subtask 1.2.4:** Implement 3 image methods
**Subtask 1.2.5:** Export class

---

#### Task 1.3: Review Adapter
**File:** `server/storage/adapters/review-storage.ts`
- **Methods:** 8
- **Imports:** Reviews, (Review, InsertReview)
- **Dependencies:** storage-base/Reviews
- **Lines:** ~70

**Subtask 1.3.1:** Create class `ReviewStorageAdapter`
**Subtask 1.3.2:** Implement 8 methods
**Subtask 1.3.3:** Export class

---

#### Task 1.4: Commerce Adapter (Wishlist, Coupons)
**File:** `server/storage/adapters/commerce-storage.ts`
- **Methods:** 10 (4 wishlist + 6 coupons)
- **Imports:** Wishlist, Coupons, (WishlistItem, Product, Coupon, InsertCoupon)
- **Dependencies:** storage-base/Wishlist, Coupons
- **Lines:** ~90

**Subtask 1.4.1:** Create class `CommerceStorageAdapter`
**Subtask 1.4.2:** Implement 4 wishlist methods
**Subtask 1.4.3:** Implement 6 coupon methods
**Subtask 1.4.4:** Export class

---

#### Task 1.5: Order Adapter (Orders, Addresses, Cart)
**File:** `server/storage/adapters/order-storage.ts`
- **Methods:** 18 (7 addresses + 5 cart + 6 orders)
- **Imports:** Addresses, Cart, Orders, (Address, InsertAddress, CartItem, Product, Order, InsertOrder, OrderItem, InsertOrderItem)
- **Dependencies:** storage-base/Addresses, Cart, Orders
- **Lines:** ~140

**Subtask 1.5.1:** Create class `OrderStorageAdapter`
**Subtask 1.5.2:** Implement 7 address methods
**Subtask 1.5.3:** Implement 5 cart methods
**Subtask 1.5.4:** Implement 6 order methods
**Subtask 1.5.5:** Export class

---

#### Task 1.6: Content Adapter (Articles, News, Pages)
**File:** `server/storage/adapters/content-storage.ts`
- **Methods:** 18 (6 articles + 6 news + 6 pages)
- **Imports:** Articles, News, Pages, (Article, InsertArticle, News, InsertNews, Page, InsertPage)
- **Dependencies:** storage-base/Articles, News, Pages
- **Lines:** ~140

**Subtask 1.6.1:** Create class `ContentStorageAdapter`
**Subtask 1.6.2:** Implement 6 article methods
**Subtask 1.6.3:** Implement 6 news methods
**Subtask 1.6.4:** Implement 6 page methods
**Subtask 1.6.5:** Export class

---

#### Task 1.7: Catalog Adapter (Brands, Attributes, Shipping)
**File:** `server/storage/adapters/catalog-storage.ts`
- **Methods:** 15 (6 brands + 4 attributes + 5 shipping)
- **Imports:** Brands, ProductAttributes, ShippingMethods, (Brand, InsertBrand, ProductAttribute, InsertProductAttribute, ShippingMethod, InsertShippingMethod)
- **Dependencies:** storage-base/Brands, ProductAttributes, ShippingMethods
- **Lines:** ~120

**Subtask 1.7.1:** Create class `CatalogStorageAdapter`
**Subtask 1.7.2:** Implement 6 brand methods
**Subtask 1.7.3:** Implement 4 attribute methods
**Subtask 1.7.4:** Implement 5 shipping methods
**Subtask 1.7.5:** Export class

---

#### Task 1.8: Wallet Adapter (Credits, Wallets, Requests)
**File:** `server/storage/adapters/wallet-storage.ts`
- **Methods:** 13 (4 credits + 3 wallets + 6 requests)
- **Imports:** CreditPoints, Wallets, Requests, (CreditPoint, InsertCreditPoint, UserWallet, InsertUserWallet, UserRequest, InsertUserRequest)
- **Dependencies:** storage-base/CreditPoints, Wallets, Requests
- **Lines:** ~110

**Subtask 1.8.1:** Create class `WalletStorageAdapter`
**Subtask 1.8.2:** Implement 4 credit point methods
**Subtask 1.8.3:** Implement 3 wallet methods
**Subtask 1.8.4:** Implement 6 request methods
**Subtask 1.8.5:** Export class

---

#### Task 1.9: Admin Adapter (Settings, Sliders, Banners, Sections)
**File:** `server/storage/adapters/admin-storage.ts`
- **Methods:** 21 (4 settings + 7 sliders + 7 banners + 5 sections)
- **Imports:** Settings, Sliders, Banners, LandingPageSections, (Setting, InsertSetting, Slider, InsertSlider, Banner, InsertBanner, LandingPageSection, InsertLandingPageSection)
- **Dependencies:** storage-base/Settings, Sliders, Banners, LandingPageSections
- **Lines:** ~170

**Subtask 1.9.1:** Create class `AdminStorageAdapter`
**Subtask 1.9.2:** Implement 4 settings methods
**Subtask 1.9.3:** Implement 7 slider methods
**Subtask 1.9.4:** Implement 7 banner methods
**Subtask 1.9.5:** Implement 5 landing page section methods
**Subtask 1.9.6:** Export class

---

#### Task 1.10: Q&A Adapter (Questions, Answers)
**File:** `server/storage/adapters/qa-storage.ts`
- **Methods:** 10 (5 questions + 5 answers)
- **Imports:** Questions, Answers, (Question, InsertQuestion, Answer, InsertAnswer)
- **Dependencies:** storage-base/Questions, Answers
- **Lines:** ~90

**Subtask 1.10.1:** Create class `QAStorageAdapter`
**Subtask 1.10.2:** Implement 5 question methods
**Subtask 1.10.3:** Implement 5 answer methods
**Subtask 1.10.4:** Export class

---

#### Task 1.11: Comparison Adapter
**File:** `server/storage/adapters/comparison-storage.ts`
- **Methods:** 3
- **Imports:** Comparisons, (SearchAnalytics, InsertSearchAnalytics)
- **Dependencies:** storage-base/Comparisons
- **Lines:** ~40

**Subtask 1.11.1:** Create class `ComparisonStorageAdapter`
**Subtask 1.11.2:** Implement 3 methods
**Subtask 1.11.3:** Export class

---

#### Task 1.12: Analytics Adapter
**File:** `server/storage/adapters/analytics-storage.ts`
- **Methods:** 1
- **Imports:** Analytics, Stats, (SearchAnalytics, InsertSearchAnalytics)
- **Dependencies:** storage-base/Analytics, Stats
- **Lines:** ~30

**Subtask 1.12.1:** Create class `AnalyticsStorageAdapter`
**Subtask 1.12.2:** Implement 1 method (getStats)
**Subtask 1.12.3:** Export class

---

### PHASE 2: ADAPTER INDEX

#### Task 2.1: Adapter Index File
**File:** `server/storage/adapters/index.ts`
- **Imports:** All 12 adapter classes
- **Exports:** All adapter classes
- **Lines:** ~15

**Subtask 2.1.1:** Import all adapters
**Subtask 2.1.2:** Export all adapters

---

### PHASE 3: MAIN ORCHESTRATOR

#### Task 3.1: Refactor Main DatabaseStorage Class
**File:** `server/storage/database-storage.ts` (MODIFIED)
- **New Structure:**
  - Import all adapters from `./adapters`
  - Implement IStorage interface
  - Compose adapters instead of repositories
  - Delegate all methods to adapters

**Subtask 3.1.1:** Remove direct repository imports
**Subtask 3.1.2:** Import adapters from `./adapters/index`
**Subtask 3.1.3:** Replace private properties with adapter instances
**Subtask 3.1.4:** Update constructor to instantiate adapters
**Subtask 3.1.5:** Verify all 138 methods delegate correctly

---

### PHASE 4: VERIFICATION & CLEANUP

#### Task 4.1: Import Updates
- Update all references in `server/routes.ts` (if any)
- Update all references in `server/index.ts` (if any)
- Verify storage initialization still works

**Subtask 4.1.1:** Check for import conflicts
**Subtask 4.1.2:** Verify DatabaseStorage export
**Subtask 4.1.3:** Run TypeScript compilation

#### Task 4.2: Testing
**Subtask 4.2.1:** Verify server starts (npm run dev)
**Subtask 4.2.2:** Check no LSP errors
**Subtask 4.2.3:** Verify API endpoints work

#### Task 4.3: Documentation
**Subtask 4.3.1:** Update adapter directory structure
**Subtask 4.3.2:** Document adapter responsibilities
**Subtask 4.3.3:** Update replit.md with changes

---

## 📈 IMPLEMENTATION SEQUENCE

```
Phase 1 (Adapters)
├─ Task 1.1 (Auth) ─→ 5 methods
├─ Task 1.2 (Product) ─→ 15 methods
├─ Task 1.3 (Review) ─→ 8 methods
├─ Task 1.4 (Commerce) ─→ 10 methods
├─ Task 1.5 (Order) ─→ 18 methods
├─ Task 1.6 (Content) ─→ 18 methods
├─ Task 1.7 (Catalog) ─→ 15 methods
├─ Task 1.8 (Wallet) ─→ 13 methods
├─ Task 1.9 (Admin) ─→ 21 methods
├─ Task 1.10 (Q&A) ─→ 10 methods
├─ Task 1.11 (Comparison) ─→ 3 methods
└─ Task 1.12 (Analytics) ─→ 1 method
    ↓
Phase 2 (Index)
├─ Task 2.1 (Adapter Index)
    ↓
Phase 3 (Orchestrator)
├─ Task 3.1 (Main DatabaseStorage)
    ↓
Phase 4 (Verification)
├─ Task 4.1 (Import Updates)
├─ Task 4.2 (Testing)
└─ Task 4.3 (Documentation)
```

---

## 🎨 CODE TEMPLATES

### Adapter Template
```typescript
// server/storage/adapters/[domain]-storage.ts
import type IStorage from "../../storage-interface";
import { [Repository] } from "../../storage-base";
import type { [Type], [InsertType] } from "@shared/schema";

export class [Domain]StorageAdapter {
  private [repository]: [Repository];

  constructor() {
    this.[repository] = new [Repository]();
  }

  async [method]([params]): Promise<[ReturnType]> {
    return this.[repository].[method]([params]);
  }

  // ... more methods
}
```

### Main Orchestrator Template
```typescript
// server/storage/database-storage.ts
import type { IStorage } from "../storage-interface";
import { [Domain]StorageAdapter } from "./adapters";

export class DatabaseStorage implements IStorage {
  private auth: AuthStorageAdapter;
  private products: ProductStorageAdapter;
  // ... more adapters

  constructor() {
    this.auth = new AuthStorageAdapter();
    this.products = new ProductStorageAdapter();
    // ... initialize more adapters
  }

  // Auth methods
  async getUser(id: string) {
    return this.auth.getUser(id);
  }
  // ... more delegation methods
}
```

---

## 📊 METRICS

| Metric | Current | After |
|--------|---------|-------|
| **Files** | 1 | 14 |
| **Max Lines/File** | 666 | ~170 |
| **Domains** | 1 | 12 |
| **Responsibility** | Mixed | Single |
| **Testability** | Low | High |
| **Maintainability** | Low | High |

---

## ✅ SUCCESS CRITERIA

- [ ] 12 adapter files created with single responsibility
- [ ] All 138 methods distributed correctly
- [ ] No LSP errors
- [ ] Server starts on port 5000
- [ ] All API endpoints work
- [ ] Zero circular imports
- [ ] replit.md updated

---

## 🚀 NEXT STEPS

1. Read this plan thoroughly
2. Execute Phase 1 (create 12 adapters)
3. Execute Phase 2 (create adapter index)
4. Execute Phase 3 (refactor main class)
5. Execute Phase 4 (verify & test)
6. Update replit.md
