# 🧪 راهنمای تست

## مرجع سریع

```bash
npm run test              # اجرای تمام tests
npm run test -- --watch  # Watch mode
npm run test -- --coverage  # Coverage report
```

## واحد Tests (Unit)

### مثال 1: Function Test

```typescript
// lib/math.ts
export const add = (a: number, b: number): number => a + b;

// __tests__/math.test.ts
describe('Math Functions', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
```

### مثال 2: Component Test

```typescript
// ProductCard.test.tsx
describe('ProductCard', () => {
  it('should render product name', () => {
    const product = { id: 1, name: 'Test Product', price: 100 };
    const { getByText } = render(<ProductCard product={product} />);
    
    expect(getByText('Test Product')).toBeInTheDocument();
  });

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <ProductCard product={{ id: 1, name: 'Test' }} onSelect={onSelect} />
    );
    
    fireEvent.click(getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
```

### مثال 3: Hook Test

```typescript
// __tests__/useCounter.test.ts
describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Integration Tests

```typescript
describe('Product API Integration', () => {
  it('should fetch and display products', async () => {
    const { getByText } = render(<ProductList />);
    
    await waitFor(() => {
      expect(getByText('Product 1')).toBeInTheDocument();
    });
  });

  it('should handle API errors', async () => {
    mock.onGet('/api/products').reply(500);
    
    const { getByText } = render(<ProductList />);
    
    await waitFor(() => {
      expect(getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

## E2E Tests (Cypress)

### cypress/e2e/shopping.cy.ts

```typescript
describe('Shopping Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000');
  });

  it('should complete purchase', () => {
    // نمایش محصولات
    cy.contains('Products').click();
    cy.get('[data-testid="product-item"]').first().click();

    // اضافه به سبد
    cy.contains('Add to Cart').click();
    cy.contains('Added to cart').should('be.visible');

    // رفتن به سبد
    cy.visit('http://localhost:5000/cart');
    cy.contains('Checkout').click();

    // تکمیل سفارش
    cy.get('input[name="email"]').type('test@example.com');
    cy.contains('Complete Order').click();

    // تأیید موفقیت
    cy.contains('Order Confirmed').should('be.visible');
  });
});
```

## Snapshot Testing

```typescript
describe('ProductCard Snapshot', () => {
  it('should match snapshot', () => {
    const product = { id: 1, name: 'Test', price: 100 };
    const { container } = render(<ProductCard product={product} />);
    
    expect(container).toMatchSnapshot();
  });
});
```

## Mock و Spy

```typescript
describe('API Calls', () => {
  it('should fetch user', async () => {
    const mockFetch = jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ id: 1, name: 'Ali' })
      });

    const user = await getUser(1);

    expect(mockFetch).toHaveBeenCalledWith('/api/users/1');
    expect(user.name).toBe('Ali');
    mockFetch.mockRestore();
  });
});
```

## Coverage Goals

```
Statements: > 80%
Branches: > 75%
Functions: > 80%
Lines: > 80%
```

## بهترین عملکردها

1. **نام‌گذاری واضح**
   ```typescript
   // ✅ خوب
   it('should show error message when user not found', () => {})
   
   // ❌ بد
   it('should work', () => {})
   ```

2. **تنها یک assertion اصلی**
   ```typescript
   it('should increment', () => {
     result.increment();
     expect(result.count).toBe(1);
   });
   ```

3. **Arrange-Act-Assert**
   ```typescript
   it('should authenticate user', () => {
     // Arrange
     const user = { email: 'test@test.com', password: 'pass' };
     
     // Act
     const authenticated = auth(user);
     
     // Assert
     expect(authenticated).toBe(true);
   });
   ```

---

**محدثه:** 1 دسامبر 2025
