# 🤝 Contributing Guide

**Persian E-Commerce Platform - Contribution Guidelines**

---

## 📋 Before You Start

1. Read the [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
2. Understand the [Tech Stack](#tech-stack)
3. Setup development environment
4. Read existing code to understand patterns

---

## 🚀 Getting Started

### 1. Setup Development Environment

```bash
# Clone repository
git clone <repo>
cd project

# Install dependencies
npm install

# Setup environment
export DATABASE_URL=your_db_url
export SESSION_SECRET=your_secret

# Run migrations
npm run db:push

# Start development
npm run dev
```

### 2. Create Feature Branch

```bash
# Always create new branch for features
git checkout -b feature/description

# Branch naming: 
# feature/feature-name
# bugfix/bug-name
# docs/documentation-name
# refactor/refactoring-name
```

---

## 💻 Development Workflow

### Code Standards

#### TypeScript
- Enable strict mode
- Use type annotations
- Avoid `any` type
- Export types from shared/schema.ts

```typescript
// Good
function addItem(item: Product): void {
  // ...
}

// Bad
function addItem(item: any) {
  // ...
}
```

#### Components (React)
- Functional components with hooks
- PascalCase for component names
- Props interface for each component
- PropTypes or TypeScript types

```typescript
// Good
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return <div>{product.name}</div>;
}

// Bad
function productCard(props) {
  return <div>{props.product.name}</div>;
}
```

#### Styling
- Use Tailwind CSS utilities
- Custom CSS only if necessary
- Mobile-first responsive design
- Dark mode support

```typescript
// Good
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Bad
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
```

#### API Routes
- RESTful conventions
- Consistent naming
- Proper HTTP methods
- Error handling

```typescript
// Good
GET    /api/products        - List products
GET    /api/products/:id    - Get product
POST   /api/products        - Create (admin)
PUT    /api/products/:id    - Update (admin)
DELETE /api/products/:id    - Delete (admin)

// Bad
GET    /api/getProducts
POST   /api/addProduct
UPDATE /api/changeProduct
```

---

## 🧪 Testing

### Add Test IDs

Add `data-testid` to interactive elements:

```typescript
// Good
<button data-testid="button-submit">Submit</button>
<input data-testid="input-email" />
<div data-testid="text-total-price">{totalPrice}</div>

// Bad
<button>Submit</button>  // Hard to test
<input />               // No identifier
```

### Running Tests

```bash
# Type checking
npm run check

# Build check
npm run build

# Manual testing
npm run dev
# Then visit http://localhost:5000
```

---

## 📝 Commit Messages

Use clear, descriptive commit messages:

```bash
# Format: type(scope): description

# Types: feat, fix, docs, style, refactor, test, chore
git commit -m "feat(products): add product comparison feature"
git commit -m "fix(checkout): resolve payment validation issue"
git commit -m "docs(api): add payment endpoint documentation"
```

---

## 🔀 Pull Request Process

### 1. Commit Your Changes

```bash
git add .
git commit -m "feat: description"
```

### 2. Keep Updated with Main

```bash
git fetch origin
git rebase origin/main
```

### 3. Push Your Branch

```bash
git push origin feature/description
```

### 4. Create Pull Request

- Clear title and description
- Link related issues
- Include screenshot/video if UI change
- Request review from maintainers

### 5. Code Review

- Address feedback promptly
- Request re-review after changes
- Approve and merge when ready

---

## 📚 Documentation

### Add Comments to Complex Code

```typescript
// Good - Explains the "why"
// Calculate discount percentage based on purchase amount
// Tiered pricing: <1M = 0%, 1M-5M = 5%, >5M = 10%
const discountPercentage = amount > 5000000 ? 10 : amount > 1000000 ? 5 : 0;

// Bad - Just repeats code
// Set discount percentage
const discountPercentage = amount > 5000000 ? 10 : amount > 1000000 ? 5 : 0;
```

### Update README files

If you add new features, update relevant README files:

- `PROJECT_DOCUMENTATION.md` - Overview changes
- `client/README.md` - Frontend changes
- `server/README.md` - Backend changes
- Feature-specific README in directory

---

## 🐛 Bug Reporting

Include in bug report:

1. **Description** - What's the bug?
2. **Steps to Reproduce** - How to trigger?
3. **Expected Behavior** - What should happen?
4. **Actual Behavior** - What actually happens?
5. **Screenshots/Video** - Visual evidence
6. **Browser/Environment** - Where it occurs

---

## 🚀 Feature Requests

When proposing new features:

1. **Problem Statement** - What problem does it solve?
2. **Proposed Solution** - How to solve?
3. **Implementation Details** - Technical approach?
4. **Acceptance Criteria** - How to verify?

---

## 🔐 Security Guidelines

1. **Never commit secrets** - Use environment variables
2. **Validate all inputs** - Use Zod schemas
3. **Sanitize outputs** - XSS prevention
4. **Authentication** - Protect admin routes
5. **Authorization** - Check user roles
6. **Dependencies** - Keep updated, check security

```typescript
// Good - Validate input
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const data = schema.parse(req.body);

// Bad - No validation
const { email, password } = req.body;
```

---

## 📊 Performance Considerations

1. **Lazy Load Components** - Load on demand
2. **Optimize Images** - Use Sharp/next-gen formats
3. **Minimize Bundle** - Tree shake unused code
4. **Cache Data** - React Query caching
5. **Database Indexes** - Index frequently queried columns
6. **Pagination** - Don't load all data at once

---

## 🆘 Getting Help

- **Documentation** - Check README files
- **Code Comments** - Look for inline docs
- **Issue Discussions** - Search existing issues
- **Ask Maintainers** - @mention in PR/issue

---

## ✨ Best Practices Checklist

Before submitting PR:

- [ ] Code follows project style guide
- [ ] TypeScript types are correct
- [ ] No console.log() left behind
- [ ] Components have data-testid
- [ ] Comments explain "why" not "what"
- [ ] No hardcoded values (use constants)
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] Mobile responsive
- [ ] Dark mode compatible
- [ ] No breaking changes
- [ ] Tests pass (npm run check)
- [ ] Build succeeds (npm run build)
- [ ] README updated if needed

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI Components](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)

---

**Contributing Guide Version:** 1.0  
**Last Updated:** December 1, 2025  
**Status:** Active

---

**Thank you for contributing!** 🙏
