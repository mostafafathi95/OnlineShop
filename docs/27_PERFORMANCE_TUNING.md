# ⚡ بهینه‌سازی کارایی

## Frontend Optimization

### Code Splitting
```typescript
const AdminPanel = lazy(() => import('./admin'));

<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

### Image Optimization
```typescript
<img src={image} alt="desc" loading="lazy" />
// یا
<Image src={image} width={400} height={300} />
```

### Memoization
```typescript
const ProductCard = memo(({ product }) => (
  <Card>{product.name}</Card>
));
```

## Backend Optimization

### Database Indexing
```sql
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_products_category ON products(categoryId);
CREATE INDEX idx_orders_status ON orders(status);
```

### Query Optimization
```typescript
// ❌ بد (N+1)
const orders = await getOrders();
for (const order of orders) {
  order.user = await getUser(order.userId);
}

// ✅ خوب (Join)
const orders = await db.select()
  .from(orders)
  .leftJoin(users, eq(orders.userId, users.id));
```

### Caching
```typescript
const cache = new Map();

app.get('/api/categories', (req, res) => {
  if (cache.has('categories')) {
    return res.json(cache.get('categories'));
  }
  
  const data = getCategories();
  cache.set('categories', data);
  res.json(data);
});
```

## Monitoring

```bash
npm run performance:analyze
npm run bundle:analyze
npm run lighthouse
```

---

**محدثه:** 1 دسامبر 2025
