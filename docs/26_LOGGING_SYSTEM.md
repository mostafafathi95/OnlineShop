# 📝 سیستم Logging

## Log Levels

```
DEBUG: اطلاعات تفصیلی (development)
INFO: اطلاعات عمومی
WARN: هشدارها
ERROR: خطاها
FATAL: خطاهای حیاتی
```

## Log Structure

```json
{
  "timestamp": "2025-12-01T10:30:00Z",
  "level": "INFO",
  "service": "api",
  "path": "/api/products",
  "method": "GET",
  "statusCode": 200,
  "duration": 45,
  "ip": "192.168.1.1",
  "userId": "uuid",
  "message": "Products fetched"
}
```

## Log Locations

```
/logs/api/             # API requests
/logs/auth/            # Authentication events
/logs/errors/          # Errors and warnings
/logs/system/          # System logs
/logs/debug/           # Debug info
```

## استفاده

```typescript
import { logger } from '@/utils/logger';

// API
logger.api('GET /api/products', 200, 45, '192.168.1.1', userId);

// Auth
logger.auth('User login', userId);

// Error
logger.error('Database error', error);

// Debug
logger.debug('Processing data', { data });
```

---

**محدثه:** 1 دسامبر 2025
