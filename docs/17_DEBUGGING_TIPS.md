# 🐛 نکات رفع عیب

## Browser DevTools

### Console

```javascript
// لاگ‌های مختلف
console.log('معلومات عادی');
console.warn('هشدار');
console.error('خطا');
console.table(data);
console.time('name');
// ...
console.timeEnd('name');
```

### Network Tab

```
1. F12 > Network
2. اجرای Action
3. مشاهده Request/Response
4. بررسی Status و Headers
5. دیدن Response Body
```

### React DevTools

```
1. نصب React DevTools extension
2. مشاهده Component tree
3. Inspect props و state
4. اجرای Component methods
```

## Backend Debugging

### VS Code

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "program": "${workspaceFolder}/server/index.ts",
      "runtimeArgs": ["--require", "tsx"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Node Debugger

```bash
# شروع
node --inspect server/index.ts

# مرورگر: chrome://inspect
```

## Logging

### Logger Setup

```typescript
import { logger } from './utils/logger';

// API requests
logger.api('GET /api/products', 200, 45, '192.168.1.1', userId);

// Errors
logger.error('Database query failed', new Error('Connection refused'));

// Debug
logger.debug('Processing order', { orderId: 123 });
```

### لاگ Inspection

```bash
# تمام لاگ‌ها
cat logs/api/*.log | tail -20

# فیلتر کردن
grep "ERROR" logs/errors/*.log

# Real-time
tail -f logs/api/api-2025-12-01.log
```

## Common Issues

### Issue 1: Infinite Loop

```typescript
// ❌ مسئله
useEffect(() => {
  setCount(count + 1);
}, []); // dependency array خالی

// ✅ حل
useEffect(() => {
  setCount(1);
}, []); // run once
```

### Issue 2: Race Condition

```typescript
// ❌ مسئله
let data = null;
fetch('/api/users/1').then(r => data = r);
console.log(data); // null!

// ✅ حل
const data = await fetch('/api/users/1').then(r => r.json());
console.log(data); // has value
```

### Issue 3: Memory Leak

```typescript
// ❌ مسئله
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}, []);

// ✅ حل
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

## Performance Profiling

### React Profiler

```
1. DevTools > Profiler tab
2. شروع record
3. اجرای action
4. توقف record
5. تجزیه‌ و تحلیل timing
```

### Network Performance

```bash
# Load time analysis
curl -w '@curl-format.txt' http://localhost:5000

# Database query timing
npm run db:push -- --trace
```

## Database Debugging

### Query Logging

```typescript
// Turn on logging
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(connection, { logger: true });
```

### Direct SQL

```bash
# Connect to DB
psql $DATABASE_URL

# Query
SELECT * FROM products LIMIT 5;

# Explain plan
EXPLAIN ANALYZE SELECT * FROM products WHERE price > 1000;
```

## ابزارها

| ابزار | استفاده |
|-------|---------|
| **DevTools** | Frontend debugging |
| **Postman** | API testing |
| **Sentry** | Error tracking |
| **DataDog** | Monitoring |
| **LogRocket** | Session replay |

---

**محدثه:** 1 دسامبر 2025
