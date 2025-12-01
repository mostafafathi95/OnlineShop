# ⏱️ محدودیت نرخ

## IP-based

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## User-based

```typescript
const userLimiter = rateLimit({
  keyGenerator: (req) => req.user?.id || req.ip,
  max: 1000
});
```

## Endpoint-specific

```typescript
const strictLimiter = rateLimit({ max: 5 });

app.post('/api/auth/login', strictLimiter, (req, res) => {
  // Login with 5 requests per 15 min
});
```

## Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1234567890
Retry-After: 3600
```

---

**محدثه:** 1 دسامبر 2025
