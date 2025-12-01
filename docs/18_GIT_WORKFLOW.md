# 🌳 جریان کاری Git

## Branch Strategy

```
main (production)
  ├── staging (pre-release)
  └── develop (development)
      └── feature/* (new features)
```

## شروع Feature جدید

```bash
# بروزرسانی develop
git checkout develop
git pull origin develop

# ایجاد feature branch
git checkout -b feature/product-filter

# Push to remote
git push -u origin feature/product-filter
```

## Commit Messages

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - Feature جدید
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting
- `refactor` - Code restructure
- `test` - Testing
- `perf` - Performance

### مثال‌ها

```
feat(products): اضافه کردن فیلتر قیمت

امکان فیلتر محصولات بر اساس قیمت اضافه شد.

Closes #456

fix(cart): رفع عیب حذف محصول

کاربران نمی‌توانستند محصول را از سبد حذف کنند.

Closes #123
```

## Pull Requests

### PR Template

```markdown
## توضیح
توصیف مختصر تغییرات

## نوع تغییر
- [ ] Bug fix
- [ ] Feature جدید
- [ ] Breaking change

## چگونه تست کنم؟
مراحل تست...

## Checklist
- [ ] Tests pass
- [ ] Code reviewed
- [ ] Docs updated
```

## Merge Strategies

```bash
# Merge with commit
git merge --no-ff feature/xyz

# Rebase
git rebase develop
git push --force-with-lease

# Squash
git merge --squash feature/xyz
```

## Tags

```bash
# ایجاد tag
git tag -a v1.0.0 -m "Release 1.0.0"

# Push tags
git push origin v1.0.0

# List tags
git tag -l
```

---

**محدثه:** 1 دسامبر 2025
