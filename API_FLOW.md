# 🔄 جریان API - تمام Flows

## 1. Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. User clicks "Login with Replit"
       ▼
┌─────────────────────────┐
│  GET /api/auth/replit   │
└──────┬──────────────────┘
       │ 2. Redirect to Replit OAuth
       ▼
┌─────────────────────────┐
│   Replit OAuth Server   │
└──────┬──────────────────┘
       │ 3. User authorizes
       ▼
┌──────────────────────────────────┐
│  GET /api/auth/callback?code=xxx │
└──────┬───────────────────────────┘
       │ 4. Exchange code for user
       ▼
┌──────────────────────────────┐
│  Database (Create/Update)    │
└──────┬───────────────────────┘
       │ 5. Create JWT token
       ▼
┌────────────────────────────┐
│  Return { user, token }    │
└──────┬─────────────────────┘
       │ 6. Store in localStorage
       ▼
┌──────────────┐
│ Authenticated│
└──────────────┘
```

## 2. Product Search Flow

```
Search Input
    │
    ▼
/api/search?q=xyz
    │
    ├─→ Full-text search in DB
    ├─→ Filter by category/price
    └─→ Sort by relevance
    │
    ▼
Results Array
    │
    ▼
Cache (1 hour)
    │
    ▼
UI Renders
```

## 3. Shopping Flow

```
┌────────────────┐
│ Browse Products│
└────────┬───────┘
         │
         ▼
    ┌─────────┐
    │Add Cart │ → POST /api/cart
    └────┬────┘
         │
         ▼
    ┌──────────────┐
    │View Cart     │ → GET /api/cart
    └────┬─────────┘
         │
         ▼
    ┌──────────────┐
    │Checkout      │ → POST /api/orders
    │- Select addr │
    │- Select ship │
    └────┬─────────┘
         │
         ▼
    ┌──────────────┐
    │Payment Page  │
    │(Zarinpal)    │
    └────┬─────────┘
         │
         ▼
    ┌──────────────────────────┐
    │Verify Payment            │
    │POST /api/payments/verify │
    └────┬─────────────────────┘
         │
         ▼
    ┌─────────────────┐
    │Order Confirmed  │
    │Update Order Qty │
    └─────────────────┘
```

## 4. Admin Dashboard Flow

```
Login (Admin)
    │
    ├─→ Authorization Check (role === 'admin')
    │
    ▼
Dashboard Page
    │
    ├─→ GET /api/admin/dashboard
    │   ├─→ Stats calculation
    │   ├─→ Charts data
    │   └─→ Recent orders
    │
    ├─→ Parallel Requests:
    │   ├─→ GET /api/admin/users
    │   ├─→ GET /api/admin/orders
    │   └─→ GET /api/admin/products
    │
    ▼
Cache + Display
```

## 5. Review Submission Flow

```
User Views Product
    │
    ▼
Click "Write Review"
    │
    ▼
Form Opens
├─→ Rating (1-5)
├─→ Title
└─→ Content
    │
    ▼
POST /api/products/:id/reviews
    │
    ├─→ Validate (Zod Schema)
    ├─→ Check Purchase (authorized)
    ├─→ Save to DB
    └─→ Update Product Rating
    │
    ▼
Invalidate Cache
    │
    ▼
Show "Review Published"
    │
    ▼
Refresh Page
```

## 6. Payment Flow (Zarinpal)

```
Order Ready
    │
    ▼
Calculate Amount
    │
    ▼
POST /api/payments/create
    │
    ├─→ Call Zarinpal API
    └─→ Get Authority
    │
    ▼
Redirect to Zarinpal
    │
    ▼
User Enters Card
    │
    ├─→ Verify Payment
    └─→ Get Ref ID
    │
    ▼
Redirect to /callback
    │
    ├─→ POST /api/payments/verify
    ├─→ Check Status
    ├─→ Update Order (paid)
    └─→ Log Transaction
    │
    ▼
Confirmation Page
```

## 7. Real-time Updates (WebSocket)

```
Client Connects
    │
    ▼
WS /socket
    │
    ├─→ Subscribe to:
    │   ├─→ Order Updates
    │   ├─→ Stock Changes
    │   └─→ Notifications
    │
    ▼
Server Broadcasts
    │
    ├─→ New Order → Notify Admin
    ├─→ Stock Low → Notify All
    └─→ Price Change → Notify Watching
    │
    ▼
Client Updates UI
```

## 8. Image Upload Flow

```
Select Image
    │
    ▼
POST /api/products/:id/upload
    │
    ├─→ Validate (size, type)
    ├─→ Upload to Storage
    ├─→ Compress with Sharp
    ├─→ Generate Thumbnail
    └─→ Save URL to DB
    │
    ▼
Progress Bar Update
    │
    ▼
Show Preview
```

## 9. Cache Invalidation

```
User Updates Product
    │
    ▼
PATCH /api/products/:id
    │
    ├─→ Update DB
    └─→ Invalidate Cache Keys:
        ├─→ ['/api/products']
        ├─→ ['/api/products', id]
        └─→ ['/api/search']
    │
    ▼
TanStack Query Refetch
    │
    ▼
UI Updates
```

## 10. Error Handling Flow

```
API Request
    │
    ├─→ Success? → Return Data
    │
    ├─→ 400 (Bad Request)
    │   └─→ Show Validation Errors
    │
    ├─→ 401 (Unauthorized)
    │   └─→ Redirect to Login
    │
    ├─→ 403 (Forbidden)
    │   └─→ Show 403 Page
    │
    ├─→ 404 (Not Found)
    │   └─→ Show Not Found
    │
    └─→ 500 (Server Error)
        ├─→ Log to Sentry
        ├─→ Log to /logs/errors
        └─→ Show Generic Error
```

---

**محدثه:** 1 دسامبر 2025
