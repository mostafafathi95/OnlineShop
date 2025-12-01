# 💳 یکپارچگی پرداخت

## درگاه‌های ایرانی

### Zarinpal

```typescript
import zarinpal from 'zarinpal-checkout';

const merchant = zarinpal.create({
  merchant: process.env.ZARINPAL_MERCHANT_ID,
  sandbox: process.env.NODE_ENV === 'development'
});

// صدور پرداخت
const { authority } = await merchant.request({
  amount: 1000000, // ریال
  currency: 'IRR',
  description: 'سفارش #123',
  email: 'user@example.com',
  mobile: '09123456789'
});

// تأیید
const { status, ref_id } = await merchant.verify({
  authority,
  amount: 1000000
});
```

### Mellat

```typescript
const mellat = require('payment-mellat');

const payment = new mellat({
  terminalId: process.env.MELLAT_TERMINAL_ID,
  username: process.env.MELLAT_USERNAME,
  password: process.env.MELLAT_PASSWORD
});

// سفارش
const { refId } = await payment.bpPayRequest({
  orderId: '123',
  amount: 1000000,
  callbackUrl: 'https://yoursite.com/callback'
});
```

## Flow سفارش

```
1. کاربر Checkout کنند
2. انتخاب روش پرداخت
3. صدور Payment Token
4. Redirect به درگاه
5. بازگشت با Status
6. تأیید و Save Order
7. ارسال Email تأیید
```

## Webhook Handling

```typescript
app.post('/api/payments/webhook', async (req, res) => {
  const { authority, status } = req.body;
  
  // تأیید پرداخت
  if (status === 'OK') {
    const { ref_id } = await verifyPayment(authority);
    
    // بروزرسانی سفارش
    await storage.updateOrder(orderId, {
      status: 'paid',
      transactionId: ref_id
    });
    
    res.json({ success: true });
  }
});
```

---

**محدثه:** 1 دسامبر 2025
