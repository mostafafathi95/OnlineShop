# 🏗️ تمام Architecture Diagrams

## 1. Overall System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Internet                              │
└────────────┬──────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                   Cloudflare / CDN                           │
│            (Static Assets, DDoS Protection)                  │
└────────────┬──────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                  Load Balancer (Nginx)                       │
│            (Route traffic, SSL/TLS termination)             │
└────────────┬──────────────────────────────────────────────────┘
             │
        ┌────┴────┬────────┬────────┐
        ▼         ▼        ▼        ▼
    ┌────────────────────────────────────┐
    │   Node.js App Instances (N)        │
    │  ┌──────────────────────────────┐  │
    │  │ Express.js                   │  │
    │  │ - Routes                     │  │
    │  │ - Middleware                 │  │
    │  │ - Validation                 │  │
    │  └──────────────────────────────┘  │
    │  ┌──────────────────────────────┐  │
    │  │ React (Vite)                 │  │
    │  │ - SSR (optional)             │  │
    │  │ - SPA                        │  │
    │  └──────────────────────────────┘  │
    └────────────┬────────────────────────┘
                 │
        ┌────────┴────────┬───────────┐
        ▼                 ▼           ▼
    ┌────────────┐  ┌──────────┐  ┌─────────┐
    │PostgreSQL  │  │Redis     │  │ Storage │
    │Database    │  │Cache     │  │(S3/CDN) │
    │(Neon)      │  │          │  │         │
    └────────────┘  └──────────┘  └─────────┘
        │
        └─────────────────┬──────────┐
                          ▼          ▼
                    ┌──────────┐ ┌──────────┐
                    │Backups   │ │Logs      │
                    │(S3)      │ │(Storage) │
                    └──────────┘ └──────────┘
```

## 2. Frontend Architecture

```
┌────────────────────────────────────────────────────────┐
│              React Application                        │
│                                                        │
│ ┌──────────────────────────────────────────────────┐  │
│ │           App.tsx (Root)                         │  │
│ │     - Routes (Wouter)                            │  │
│ │     - Theme Provider                             │  │
│ │     - Query Provider                             │  │
│ └──────────────────────────────────────────────────┘  │
│                       │                                │
│           ┌───────────┼───────────┐                    │
│           ▼           ▼           ▼                    │
│      ┌─────────┐ ┌──────────┐ ┌──────────┐           │
│      │  Pages  │ │Components│ │  Hooks   │           │
│      │  (27)   │ │  (78)    │ │  (5+)    │           │
│      └─────────┘ └──────────┘ └──────────┘           │
│           │           │           │                   │
│           └───────────┼───────────┘                   │
│                       ▼                                │
│      ┌──────────────────────────────┐                │
│      │   TanStack Query             │                │
│      │ (Server State Management)    │                │
│      │ - useQuery                   │                │
│      │ - useMutation                │                │
│      │ - Cache Management           │                │
│      └──────────────────────────────┘                │
│           │                                           │
│           └───────────┬──────────────┐               │
│                       ▼              ▼               │
│            ┌────────────────┐  ┌───────────┐        │
│            │ Zustand Store  │  │localStorage│        │
│            │(Client State)  │  │(Persistence)        │
│            └────────────────┘  └───────────┘        │
│           │                                          │
│           └──────────┬───────────────┐               │
│                      ▼               ▼               │
│             ┌────────────────┐ ┌──────────────┐    │
│             │   API Calls    │ │   WebSocket  │    │
│             │  (axios/fetch) │ │(Real-time)   │    │
│             └────────────────┘ └──────────────┘    │
└────────────────────────────────────────────────────┘
```

## 3. Backend Architecture

```
┌────────────────────────────────────────────────────┐
│           Express.js Server                       │
│                                                   │
│ ┌──────────────────────────────────────────────┐ │
│ │  Middleware Stack                            │ │
│ │  - Logger                                    │ │
│ │  - CORS                                      │ │
│ │  - Body Parser                               │ │
│ │  - Session                                   │ │
│ │  - Error Handler                             │ │
│ └──────────────────────────────────────────────┘ │
│                       │                           │
│                       ▼                           │
│ ┌──────────────────────────────────────────────┐ │
│ │  Route Handlers (129+)                       │ │
│ │  - Auth Routes                               │ │
│ │  - Product Routes                            │ │
│ │  - Order Routes                              │ │
│ │  - Admin Routes                              │ │
│ │  - User Routes                               │ │
│ └──────────────────────────────────────────────┘ │
│                       │                           │
│                       ▼                           │
│ ┌──────────────────────────────────────────────┐ │
│ │  Validation Layer (Zod)                      │ │
│ │  - Request Body Validation                   │ │
│ │  - Query Validation                          │ │
│ │  - Type Checking                             │ │
│ └──────────────────────────────────────────────┘ │
│                       │                           │
│                       ▼                           │
│ ┌──────────────────────────────────────────────┐ │
│ │  Business Logic Layer                        │ │
│ │  - Storage Interface                         │ │
│ │  - Service Classes                           │ │
│ │  - Utilities                                 │ │
│ └──────────────────────────────────────────────┘ │
│                       │                           │
│                       ▼                           │
│ ┌──────────────────────────────────────────────┐ │
│ │  Data Access Layer (Drizzle ORM)            │ │
│ │  - Database Queries                          │ │
│ │  - Relationships                             │ │
│ │  - Transactions                              │ │
│ └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
         │
         ▼
    PostgreSQL DB
