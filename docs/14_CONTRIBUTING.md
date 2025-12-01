# 🤝 دستورالعمل مشارکت

## خوش آمدید!

ما از تمام مشارکات استقبال می‌کنیم. چه کوچک یا بزرگ!

## شروع شریع

1. **Fork** پروژه
2. **Clone** fork شما
3. ایجاد **Branch** جدید
4. انجام **تغییرات**
5. **Commit** و **Push**
6. ایجاد **Pull Request**

## جریان کاری تفصیلی

### مرحله 1: Fork

```bash
# روی GitHub:
# - کلیک بر "Fork" در بالای صفحه
```

### مرحله 2: Clone

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce.git
cd ecommerce
git remote add upstream https://github.com/ORIGINAL_OWNER/ecommerce.git
```

### مرحله 3: Branch جدید

```bash
# بروز رسانی با latest
git fetch upstream
git checkout develop
git merge upstream/develop

# ایجاد branch
git checkout -b feature/your-feature-name
```

### مرحله 4: انجام تغییرات

```bash
# ویرایش فایل‌ها
code client/src/pages/YourPage.tsx

# تست محلی
npm run dev
npm run test
```

### مرحله 5: Commit

```bash
# Stage تغییرات
git add .

# Commit با پیام معنی‌خور
git commit -m "feat: اضافه کردن صفحه جدید برای محصولات"
```

### مرحله 6: Push

```bash
git push origin feature/your-feature-name
```

### مرحله 7: Pull Request

1. رفتن به fork شما روی GitHub
2. کلیک بر "New Pull Request"
3. انتخاب branch های مناسب
4. نوشتن توضیحات مفصل
5. Submit

## راهنمای Commit

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Feature جدید
- `fix`: رفع Bug
- `docs`: تغییرات documentation
- `style`: فرمت کد (whitespace, etc)
- `refactor`: کد refactoring
- `perf`: بهینه‌سازی کارایی
- `test`: اضافه کردن tests

### مثال

```
feat(products): اضافه کردن فیلتر قیمت

اضافه کردن قابلیت فیلتر محصولات بر اساس نوسان قیمت.
کاربران می‌توانند حداقل و حداکثر قیمت را انتخاب کنند.

Closes #123
```

## قوانین کدنویسی

### TypeScript

```typescript
// ✅ Good
const getUserProducts = async (userId: string): Promise<Product[]> => {
  const products = await db.query.products
    .findMany({ where: eq(products.userId, userId) });
  return products;
};

// ❌ Bad
const getUser = async (id: any) => {
  let result = db.query.products.findMany();
  return result;
};
```

### React Components

```typescript
// ✅ Good
interface ProductCardProps {
  product: Product;
  onSelect: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  return (
    <Card>
      <h3>{product.name}</h3>
      <Button onClick={() => onSelect(product.id)}>انتخاب</Button>
    </Card>
  );
};

// ❌ Bad
export const ProductCard = (props: any) => {
  return <div>{props.product?.name}</div>;
};
```

## Testing

```bash
# تمام tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

### مثال Test

```typescript
describe('ProductCard', () => {
  it('should render product name', () => {
    const { getByText } = render(
      <ProductCard
        product={{ id: 1, name: 'Test' }}
        onSelect={jest.fn()}
      />
    );
    expect(getByText('Test')).toBeInTheDocument();
  });
});
```

## لیست بررسی PR

- ✅ فایل‌های غیر ضروری حذف شده‌اند
- ✅ Tests pass می‌شود
- ✅ No console errors
- ✅ TypeScript strict mode
- ✅ کد formatted است (Prettier)
- ✅ Documentation بروزرسانی شد
- ✅ Commit message معنی‌خور است

## پاسخ به Comments

1. **احترام** - تمام نظرات مفید هستند
2. **پرسش** - در صورت عدم درک، سؤال کنید
3. **اصلاح** - تغییرات را سریع انجام دهید
4. **بحث** - آرام بحث کنید اگر نظر مختلفی دارید

## دستیاری نیاز دارید؟

- 📧 Email: contact@example.com
- 💬 Discord: [Link to Discord]
- 🐦 Twitter: @yourhandle
- 📚 Wiki: [Link to Wiki]

---

**محدثه:** 1 دسامبر 2025
