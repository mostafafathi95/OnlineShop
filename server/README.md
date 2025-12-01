# 🖥️ Backend Application - Server Documentation

**Location:** `/server`  
**Type:** REST API (Express.js)  
**Language:** TypeScript  
**Database:** PostgreSQL (Neon)  
**Authentication:** Bearer Tokens + Sessions

---

## 📋 Overview

The backend is a production-grade Express.js REST API that handles all business logic, database operations, authentication, and integration with payment gateways. It provides 129+ endpoints for managing products, orders, users, and admin functions.

### Key Metrics
- **API Routes:** 129+
- **Database Layer:** 1,227 lines
- **Routes Definition:** 2,267 lines
- **Logging System:** 284 lines
- **Auth Manager:** 298 lines
- **Tables:** 29

### Technology Stack
- Express.js 4.21.2 - Web framework
- TypeScript - Type safety
- Drizzle ORM 0.39.1 - Database layer
- PostgreSQL (Neon) - Primary database
- Zod - Schema validation
- Passport.js - Authentication
- Multer - File uploads
- Sharp - Image processing
- Professional Logger - Request tracking

---

## 📂 Architecture

### Request Lifecycle
```
Request → Middleware Chain → Route Handler → Validation → 
Storage Layer → Database Query → Response → Logging
```

### File Organization

```
server/
├── index.ts                 Entry point (126 lines)
│   └── App initialization, middleware setup, port listening
│
├── routes.ts               API Routes (2,267 lines)
│   ├── Auth routes (replit-login, logout)
│   ├── Product routes (CRUD, search, filter)
│   ├── Order routes (create, update, list, payment)
│   ├── User routes (profile, addresses)
│   ├── Admin routes (all CRUD operations)
│   ├── Cart routes (add, remove, get)
│   ├── Wishlist routes
│   ├── Review routes
│   ├── Coupon routes
│   ├── Landing page routes
│   ├── Public routes (metadata, settings)
│   └── File upload routes
│
├── storage.ts              Database Layer (1,227 lines)
│   ├── User operations (create, read, update, delete)
│   ├── Product operations (CRUD, filtering)
│   ├── Order operations (create, update, list)
│   ├── Category operations
│   ├── Coupon operations
│   ├── Review operations
│   ├── Cart operations
│   ├── Wishlist operations
│   ├── Address operations
│   ├── Wallet operations
│   ├── Q&A operations
│   └── Admin operations
│
├── db.ts                   Database Connection
│   └── Drizzle client initialization
│
├── static.ts               Static File Serving
│   └── Production static file serving
│
├── vite.ts                 Vite Integration
│   └── Development server setup
│
├── utils/                  Backend Utilities
│   ├── logger.ts           Professional Logging (284 lines)
│   │   ├── HTTP request logging
│   │   ├── API tracking
│   │   ├── Auth logging
│   │   ├── Error logging
│   │   ├── System events
│   │   └── Performance monitoring
│   │
│   └── advanced-auth.ts    Auth Manager (298 lines)
│       ├── Token generation
│       ├── Token verification
│       ├── Session management
│       ├── Role-based access
│       └── Session cleanup
│
└── logs/                   Application Logs
    ├── api/                API request logs
    ├── auth/               Authentication logs
    ├── errors/             Error logs
    └── system/             System events
```

---

## 🔧 Core Systems

### 1. Express Configuration

**Middleware Stack:**
```typescript
// JSON parsing
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  // Log all API requests
});

// Authentication
app.use((req, res, next) => {
  // Extract and verify token
  // Attach user to request
});

// Error handling
app.use((err, req, res, next) => {
  // Global error handler
});
```

### 2. Routing System

**Route Organization:**
- All routes in single `routes.ts` file
- Organized by feature/domain
- RESTful conventions
- Consistent naming
- Proper HTTP methods

**Example Route:**
```typescript
app.get('/api/products', async (req, res) => {
  const products = await storage.getProducts();
  res.json(products);
});
```

### 3. Storage Layer (Database Abstraction)

