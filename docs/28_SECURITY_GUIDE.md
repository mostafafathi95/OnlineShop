# 🔒 راهنمای امنیت

## اصول اساسی

### 1. HTTPS Only
```typescript
app.use((req, res, next) => {
  if (req.protocol !== 'https') {
    return res.redirect(301, `https://${req.host}${req.url}`);
  }
  next();
});
```

### 2. Input Validation
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const validated = schema.parse(req.body);
```

### 3. SQL Injection Protection
```typescript
// ✅ Drizzle (Safe)
const user = await db.select()
  .from(users)
  .where(eq(users.email, email));
```

### 4. XSS Protection
```typescript
// ✅ React escapes by default
<div>{userInput}</div>

// ❌ Avoid
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

### 5. CSRF Protection
```typescript
app.use(csrf());

// Form میں:
<input type="hidden" name="_csrf" value={csrfToken} />
```

## Best Practices

### Password Security
```typescript
import bcrypt from 'bcrypt';

const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(password, hash);
```

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Helmet.js
```typescript
import helmet from 'helmet';

app.use(helmet());
// Adds:
// - X-Content-Type-Options
// - X-Frame-Options
// - X-XSS-Protection
```

### CORS
```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

---

**محدثه:** 1 دسامبر 2025