```

## 4. Database Schema Diagram

```
┌─────────────────────────────────────────────────────┐
│                  PostgreSQL Database                │
│                   (29 Tables)                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐         ┌─────────────────────┐ │
│  │   Users      │◄────────┤   Sessions          │ │
│  │ (Auth)       │         │ (Replit)            │ │
│  └──────┬───────┘         └─────────────────────┘ │
│         │                                          │
│    ┌────┼────┬────────┬──────────┬────────────┐   │
│    ▼    ▼    ▼        ▼          ▼            ▼   │
│ ┌───┐┌──┐┌──┐┌──────┐┌─────┐┌─────────────────┐  │
│ │Ads││Or││Re││ Cred ││ Wis ││ Reviews        │  │
│ │drs││de││vi││its   ││ hli││ (Product)      │  │
│ │   ││rs││ew││      ││ st  ││                │  │
│ └───┘└──┘└──┘└──────┘└─────┘└─────────────────┘  │
│    │    │    │        │      │                    │
│    └────┼────┘        │      │                    │
│         │            │      │                    │
│         ▼            ▼      ▼                    │
│    ┌─────────────────────────────────────────┐   │
│    │    Products / Categories / Brands       │   │
│    │    (Core Inventory)                    │   │
│    └─────────────────────────────────────────┘   │
│         │                                        │
│         ▼                                        │
│    ┌──────────────────────────────────────────┐  │
│    │  Admin: Articles, News, Pages, Sliders  │  │
│    │         Banners, Settings, Coupons      │  │
│    └──────────────────────────────────────────┘  │
│                                                   │
│  Indexes:                                         │
│  - Products: category, slug, active              │
│  - Orders: user_id, status, created_at           │
│  - Reviews: product_id, user_id                  │
│  - Search: full-text index                       │
│                                                   │
└─────────────────────────────────────────────────────┘
```

## 5. Data Flow Diagram

```
User Actions
    │
    ├─→ Click/Input
    │
    ▼
React Component
    │
    ├─→ TanStack Query Hook
    │
    ▼
API Request (axios)
    │
    ├─→ HTTP (GET/POST/PATCH/DELETE)
    │
    ▼
Express Route Handler
    │
    ├─→ Validation (Zod)
    ├─→ Authorization (Passport)
    │
    ▼
Business Logic
    │
    ├─→ Storage Method
    │
    ▼
Drizzle ORM Query
    │
    ├─→ PostgreSQL
    │
    ▼
Database Response
    │
    ├─→ JSON Serialization
    │
    ▼
HTTP Response
    │
    ├─→ TanStack Query Cache
    │
    ▼
React State Update
    │
    ▼
UI Re-render
    │
    ▼
User Sees Result
```

## 6. Authentication Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           Authentication Architecture           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Browser                                        │
│  ├─ localStorage (JWT Token)                   │
│  └─ httpOnly Cookie (Session)                  │
│       │                                         │
│       ▼                                         │
│  Request Headers                                │
│  ├─ Authorization: Bearer <token>             │
│  └─ Cookie: session_id                        │
│       │                                         │
│       ▼                                         │
│  Express Middleware                             │
│  ├─ passport.authenticate()                    │
│  ├─ Verify JWT                                 │
│  └─ Check Session                              │
│       │                                         │
│       ▼                                         │
│  User Object (req.user)                        │
│  ├─ id                                         │
│  ├─ role (user|admin)                          │
│  └─ permissions                                │
│       │                                         │
│       ▼                                         │
│  Route Handler                                  │
│  ├─ requireAuth (check logged in)             │
│  ├─ requireAdmin (check role)                  │
│  └─ authorize (check permissions)              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**محدثه:** 1 دسامبر 2025