**Pattern:**
```typescript
// storage.ts provides all database operations
// Routes call storage methods
// Storage uses Drizzle ORM

class Storage {
  async getProduct(id: number) { ... }
  async createProduct(data: InsertProduct) { ... }
  async updateProduct(id: number, data: InsertProduct) { ... }
  async deleteProduct(id: number) { ... }
}
```

**Benefits:**
- Separation of concerns
- Easy testing
- Database agnostic
- Reusable queries
- Consistent error handling

### 4. Authentication System

**Token-Based Authentication:**
```typescript
// Generate token on login
const token = authManager.generateToken({
  userId: user.id,
  sessionId: session.id,
  role: user.role
});

// Verify token on protected routes
const decoded = authManager.verifyToken(token);
```

**Session Management:**
- PostgreSQL session store
- Automatic cleanup (30 min inactive)
- Secure session tokens
- User role tracking

### 5. Logging System

**Professional Logger (284 lines):**
- Structured logging
- Multiple log levels (INFO, WARN, ERROR, DEBUG)
- Request/response tracking
- Performance metrics
- Error stack traces
- Categorized logs:
  - API logs
  - Auth logs
  - Error logs
  - System events

**Usage:**
```typescript
logger.info('auth', 'User logged in', { userId });
logger.error('database', 'Query failed', { error });
logger.api('HTTP', 'GET /api/products', { status: 200 });
```

---

## 📊 Database Schema (29 Tables)

### Core Tables
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `users` | User accounts | id, email, role, createdAt |
| `sessions` | Session store | sid, sess, expire |
| `categories` | Product categories | id, name, slug, parentId |
| `products` | Product catalog | id, name, price, stock, categoryId |
| `product_images` | Product images | id, productId, url, sortOrder |

### Commerce Tables
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `cart` | Shopping items | id, userId, productId, quantity |
| `orders` | Order records | id, userId, status, total, createdAt |
| `order_items` | Line items | id, orderId, productId, quantity, price |
| `coupons` | Discount codes | id, code, discountType, discountValue |
| `reviews` | Product reviews | id, productId, userId, rating, content |

### User Tables
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `addresses` | Shipping addresses | id, userId, address, city, zipCode |
| `wishlist` | Favorite products | id, userId, productId |
| `wallets` | User wallets | id, userId, balance, createdAt |
| `wallet_transactions` | Transaction history | id, walletId, amount, type |

### Management Tables
| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `banners` | Homepage banners | id, title, link, isActive, sortOrder |
| `landing_sections` | Landing content | id, section, isVisible, sortOrder |
| `brands` | Brand info | id, name, logo, description |
| `questions` | Q&A system | id, productId, question, answer |
| `notifications` | Notifications | id, userId, message, isRead |

### More Tables
- `shipping_methods`, `payment_methods`, `user_requests`, `admin_logs`, `analytics`, `settings`, and more...

### Relationships
```
Users ──┬─→ Orders ──→ OrderItems ──→ Products
        ├─→ Wishlist ──→ Products
        ├─→ Addresses
        ├─→ Cart ──→ Products
        ├─→ Reviews ──→ Products
        ├─→ Wallets ──→ WalletTransactions
        └─→ Questions ──→ Products
```

---

## 🛣️ API Endpoints

### Authentication (4 endpoints)
```
POST   /api/auth/replit-login      Login via Replit
POST   /api/auth/logout            Logout
GET    /api/auth/me                Current user
POST   /api/auth/verify-token      Verify token
```

### Products (12+ endpoints)
```
GET    /api/products               List all products
GET    /api/products/:id           Product details
GET    /api/products/search        Search products
GET    /api/products/category/:id  Products by category
POST   /api/products              Create product (admin)
PUT    /api/products/:id          Update product (admin)
DELETE /api/products/:id          Delete product (admin)
GET    /api/products/:id/reviews  Product reviews
POST   /api/products/:id/reviews  Add review
```

### Orders (10+ endpoints)
```
GET    /api/orders                List user orders
GET    /api/orders/:id            Order details
POST   /api/orders                Create order
PUT    /api/orders/:id            Update order
DELETE /api/orders/:id            Cancel order
POST   /api/orders/:id/payment    Process payment
PUT    /api/orders/:id/status     Update status (admin)
GET    /api/orders/:id/invoice    Invoice PDF
GET    /api/orders/:id/tracking   Tracking info
```

