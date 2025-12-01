# 📏 معیارهای کدنویسی

## TypeScript

### Strict Mode

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### قوانین

```typescript
// ✅ بلی
const getName = (user: User | null): string => {
  return user?.name ?? "Unknown";
};

// ❌ نہ
const getName = (user: any) => {
  return user.name;
};
```

## Naming Conventions

```typescript
// Variables & Functions: camelCase
const userName = "Ali";
const getUserEmail = (id: number) => { };

// Classes & Types: PascalCase
class UserService { }
interface UserDTO { }
type ProductStatus = 'active' | 'inactive';

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_TIMEOUT = 5000;

// Private: underscore prefix
private _internalState = {};
```

## React Components

### Functional Components

```typescript
interface ComponentProps {
  title: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export const MyComponent: React.FC<ComponentProps> = ({
  title,
  onAction,
  isLoading = false,
}) => {
  return (
    <div className="component">
      <h1>{title}</h1>
      {isLoading && <Spinner />}
      {onAction && <Button onClick={onAction}>Act</Button>}
    </div>
  );
};
```

### Custom Hooks

```typescript
export const useProductQuery = (id: number) => {
  return useQuery({
    queryKey: ['/api/products', id],
    queryFn: () => fetchProduct(id),
  });
};

// استفاده
const MyComponent = ({ productId }: Props) => {
  const { data: product } = useProductQuery(productId);
  // ...
};
```

## Formatting

### Prettier Config

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### ESLint Config

```javascript
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
```

## File Structure

```
src/
├── pages/          # Pages/Routes
│   ├── Landing.tsx
│   └── ProductDetail.tsx
├── components/     # Reusable Components
│   ├── ProductCard.tsx
│   └── Header.tsx
├── hooks/          # Custom Hooks
│   ├── useProductQuery.ts
│   └── useAuth.ts
├── lib/            # Utilities
│   ├── api.ts
│   └── utils.ts
├── stores/         # State Management
│   └── useAppStore.ts
└── types.ts        # Type Definitions
```

## کدنویسی بهتری

### Comments

```typescript
// ✅ خوب
// چک کنید اگر کاربر admin است
if (user.role === 'admin') {
  // دسترسی دهید
}

// ❌ بد
// Check if admin
if (user.role === 'admin') {
  // give access
}
```

### Error Handling

```typescript
// ✅ خوب
try {
  const user = await fetchUser(id);
  return user;
} catch (error) {
  logger.error('Failed to fetch user', { error, userId: id });
  throw new UserNotFoundError(`User ${id} not found`);
}

// ❌ بد
try {
  return await fetchUser(id);
} catch (e) {
  console.log(e);
}
```

### Null Checks

```typescript
// ✅ خوب
const email = user?.email ?? 'no-email';
const status = order?.status || 'pending';

// ❌ بد
const email = user.email || '';
const status = (order && order.status) ? order.status : 'pending';
```

## Performance

### دی-structure

```typescript
// ✅ خوب
const { name, email } = user;

// ❌ بد
const name = user.name;
const email = user.email;
```

### Array Methods

```typescript
// ✅ خوب
const active = products.filter(p => p.isActive);
const names = users.map(u => u.name);

// ❌ بد
const active = [];
for (let i = 0; i < products.length; i++) {
  if (products[i].isActive) active.push(products[i]);
}
```

---

**محدثه:** 1 دسامبر 2025
