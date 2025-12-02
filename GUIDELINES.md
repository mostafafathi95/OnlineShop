# 🎯 Persian E-Commerce Platform - Advanced Development Guidelines
**Version 4.0** | **Status:** Production-Ready Code Optimization Standards  
**Purpose:** Achieve maximum code efficiency, minimum redundancy, advanced patterns, superior quality with minimal code changes

---

## 📋 TABLE OF CONTENTS
1. [Core Development Principles](#core-principles)
2. [Strict Coding Standards](#strict-coding-standards)
3. [Code Compression Rules](#code-compression-rules)
4. [Advanced Architecture Patterns](#advanced-patterns)
5. [Complete Project Roadmap](#project-roadmap)
6. [Implementation Checklist](#implementation-checklist)

---

## 🔥 CORE PRINCIPLES {#core-principles}

### Rule 1: Single Responsibility - Absolute
- **ONE purpose per file, function, component**
- **Violators:** Multi-purpose utilities, god components, bloated services
- **Enforcement:** If file >200 lines or component >150 lines, split immediately
- **Example:** ✅ `useAuth.ts`, `useCart.ts` NOT ❌ `useEverything.ts`

### Rule 2: DRY (Don't Repeat Yourself) - Zero Tolerance
- **Never duplicate code logic, components, or patterns**
- **Max 2 occurrences → Create shared utility immediately at 3rd occurrence**
- **Solution:** Custom hooks, utility functions, shared components
- **Example:** ✅ `formatPrice()` used by 5 components NOT ❌ Price formatting in each component

### Rule 3: Type Safety - 100% Mandatory
- **All `any` types prohibited - use strict typing**
- **All API responses must have Zod schemas**
- **All database operations typed from schema.ts**
- **Compiler errors → STOP, don't ship**

### Rule 4: Performance First
- **Code should be optimized before being documented**
- **Each component must have useMemo/useCallback if rendering >50ms**
- **API calls must be cached unless real-time data required**
- **Bundle size target: <500KB (gzipped)**

### Rule 5: No Magic Values
- **All constants → `const` at file/module level**
- **All numbers → named constants (e.g., `ADMIN_REDIRECT_DELAY = 300`)**
- **All strings → enums or constants**
- **Config values → `config.ts` or env variables**

---

## 🏗️ STRICT CODING STANDARDS {#strict-coding-standards}

### Frontend Standards

#### Component Structure
```typescript
// ✅ CORRECT
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  const state = useState();
  const derived = useMemo(() => calculate(state), [state]);
  return <></>;
};

// ❌ WRONG
export function ComponentName(props) {
  let state = useState();
  return <div>{props.something}</div>;
}
```

#### Hook Usage
- **Always extract custom hooks for complex logic**
- **Custom hooks must be in separate files in `hooks/` directory**
- **Hook names MUST start with `use`**
- **Dependency arrays are MANDATORY - missing = BUG**

#### Component Organization
```typescript
// REQUIRED ORDER:
// 1. Imports (grouped: react, libraries, local)
// 2. Types/Interfaces
// 3. Constants
// 4. Component definition
// 5. Styled components (if needed)
// 6. Export
```

#### Query/Mutation Patterns
```typescript
// ✅ Always use this pattern
const { data, isLoading } = useQuery({
  queryKey: ['/api/path', id], // Hierarchical key
  queryFn: () => fetch(`/api/path/${id}`),
});

// Invalidate after mutations
queryClient.invalidateQueries({ queryKey: ['/api/path'] });
```

#### Error Handling
```typescript
// ✅ Always show user-friendly Persian messages
if (error) {
  toast({
    title: "خطا",
    description: "درخواست ناموفق بود. دوباره سعی کنید.",
    variant: "destructive"
  });
}
```

### Backend Standards

#### Route Organization
```typescript
// PATTERN: Each feature → separate route file
// server/routes/
//   ├── admin/
//   │   ├── products.ts
//   │   ├── orders.ts
//   │   └── users.ts
//   └── public/
//       ├── products.ts
//       └── cart.ts

// Each file exports: export async function setupXXXRoutes(app: Express)
```

#### Middleware Pattern
```typescript
// ✅ Middleware = pure function that validates/transforms
export async function requireAdmin(req, res, next) {
  const token = extractToken(req);
  if (!tokenValid(token) || !userIsAdmin(token)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}
```

#### Storage Interface
- **All data operations through `storage` interface**
- **Never query database directly in routes**
- **Pattern:** Route → Storage Interface → Database/Adapter

#### Error Responses
```typescript
// ✅ Consistent error format
res.status(statusCode).json({ error: "Persian message", code: "ERROR_CODE" });

// Never: res.json({ success: false, ...})
// Never: res.json({ message: "Generic error" })
```

### Database Standards

#### Schema Rules
- **All timestamps: `createdAt`, `updatedAt` (auto-managed)**
- **All IDs: UUID (varchar) for users, serial for system tables**
- **All relationships: explicit foreign keys with `references()`**
- **All fields have reasonable defaults or are nullable for optional data**

#### Query Optimization
- **Use Drizzle Query Builder - NO raw SQL**
- **Use `.select({ id, name })` to limit columns**
- **Use `.limit()` for lists, implement pagination**
- **Use `.where()` before `.join()` for filters**

#### No N+1 Queries
- **Join related data in single query**
- **Use Drizzle's relationship loading**
- **Profile queries - optimize before production**

---

## 🗜️ CODE COMPRESSION RULES {#code-compression-rules}

### Remove Unnecessary Elements

#### Delete These Immediately
1. **Unused imports** - Auto-cleanup with IDE
2. **Commented-out code** - Use git history if needed
3. **Console logs** - Replace with logger in production
4. **Multiple props spreading** → Destructure directly
5. **Intermediate variables** → Chain operations

#### Before (Uncompressed)
```typescript
const user = getUserData();
const isValid = validateUser(user);
if (isValid) {
  const profile = extractProfile(user);
  const cleaned = cleanProfile(profile);
  return cleaned;
}
return null;
```

#### After (Compressed)
```typescript
const user = getUserData();
return validateUser(user) ? cleanProfile(extractProfile(user)) : null;
```

### Consolidate Similar Components

#### Pattern: Create Generic Component Once
```typescript
// ❌ BEFORE: 3 similar form components
- AdminProductForm.tsx (150 lines)
- AdminOrderForm.tsx (145 lines)
- AdminUserForm.tsx (140 lines)

// ✅ AFTER: 1 generic component
- DynamicForm.tsx (80 lines)
  Takes: schema, fields, onSubmit
```

### Use Default Values Instead of Conditionals
```typescript
// ❌ Long
const title = data?.title ? data.title : "Untitled";

// ✅ Short
const title = data?.title || "Untitled";

// ✅ Even better
const { title = "Untitled" } = data || {};
```

### Extract Repeated Logic Patterns
```typescript
// ✅ Create utility for repeated pattern
const handleAsyncAction = async (action: () => Promise<T>) => {
  try {
    const result = await action();
    toast({ title: "موفق", description: "عملیات انجام شد" });
    return result;
  } catch (error) {
    toast({ title: "خطا", description: error.message, variant: "destructive" });
  }
};

// Usage in components: 3 lines instead of 10
const result = await handleAsyncAction(() => deleteItem(id));
```

---

## 🚀 ADVANCED ARCHITECTURE PATTERNS {#advanced-patterns}

### Pattern 1: Feature-Driven Architecture
```
/client/src/features/
  ├── products/
  │   ├── components/
  │   ├── hooks/
  │   ├── types/
  │   ├── queries.ts
  │   └── index.ts (exports only public API)
  ├── cart/
  └── auth/

/server/routes/
  ├── products/
  │   ├── admin.ts (admin operations)
  │   ├── public.ts (user operations)
  │   └── middleware.ts
```

### Pattern 2: Storage Adapter Pattern
```typescript
// Reduces code coupling, enables easy swaps
interface IProductStorage {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
}

class ProductStorageAdapter implements IProductStorage {
  // Implementation
}

// Use: const products = await storage.products.getAll();
```

### Pattern 3: Query Key Factory
```typescript
// centralizes query key management, prevents typos
const productQueries = {
  all: () => ['products'],
  lists: () => [...productQueries.all(), 'list'],
  list: (filter) => [...productQueries.lists(), { filter }],
  detail: (id) => [...productQueries.all(), id],
};

// Usage: queryKey: productQueries.detail(id)
```

### Pattern 4: Middleware Chain
```typescript
// Compose multiple middleware operations
const authChain = compose(
  validateToken,
  checkRole('admin'),
  logAction,
  rateLimitAdmin
);

app.get('/api/admin/users', authChain, getUsersHandler);
```

### Pattern 5: Custom Hook Composition
```typescript
// Combine multiple hooks into single reusable unit
const useAdminUser = () => {
  const auth = useAuth();
  const query = useQuery({ /* admin-specific query */ });
  const permissions = usePermissions();
  
  return { auth, query, permissions };
};

// One hook replaces 10 lines of boilerplate in every admin component
```

---

## 📊 COMPLETE PROJECT ROADMAP {#project-roadmap}

### PHASE 1: CORE OPTIMIZATION (Priority: CRITICAL)

#### Task 1.1: Code Deduplication
**Subtask 1.1.1:** Audit all components >120 lines
- [ ] Read all component files
- [ ] Identify duplicated patterns
- [ ] Create shared components

**Subtask 1.1.2:** Extract admin form components
- [ ] Create `AdminFormTemplate` component
- [ ] Replace 22 admin forms with template + config
- [ ] Reduce lines: ~4000 → ~800

**Subtask 1.1.3:** Extract utility functions
- [ ] Create `utils/formatters.ts` (price, date, currency formatting)
- [ ] Create `utils/validators.ts` (all validation logic)
- [ ] Create `utils/api-helpers.ts` (common API patterns)

#### Task 1.2: Component Consolidation
**Subtask 1.2.1:** Merge similar admin pages
- [ ] `AdminProducts`, `AdminCategories`, `AdminBanners` → `AdminDataTable` (configurable)
- [ ] Reduces files: 22 → 8

**Subtask 1.2.2:** Create generic dialog system
- [ ] Replace 30+ individual dialogs with `<GenericDialog config={...} />`
- [ ] Reduces code: ~3000 lines → ~200 lines

#### Task 1.3: Hook Optimization
**Subtask 1.3.1:** Extract all complex logic to hooks
- [ ] `useAdminForm` - handles all admin form logic
- [ ] `usePagination` - centralized pagination
- [ ] `useFilters` - centralized filtering
- [ ] `useSort` - centralized sorting

**Subtask 1.3.2:** Remove duplicate API calls
- [ ] Audit all useQuery calls for duplication
- [ ] Consolidate to queryClient factory pattern

### PHASE 2: BACKEND COMPRESSION (Priority: HIGH)

#### Task 2.1: Route Consolidation
**Subtask 2.1.1:** Create generic CRUD route generator
- [ ] Function: `createCRUDRoutes(resource, permissions)`
- [ ] Replaces 300+ lines of repetitive route code

**Subtask 2.1.2:** Merge similar route files
- [ ] 51 files → 15 files (grouped by domain)
- [ ] Each file: ~100 lines instead of current scattered organization

**Subtask 2.1.3:** Create validation middleware factory
- [ ] `createValidator(schema)` returns middleware
- [ ] Replaces 30+ validation blocks

#### Task 2.2: Storage Layer Optimization
**Subtask 2.2.1:** Create storage factories
- [ ] `createTableStorage(table, schema)` → full CRUD adapter
- [ ] Reduces storage files significantly

**Subtask 2.2.2:** Consolidate admin operations
- [ ] All admin operations → single `adminOperations.ts`
- [ ] Standardized patterns for all resources

### PHASE 3: DATABASE OPTIMIZATION (Priority: HIGH)

#### Task 3.1: Query Optimization
**Subtask 3.1.1:** Profile and optimize slow queries
- [ ] Identify N+1 queries
- [ ] Add necessary indexes
- [ ] Use Drizzle joins instead of separate queries

**Subtask 3.1.2:** Implement query caching strategy
- [ ] Cache strategies per endpoint
- [ ] Cache invalidation patterns

#### Task 3.2: Schema Refinement
**Subtask 3.2.1:** Remove redundant columns
- [ ] Audit all tables for unnecessary fields
- [ ] Consolidate similar types

**Subtask 3.2.2:** Optimize relationships
- [ ] Review all foreign keys
- [ ] Ensure proper indexes on FK columns

### PHASE 4: PERFORMANCE (Priority: MEDIUM)

#### Task 4.1: Frontend Performance
**Subtask 4.1.1:** Code splitting
- [ ] Lazy load admin pages
- [ ] Route-based splitting

**Subtask 4.1.2:** Image optimization
- [ ] Implement next-gen formats (WebP)
- [ ] Responsive images with srcset

**Subtask 4.1.3:** Bundle optimization
- [ ] Remove unused dependencies
- [ ] Tree-shake dead code

#### Task 4.2: Backend Performance
**Subtask 4.2.1:** Implement caching
- [ ] Redis for hot data
- [ ] Cache invalidation patterns

**Subtask 4.2.2:** Pagination on all lists
- [ ] Implement cursor-based pagination
- [ ] Default limit: 20

### PHASE 5: ADVANCED FEATURES (Priority: LOW)

#### Task 5.1: Real-time Features
**Subtask 5.1.1:** WebSocket implementation
- [ ] Real-time order updates
- [ ] Live inventory changes

#### Task 5.2: Advanced Admin Features
**Subtask 5.2.1:** Bulk operations
- [ ] Bulk product updates
- [ ] Bulk order processing

**Subtask 5.2.2:** Advanced analytics
- [ ] Revenue trends
- [ ] Customer insights
- [ ] Inventory forecasting

---

## ✅ IMPLEMENTATION CHECKLIST {#implementation-checklist}

### Code Quality Checklist (BEFORE any commit)
- [ ] No `any` types exist
- [ ] No console.log in production code
- [ ] No unused imports
- [ ] No commented-out code
- [ ] All functions have JSDoc comments
- [ ] All components have propTypes/TypeScript types
- [ ] Tests written for business logic
- [ ] No hardcoded values (use constants)
- [ ] DRY principle followed (no code duplication)
- [ ] Single responsibility respected (files <200 lines)

### Performance Checklist (BEFORE deployment)
- [ ] Bundle size checked (<500KB gzipped)
- [ ] Lighthouse score >90
- [ ] No N+1 queries
- [ ] Critical paths optimized
- [ ] Caching strategy implemented
- [ ] Images optimized
- [ ] Unnecessary dependencies removed
- [ ] Code splitting working

### Security Checklist (BEFORE production)
- [ ] All inputs validated (Zod schemas)
- [ ] All sensitive data not exposed in logs
- [ ] Authentication tokens properly stored
- [ ] Rate limiting on API endpoints
- [ ] CORS properly configured
- [ ] SQL injection impossible (using ORM)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented (if needed)

### Testing Checklist (BEFORE release)
- [ ] Unit tests: >80% coverage on utils/hooks
- [ ] Integration tests: all API flows
- [ ] E2E tests: critical user paths
- [ ] Admin operations tested
- [ ] Error scenarios tested
- [ ] Edge cases covered
- [ ] Accessibility tested (WCAG 2.1 AA)

---

## 🔄 ENFORCEMENT MECHANISMS

### Automated Checks
```json
{
  "pre-commit": [
    "ESLint (no `any` types)",
    "TypeScript strict mode",
    "Prettier formatting",
    "Unused imports check"
  ],
  "pre-push": [
    "npm run build (must pass)",
    "Unit tests (must pass)",
    "Bundle size check (must be <500KB)"
  ]
}
```

### Code Review Process
1. **Automated checks** (listed above)
2. **Performance review** - are there unnecessary renders?
3. **Duplication check** - is this code repeated elsewhere?
4. **Type safety review** - any implicit `any` types?
5. **Responsibility review** - does file have single purpose?

---

## 📈 METRICS TO TRACK

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Lines of Code** | <20K | 16.7K | ✅ |
| **Avg Component Size** | <120 lines | - | ⏳ |
| **Code Duplication** | <5% | - | ⏳ |
| **Type Coverage** | 100% | ~95% | ⏳ |
| **Test Coverage** | >80% | - | ⏳ |
| **Bundle Size** | <500KB | - | ⏳ |
| **API Response Time** | <200ms | - | ⏳ |
| **Lighthouse Score** | >90 | - | ⏳ |

---

## 🎓 EXAMPLES: BEFORE & AFTER

### Example 1: Component Consolidation
**BEFORE:** 22 separate admin pages (5000 lines)
```typescript
AdminProducts.tsx - 180 lines
AdminCategories.tsx - 175 lines
AdminBanners.tsx - 170 lines
// ... 19 more similar files
```

**AFTER:** 1 generic data table (300 lines)
```typescript
<AdminDataTable
  resource="products"
  columns={PRODUCT_COLUMNS}
  schema={PRODUCT_SCHEMA}
/>
```

### Example 2: Hook Extraction
**BEFORE:** Form logic in component (150 lines)
```typescript
const AdminProductForm = () => {
  const [form, setForm] = useState(...);
  const [errors, setErrors] = useState(...);
  const handleChange = () => {...}; // 20 lines
  const handleSubmit = async () => {...}; // 25 lines
  // ... 80 more lines of form logic
}
```

**AFTER:** Logic in hook (50 lines)
```typescript
const useAdminForm = (schema) => {
  // All form logic here
};

const AdminProductForm = () => {
  const { form, handleChange, handleSubmit } = useAdminForm(PRODUCT_SCHEMA);
  return <Form {...props} />; // 30 lines
};
```

### Example 3: Utility Extraction
**BEFORE:** Formatting in multiple places (80 lines total)
```typescript
// Component 1
const price = product.price.toLocaleString('fa-IR', {
  style: 'currency',
  currency: 'IRR'
});

// Component 2 (same code again)
const price = product.price.toLocaleString('fa-IR', {
  style: 'currency',
  currency: 'IRR'
});
```

**AFTER:** Single utility (5 lines)
```typescript
// utils/formatters.ts
export const formatPrice = (price: number) =>
  price.toLocaleString('fa-IR', { style: 'currency', currency: 'IRR' });

// Usage everywhere
const price = formatPrice(product.price);
```

---

## 🚨 CRITICAL DON'T DO THIS

❌ **DON'T:**
- Don't use `any` type - use proper TypeScript
- Don't hardcode values - use constants/env vars
- Don't duplicate code - extract to utilities
- Don't mix concerns - keep single responsibility
- Don't ignore TypeScript errors - fix them immediately
- Don't add features without removing equivalent code elsewhere
- Don't commit console.log statements
- Don't leave commented-out code

✅ **DO:**
- Use strict TypeScript with `noImplicitAny: true`
- Define all constants in dedicated files
- Extract repeated patterns to utilities/hooks
- One file = one concern
- Address all compiler warnings
- Refactor existing code when adding features
- Use logger instead of console
- Delete dead code, use git history if needed

---

## 📞 PROJECT CONTACT
**Project Lead:** Persian E-Commerce Team  
**Last Updated:** December 2, 2025  
**Version:** 4.0 - Advanced Optimization Standards

---

**Remember:** Every line of code should earn its place through clarity, reusability, and performance.  
**الهدف:** کد بهتر، کمتر، و پیشرفته‌تر 🎯

