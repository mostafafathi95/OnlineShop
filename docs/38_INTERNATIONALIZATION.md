# 🌍 بین‌المللی‌سازی (i18n)

## زبان‌های پشتیبانی‌شده

```
- فارسی (fa) - RTL
- انگلیسی (en) - LTR
- عربی (ar) - RTL (آینده)
```

## مثال فایل Translations

```json
// locales/fa.json
{
  "home": {
    "title": "خانه",
    "subtitle": "خوش‌آمدید"
  },
  "products": {
    "title": "محصولات",
    "empty": "محصولی یافت نشد"
  }
}
```

## استفاده در React

```typescript
const { i18n } = useTranslation('common');

<h1>{i18n.t('home.title')}</h1>

// تغییر زبان
i18n.changeLanguage('en');
```

## RTL Support

```css
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

---

**محدثه:** 1 دسامبر 2025
