# 🔐 احراز هویت

## Replit OAuth

```typescript
// server/routes.ts
app.get('/api/auth/replit', async (req, res) => {
  const { code } = req.query;
  const user = await getReplicUser(code as string);
  
  const dbUser = await storage.findOrCreateUser({
    email: user.email,
    firstName: user.name,
    profileImageUrl: user.avatar
  });
  
  const token = generateJWT({ userId: dbUser.id });
  res.json({ user: dbUser, token });
});
```

## JWT Token

```typescript
// صدور
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// تأیید
try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = payload;
} catch {
  return res.status(401).json({ error: 'Invalid token' });
}
```

## Password Hashing

```typescript
import bcrypt from 'bcrypt';

// هش کردن
const hash = await bcrypt.hash(password, 10);

// تأیید
const match = await bcrypt.compare(password, hash);
if (!match) throw new Error('Invalid password');
```

## Session Management

```typescript
// Express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  }
}));
```

## Authorization

```typescript
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// استفاده
app.delete('/api/products/:id', requireAuth, requireAdmin, (req, res) => {
  // فقط admin می‌تواند حذف کند
});
```

---

**محدثه:** 1 دسامبر 2025