### Cart (6 endpoints)
```
GET    /api/cart                  Get cart
POST   /api/cart                  Add item
PUT    /api/cart/:id              Update quantity
DELETE /api/cart/:id              Remove item
POST   /api/cart/checkout         Start checkout
```

### Users (8+ endpoints)
```
GET    /api/users/me              Current user
PUT    /api/users/me              Update profile
GET    /api/users/addresses       User addresses
POST   /api/users/addresses       Add address
DELETE /api/users/addresses/:id   Delete address
GET    /api/users/wishlist        Wishlist
POST   /api/users/wishlist        Add to wishlist
DELETE /api/users/wishlist/:id    Remove from wishlist
```

### Admin (50+ endpoints)
```
GET    /api/admin/dashboard       Dashboard data
GET    /api/admin/analytics       Analytics
POST   /api/admin/products        Create product
PUT    /api/admin/products/:id    Update product
GET    /api/admin/orders          All orders
POST   /api/admin/users           User management
PUT    /api/admin/settings        Update settings
GET    /api/admin/logs            Activity logs
... (40+ more endpoints)
```

### Public APIs (10+ endpoints)
```
GET    /api/categories            All categories
GET    /api/banners               Homepage banners
GET    /api/settings              App settings
GET    /api/metadata              Meta information
```

---

## 🔐 Authentication & Authorization

### Replit Auth
```typescript
// User logs in with Replit account
// Backend creates session
// Token generated with user ID, session ID, role
// Token sent in Authorization header
```

### Bearer Token
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Role-Based Access
```typescript
// User role: 'user' or 'admin'
// Admin routes check role
// Non-admins get 403 Forbidden

app.post('/api/admin/products', requireAdmin, async (req, res) => {
  // Only admins can access
});
```

### Protected Routes
```typescript
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.slice(7);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  // Verify token
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
}
```

---

## 📤 File Upload

### Image Upload Flow
```
1. Client sends file via FormData
2. Multer receives file
3. Sharp processes/optimizes image
4. Save to /dist/uploads/
5. Return URL to client
6. Store URL in database
```

### Upload Endpoint
```typescript
POST /api/upload
- Max file size: 5MB
- Allowed formats: JPEG, PNG, WebP, GIF
- Returns: { success: true, imageUrl: '...' }
```

---

## ⚡ Performance Optimization

### Database Optimization
- Indexes on frequently queried columns
- Connection pooling (Neon)
- Query optimization
- Lazy loading relations
- Pagination (default 20 items/page)

### API Optimization
- Response compression
- Caching headers
- Minimal data transfer
- Batch operations where possible

### Logging Impact
- Asynchronous logging
- Batched writes to disk
- Log rotation (prevent disk bloat)

---

## 🐛 Error Handling

### Error Types
```typescript
// 400 Bad Request - Invalid input
// 401 Unauthorized - Missing/invalid token
// 403 Forbidden - Insufficient permissions
// 404 Not Found - Resource not found
// 500 Internal Server Error - Server error
```

### Error Response
```json
{
  "message": "Product not found",
  "statusCode": 404,
  "timestamp": "2025-12-01T10:30:00Z"
}
```

### Try-Catch Pattern
```typescript
try {
  const result = await storage.getProduct(id);
  res.json(result);
} catch (error) {
  logger.error('products', 'Failed to get product', { error });
  res.status(500).json({ message: 'Internal server error' });
}
```

---

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```
DATABASE_URL=postgresql://...
SESSION_SECRET=...
NODE_ENV=production
PORT=5000
```

### Health Checks
```
GET /api/health           ← Health check endpoint
```

---

## 📚 Development Workflow

### Starting Development Server
```bash
npm run dev
```
- Watches for file changes
- Auto-restart on change
- Connect on `http://localhost:5000`

### Building
```bash
npm run build
```
- Compiles TypeScript
- Bundles with esbuild
- Output: `/dist/index.cjs`

### Type Checking
```bash
npm run check
```
- Validates TypeScript
- Checks for errors

---

**Backend Documentation Version:** 3.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready
