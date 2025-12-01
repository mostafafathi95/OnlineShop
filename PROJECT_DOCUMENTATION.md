# 🏢 Persian E-Commerce Platform - Comprehensive Documentation

**Version:** 3.0 | **Last Updated:** December 1, 2025 | **Status:** Production-Ready

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Directory Structure](#directory-structure)
5. [Getting Started](#getting-started)
6. [Development Guide](#development-guide)
7. [Database Schema](#database-schema)
8. [API Documentation](#api-documentation)
9. [Deployment](#deployment)

---

## 🎯 Project Overview

### Mission
Build a comprehensive Persian/Farsi e-commerce platform with advanced admin capabilities, multiple Iranian payment gateways, modern UI/UX, and enterprise-grade architecture.

### Key Features
- ✅ Product Catalog (60+ pages, 78+ components)
- ✅ Shopping Cart with real-time updates
- ✅ Multi-step Checkout process
- ✅ 6 Iranian Payment Gateways (Zarinpal, Mellat, Parsian, Pasargad, Saman)
- ✅ User Authentication via Replit
- ✅ Advanced Admin Dashboard (27 features)
- ✅ Order Management System (129+ API routes)
- ✅ Review & Rating System
- ✅ Wishlist & Favorites
- ✅ Coupon & Discount Management
- ✅ Real-time Stock Tracking
- ✅ Product Comparison Tool
- ✅ Video Support (YouTube & MP4)
- ✅ Social Sharing (Telegram, WhatsApp, Email)
- ✅ User Wallet System
- ✅ Credit Points System
- ✅ Q&A Management
- ✅ Brand Management
- ✅ Advanced Shipping Methods

### Statistics
- **Database Tables:** 29
- **API Routes:** 129+
- **Frontend Pages:** 60+
- **React Components:** 78+
- **Custom Hooks:** 8+
- **Zustand Stores:** 3+
- **Lines of Code:** 24,000+

---

## 🏗 Architecture

### High-Level Design
```
┌─────────────────────────────────┐
│   React Frontend (Client)        │
│   ├─ 60+ Pages                  │
│   ├─ 78+ Components             │
│   ├─ Zustand Stores             │
│   └─ React Query Integration    │
└──────────────┬──────────────────┘
               │ HTTP/WebSocket
┌──────────────▼──────────────────┐
│   Express Backend (Server)       │
│   ├─ 129+ API Routes            │
│   ├─ Drizzle ORM Layer          │
│   ├─ Professional Logging       │
│   └─ Authentication Manager     │
└──────────────┬──────────────────┘
               │ SQL Queries
┌──────────────▼──────────────────┐
│   PostgreSQL (Neon)             │
│   ├─ 29 Tables                  │
│   ├─ Relationships              │
│   └─ Indexes & Constraints      │
└─────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18.3.1 + TypeScript
- Vite (Build Tool)
- Tailwind CSS + Shadcn UI
- Framer Motion (Animations)
- Zustand (State Management)
- TanStack Query v5 (Server State)
- React Hook Form (Forms)
- Zod (Validation)

**Backend:**
- Express.js 4.21.2 + TypeScript
- Drizzle ORM 0.39.1
- PostgreSQL (Neon Backend)
- Passport.js (Authentication)
- Professional Logging System
- Multer (File Uploads)
- Sharp (Image Processing)

**Infrastructure:**
- Replit (Development & Deployment)
- Node.js 20+
- npm Package Manager

---

## 📂 Directory Structure

```
project-root/
├── client/                          Frontend Application
│   ├── src/
│   │   ├── pages/                   60+ Page Components
│   │   │   ├── admin/               15+ Admin Pages
│   │   │   ├── account/             8+ Account Pages
│   │   │   ├── auth/                Authentication Pages
│   │   │   └── public/              Public Pages
│   │   ├── components/              78+ Reusable Components
│   │   │   ├── ui/                  25+ Shadcn Components
│   │   │   ├── layout/              5+ Layout Components
│   │   │   ├── forms/               10+ Form Components
│   │   │   ├── products/            Product Components
│   │   │   ├── search/              Search Components
│   │   │   └── landing/             Landing Components
│   │   ├── hooks/                   Custom React Hooks
│   │   ├── lib/                     Utilities & Helpers
│   │   ├── stores/                  Zustand Stores
│   │   └── App.tsx                  Root Component
│   └── public/                      Static Assets
│
├── server/                          Backend Application
│   ├── routes.ts                    129+ API Routes (2267 lines)
│   ├── storage.ts                   Database Layer (1227 lines)
│   ├── index.ts                     Server Entry Point
│   ├── utils/
│   │   ├── logger.ts                Logging System (284 lines)
│   │   └── advanced-auth.ts         Auth Manager (298 lines)
│   └── logs/                        Application Logs
│
├── shared/                          Shared Code
│   └── schema.ts                    Database Schema (658 lines)
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── drizzle.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or bun
- PostgreSQL (Neon)
- Replit Account

### Installation
```bash
# Install dependencies
npm install

# Setup environment
export DATABASE_URL=your_database_url
export SESSION_SECRET=your_secret

# Run migrations
npm run db:push

# Start development
npm run dev

# Build for production
npm run build

# Start production
npm run start
```

---

## 👨‍💻 Development Workflow

### Code Standards
1. **TypeScript:** Strict mode enabled
2. **Components:** Functional with hooks
3. **Styling:** Tailwind CSS utility-first
4. **State:** Zustand for global, React for local
5. **API:** TanStack Query for server state

### Git Workflow
```bash
git checkout -b feature/description
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/description
```

---

## 📊 Database Schema (29 Tables)

### Users & Auth
- **users** - User accounts and profiles
- **sessions** - Express session storage

### Products & Catalog
- **categories** - Product categories
- **products** - Product details
- **product_images** - Product images
- **brands** - Brand information

### Commerce
- **cart** - Shopping cart items
- **orders** - Order records
- **order_items** - Line items
- **coupons** - Discount codes
- **reviews** - Product reviews

### User Data
- **addresses** - Shipping addresses
- **wishlist** - Favorite products
- **wallets** - User wallets
- **wallet_transactions** - Wallet history

### Management
- **banners** - Homepage banners
- **landing_sections** - Landing page sections
- **questions** - Product Q&A
- **notifications** - Notifications
- **user_requests** - Support requests
- **shipping_methods** - Shipping options
- **payment_methods** - Payment options

### Admin
- **admin_logs** - Admin activity logs
- **analytics** - Performance metrics
- **settings** - Platform settings

---

## 📡 Core API Endpoints

### Authentication
- `POST /api/auth/replit-login` - Login via Replit
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Product details
- `GET /api/products/search` - Search
- `POST /api/products` - Create (admin)
- `PUT /api/products/:id` - Update (admin)

### Orders
- `GET /api/orders` - User orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add item
- `DELETE /api/cart/:id` - Remove item

### Admin (Protected)
- `GET /api/admin/dashboard` - Dashboard
- `GET /api/admin/analytics` - Analytics
- `POST /api/admin/*` - CRUD operations

---

## 🚢 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Replit Deployment
- Auto-deployed on push to main
- Built with `npm run build`
- Starts with `npm run start`

---

**Documentation Version:** 3.0  
**Last Updated:** December 1, 2025  
**Status:** Production-Ready  
**License:** MIT
