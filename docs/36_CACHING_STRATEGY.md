# 💾 استراتژی حافظه کش

## Browser Cache

```
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Wed, 01 Dec 2025
```

## Server Cache

```typescript
const cache = new Map();

app.get('/api/categories', (req, res) => {
  const cached = cache.get('categories');
  if (cached && !isExpired(cached.time)) {
    return res.json(cached.data);
  }
  
  const data = getCategories();
  cache.set('categories', { data, time: Date.now() });
  res.json(data);
});
```

## Database Query Cache

```
TanStack Query + 5 minute staleTime
```

## Redis Cache

```typescript
const redis = new Redis();

const getCachedData = async (key) => {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const data = await fetchData();
  await redis.setex(key, 3600, JSON.stringify(data));
  return data;
};
```

---

**محدثه:** 1 دسامبر 2025
