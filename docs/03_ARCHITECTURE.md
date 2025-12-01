# 🏗️ معماری سیستم

## معماری کلی

```
┌─────────────────────────────────────────────────────────┐
│          React Frontend (Vite)                          │
│  - 141 Components | 27+ Pages | RTL | Dark Mode        │
└─────────────────────┬───────────────────────────────────┘
                      │ API Calls (TanStack Query)
                      │ WebSocket (Real-time)
                      ▼
┌─────────────────────────────────────────────────────────┐
│         Express.js Backend (Node.js)                    │
│  - 129+ Routes | Type-safe | Logging                   │
│  - Authentication | Payment Integration                 │
└─────────────────────┬───────────────────────────────────┘
                      │ Drizzle ORM
                      │ Zod Validation
                      ▼
┌─────────────────────────────────────────────────────────┐
│       PostgreSQL Database (Neon)                        │
│  - 29 Tables | Relationships | Indexes                 │
│  - Full-text Search | Transactions                     │
└─────────────────────────────────────────────────────────┘
```

## معماری Layered

### 1. Presentation Layer (Frontend)
```
client/src/
├── pages/           # Route pages
│   ├── Landing.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── admin/       # Admin pages
├── components/      # Reusable components
│   ├── products/
│   ├── checkout/
│   ├── cart/
│   ├── common/
│   └── ui/          # Shadcn UI components
├── hooks/           # Custom React hooks
├── stores/          # Zustand state
├── lib/             # Utilities
└── App.tsx          # Main router
```

**مکتبه‌ها:**
- React 18
- TanStack Query (Data fetching)
- Zustand (State management)
- Wouter (Routing)
- Tailwind CSS
- Framer Motion
- React Hook Form

### 2. Application Layer (API)
```
server/
├── routes.ts       # 129+ API endpoints
├── storage.ts      # Database operations
├── db.ts           # Database setup
├── vite.ts         # Vite server
└── utils/
    ├── logger.ts   # Logging system
    ├── advanced-auth.ts
    └── upload.ts   # File uploads
```

**Routing Pattern:**
```
GET    /api/products              # List
POST   /api/products              # Create
GET    /api/products/:id          # Detail
PATCH  /api/products/:id          # Update
DELETE /api/products/:id          # Delete
POST   /api/products/:id/upload   # Files
```

### 3. Data Layer
```
shared/schema.ts
├── Tables (29)
│   ├── users, sessions
│   ├── products, categories
│   ├── orders, order_items
│   ├── reviews, wishlist
│   ├── coupons
│   └── ...
├── Relations
├── Insert Schemas (Zod)
└── Types
```

## Flow معمول درخواست

```
1. User Action (Click, Form Submit)
    ↓
2. React Component (useState, useForm)
    ↓
3. TanStack Query Hook (useQuery/useMutation)
    ↓
4. API Request (GET/POST/PATCH/DELETE)
    ↓
5. Express Route Handler
    ↓
6. Validation (Zod Schema)
    ↓
7. Storage Method (Database Operation)
    ↓
8. Drizzle Query
    ↓
9. PostgreSQL
    ↓
10. Response → TanStack Query → Component → UI Update
```

## Authentication Flow

```
┌─────────────┐
│  Replit     │
│  OAuth      │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ /api/auth/callback   │
│ - Create/Update User │
│ - Create Session     │
│ - Set JWT Token      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ localStorage Token   │
│ Authorization Header │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Protected Routes     │
│ Middleware Verify    │
└──────────────────────┘
```

## Logging Architecture

```
server/utils/logger.ts
├── API Logs       → /logs/api/
├── Auth Logs      → /logs/auth/
├── Error Logs     → /logs/errors/
├── System Logs    → /logs/system/
└── Debug Logs     → /logs/debug/

Each Log Entry:
{
  timestamp: "2025-12-01T10:30:00Z",
  level: "INFO|WARN|ERROR",
  service: "api|auth|db",
  path: "/api/products",
  method: "GET",
  statusCode: 200,
  duration: "45ms",
  userId?: "uuid",
  details: {}
}
```

## Caching Strategy

```
Browser Cache
    ↓
TanStack Query Cache
    ↓
Redis (برای آینده)
    ↓
Database Query
```

**Query Keys:**
```
- ['/api/products']
- ['/api/products', categoryId]
- ['/api/orders', userId]
- ['/api/user/profile']
```

## Deployment Architecture

```
┌──────────────────────────────────────┐
│ Replit (Single Server)               │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ Node.js Process                │  │
│ │ - React SSR (Vite)             │  │
│ │ - Express API                  │  │
│ │ - Drizzle ORM                  │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ PostgreSQL (Neon)              │  │
│ │ - 29 tables                    │  │
│ │ - Backups                      │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ Storage                        │  │
│ │ - File uploads                 │  │
│ │ - Images                       │  │
│ │ - Videos                       │  │
│ └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Error Handling

```
Browser
    ↓
Catch (API error)
    ↓
TanStack Query Error Handler
    ↓
toast.error() Display
    ↓
Log to /logs/errors/
    ↓
Admin Notified
```

**Error Codes:**
```
200-299: Success
300-399: Redirect
400-499: Client Error (validation, auth)
500-599: Server Error (database, logic)
```

---

**محدثه:** 1 دسامبر 2025
