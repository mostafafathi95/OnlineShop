# 🧪 Testing Guide - Quality Assurance

**Persian E-Commerce Platform - Testing Documentation**

---

## 📋 Testing Strategy

### Testing Pyramid

```
        ┌─────┐
        │ E2E │  End-to-end (10%)
        └─────┘
      ┌───────────┐
      │ Component │  Component (30%)
      └───────────┘
   ┌─────────────────┐
   │      Unit       │  Unit Tests (60%)
   └─────────────────┘
```

### Types of Tests

1. **Unit Tests** - Individual functions
2. **Component Tests** - React components
3. **Integration Tests** - Feature flows
4. **E2E Tests** - Full user journeys

---

## ✅ Manual Testing Checklist

### Frontend Testing
- [ ] Components render correctly
- [ ] Forms validate properly
- [ ] API calls work
- [ ] State updates correctly
- [ ] Navigation works
- [ ] Error handling displays
- [ ] Loading states show
- [ ] Responsive on mobile

### Backend Testing
- [ ] Routes respond correctly
- [ ] Validation works
- [ ] Database operations succeed
- [ ] Authentication protects routes
- [ ] Errors return proper codes
- [ ] Pagination works
- [ ] Filtering works
- [ ] Sorting works

---

## 🔍 Type Checking

```bash
npm run check
```

**Fix TypeScript Errors:**
- Read error message
- Go to file indicated
- Fix type issues
- Run check again

---

## 🏗️ Build Testing

```bash
npm run build
npm run start
```

Visit http://localhost:5000 to test

---

## 📊 Performance Testing

### Chrome DevTools (F12)

1. Lighthouse tab
2. Analyze page
3. Check scores (90+):
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Network Performance

- Page load < 2s
- JS bundle < 300KB
- API responses < 200ms

---

## 🔐 Security Testing

### XSS Prevention
```
Try: <img src=x onerror="alert('XSS')">
Expected: Should NOT trigger alert
```

### CSRF Protection
- Token validation on forms
- Correct headers

---

## 🐛 Bug Reporting Template

```
Title: [Bug] Short description

Steps to Reproduce:
1. Action 1
2. Action 2
3. Action 3

Expected: Should happen X
Actual: Happens Y instead

Environment: OS, Browser, Version

Logs: (Console error)
```

---

**Testing Guide Version:** 1.0  
**Last Updated:** December 1, 2025
