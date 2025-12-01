# ♿ قابلیت دسترسی (a11y)

## WCAG 2.1 Standards

### Perceivable
- Image alt text
- Color contrast > 4.5:1
- Captions for videos

### Operable
- Keyboard navigation
- No keyboard traps
- Skip links

### Understandable
- Clear language
- Error messages
- Form labels

### Robust
- Valid HTML
- ARIA labels
- Screen reader support

## بهترین عملکردها

```html
<!-- ✅ Good -->
<img src="product.jpg" alt="Product XYZ">
<button aria-label="Add to cart">Add</button>
<label for="email">Email:</label>
<input id="email" type="email">

<!-- ❌ Bad -->
<img src="product.jpg">
<button>🛒</button>
<input type="email">
```

## Testing

```bash
npm run test:a11y
npm run test:lighthouse
```

---

**محدثه:** 1 دسامبر 2025
