# 🔥 طرح دقیق خرد کردن Checkout.tsx

**فایل:** `client/src/pages/Checkout.tsx` (640 خط)  
**تاریخ:** 1 دسامبر 2025  
**وضعیت:** Planning Phase ✅

---

## 📊 تجزیه فایل موجود

### Imports (20 خط)
```typescript
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Check, CreditCard, MapPin, Package, ArrowRight, ArrowLeft, Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { StepProgressIndicator } from "@/components/checkout/StepProgressIndicator";
import { CheckoutStepContent } from "@/components/checkout/CheckoutStepContent";
import type { Address, Coupon } from "@shared/schema";
```

### Constants (13 خط)
```typescript
const steps = [
  { id: 1, name: "آدرس", icon: MapPin },
  { id: 2, name: "پرداخت", icon: CreditCard },
  { id: 3, name: "تایید", icon: Check },
];

const paymentGateways = [
  { id: "zarinpal", name: "زرین‌پال", color: "#28a745" },
  { id: "bank_melli", name: "بانک ملت", color: "#003399" },
  // ... 4 more
];
```

### State Variables (20+ state)
```typescript
const [currentStep, setCurrentStep] = useState(1);
const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
const [paymentMethod, setPaymentMethod] = useState("online");
const [paymentGateway, setPaymentGateway] = useState("zarinpal");
const [notes, setNotes] = useState("");
const [showNewAddress, setShowNewAddress] = useState(false);
const [couponCode, setCouponCode] = useState("");
const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
const [newAddress, setNewAddress] = useState({...});
```

### Queries & Mutations (3 mutations)
```typescript
const { data: addresses } = useQuery<Address[]>({...});
const createAddressMutation = useMutation({...});
const validateCouponMutation = useMutation({...});
const createOrderMutation = useMutation({...});
```

### Effects (2 useEffect)
```typescript
useEffect(() => { /* meta tags */ }, []);
useEffect(() => { /* auth check */ }, [authLoading, isAuthenticated]);
useEffect(() => { /* default address */ }, [addresses, selectedAddress]);
```

### Helper Functions (4 functions)
```typescript
const formatPrice = (price: number) => {...};
const handleNextStep = () => {...};
const handleSubmitOrder = () => {...};
const handleAddAddress = () => {...};
```

### Calculations (3 calculations)
```typescript
const subtotal = getTotal();
const discount = ...; // calculate from coupon
const total = discountedSubtotal + shippingCost;
```

### JSX/Render (500+ خط)
- Address Step UI (150 خط)
- Payment Step UI (100 خط)
- Review Step UI (150 خط)
- Order Summary Sidebar (100 خط)
- Navigation Buttons (30 خط)

---

## ✅ راه‌حل Refactoring

### فایل‌های نهایی (8 فایل):

```
client/src/pages/checkout/
├── Checkout.tsx                  (50 خط - Main Component)
├── constants.ts                  (15 خط - Constants)
├── types.ts                      (25 خط - Types/Interfaces)
├── components/
│   ├── AddressStep.tsx           (120 خط)
│   ├── PaymentStep.tsx           (80 خط)
│   ├── ReviewStep.tsx            (150 خط)
│   └── OrderSummary.tsx          (100 خط)
└── hooks/
    ├── useCheckoutState.ts       (40 خط - State Management)
    ├── useCheckoutMutations.ts   (60 خط - API Calls)
    └── useCheckoutLogic.ts       (50 خط - Business Logic)
```

---

## 🎯 تفصیل هریک فایل

### 1. `client/src/pages/checkout/types.ts` (25 خط)
**مسئولیت:** Type definitions

```typescript
// New Address Form
export interface NewAddressForm {
  title: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

// Checkout State
export interface CheckoutState {
  currentStep: number;
  selectedAddress: number | null;
  paymentMethod: "online" | "cod";
  paymentGateway: string;
  notes: string;
  showNewAddress: boolean;
  couponCode: string;
  appliedCoupon: Coupon | null;
  newAddress: NewAddressForm;
}

// Price Details
export interface PriceDetails {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

// Step Definition
export interface StepDef {
  id: number;
  name: string;
  icon: React.ComponentType;
}
```

**Imports:**
```typescript
import type { Address, Coupon } from "@shared/schema";
import type { IconType } from "react-icons";
```

**Exports:**
```typescript
export type { NewAddressForm, CheckoutState, PriceDetails, StepDef };
```

---

### 2. `client/src/pages/checkout/constants.ts` (15 خط)
**مسئولیت:** Constants فقط

```typescript
import { MapPin, CreditCard, Check } from "lucide-react";
import type { StepDef } from "./types";

export const CHECKOUT_STEPS: StepDef[] = [
  { id: 1, name: "آدرس", icon: MapPin },
  { id: 2, name: "پرداخت", icon: CreditCard },
  { id: 3, name: "تایید", icon: Check },
];

export const PAYMENT_GATEWAYS = [
  { id: "zarinpal", name: "زرین‌پال", color: "#28a745" },
  { id: "bank_melli", name: "بانک ملت", color: "#003399" },
  { id: "parsian", name: "بانک پارسیان", color: "#E32119" },
  { id: "pasargad", name: "بانک پاسارگاد", color: "#003d82" },
  { id: "saman", name: "بانک سامان", color: "#007D7D" },
  { id: "mellat", name: "بانک ملت (درگاه۲)", color: "#0066cc" },
];

export const INITIAL_ADDRESS_FORM = {
  title: "",
  fullName: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
};

export const FREE_SHIPPING_THRESHOLD = 500000; // 500k toman
export const STANDARD_SHIPPING_COST = 50000; // 50k toman
```

**Exports:**
```typescript
export { CHECKOUT_STEPS, PAYMENT_GATEWAYS, INITIAL_ADDRESS_FORM, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST };
```

---

### 3. `client/src/pages/checkout/hooks/useCheckoutState.ts` (40 خط)
**مسئولیت:** State management (useState logic)

```typescript
import { useState } from "react";
import type { Coupon } from "@shared/schema";
import type { CheckoutState, NewAddressForm } from "../types";
import { INITIAL_ADDRESS_FORM } from "../constants";

export function useCheckoutState() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [paymentGateway, setPaymentGateway] = useState("zarinpal");
  const [notes, setNotes] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [newAddress, setNewAddress] = useState<NewAddressForm>(INITIAL_ADDRESS_FORM);

  const resetAddressForm = () => {
    setNewAddress(INITIAL_ADDRESS_FORM);
    setShowNewAddress(false);
  };

  const resetNewAddress = (newAddr: NewAddressForm) => {
    setNewAddress(newAddr);
    setSelectedAddress(newAddr as any); // Will be set to real ID after creation
  };

  return {
    // Current state
    currentStep,
    selectedAddress,
    paymentMethod,
    paymentGateway,
    notes,
    showNewAddress,
    appliedCoupon,
    newAddress,
    
    // Setters
    setCurrentStep,
    setSelectedAddress,
    setPaymentMethod,
    setPaymentGateway,
    setNotes,
    setShowNewAddress,
    setAppliedCoupon,
    setNewAddress,
    
    // Helper methods
    resetAddressForm,
    resetNewAddress,
  };
}
```

**Imports:**
```typescript
import { useState } from "react";
import type { Coupon } from "@shared/schema";
import type { CheckoutState, NewAddressForm } from "../types";
import { INITIAL_ADDRESS_FORM } from "../constants";
```

**Exports:**
```typescript
export { useCheckoutState };
```

---

### 4. `client/src/pages/checkout/hooks/useCheckoutMutations.ts` (60 خط)
**مسئولیت:** API mutations

```typescript
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Coupon } from "@shared/schema";
import type { NewAddressForm } from "../types";

export function useCheckoutMutations() {
  const createAddressMutation = useMutation({
    mutationFn: async (data: NewAddressForm) => {
      return apiRequest("POST", "/api/addresses", data);
    },
  });

  const validateCouponMutation = useMutation({
    mutationFn: async (code: string) => {
      return apiRequest("POST", "/api/coupons/validate", { code });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      addressId: number;
      paymentMethod: string;
      paymentGateway?: string;
      notes: string;
      items: { productId: number; quantity: number }[];
      couponCode?: string;
    }) => {
      return apiRequest("POST", "/api/orders", data);
    },
  });

  const invalidateAddressCache = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
  };

  return {
    createAddressMutation,
    validateCouponMutation,
    createOrderMutation,
    invalidateAddressCache,
  };
}
```

**Imports:**
```typescript
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Coupon } from "@shared/schema";
import type { NewAddressForm } from "../types";
```

**Exports:**
```typescript
export { useCheckoutMutations };
```

---

### 5. `client/src/pages/checkout/hooks/useCheckoutLogic.ts` (50 خط)
**مسئولیت:** Business logic (calculations, validations)

```typescript
import { useEffect } from "react";
import type { Address } from "@shared/schema";
import type { PriceDetails } from "../types";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "../constants";

export function useCheckoutLogic(
  addresses: Address[] | undefined,
  selectedAddress: number | null,
  setSelectedAddress: (id: number) => void
) {
  // Set default address on first load
  useEffect(() => {
    if (addresses?.length && !selectedAddress) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr.id);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);
}

export function calculatePrices(
  subtotal: number,
  appliedCoupon: any | null
): PriceDetails {
  let discount = 0;
  
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = Math.floor((subtotal * Number(appliedCoupon.discountValue)) / 100);
    } else {
      discount = Number(appliedCoupon.discountValue);
    }
  }
  
  const discountedSubtotal = subtotal - discount;
  const shippingCost = discountedSubtotal > FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = discountedSubtotal + shippingCost;
  
  return {
    subtotal,
    discount,
    shippingCost,
    total,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString("fa-IR");
}

export function validateAddressSelection(selectedAddress: number | null, showNewAddress: boolean): boolean {
  return !(!selectedAddress && !showNewAddress);
}

export function validatePaymentSelection(paymentMethod: string, paymentGateway: string): boolean {
  if (paymentMethod === "online") {
    return !!paymentGateway;
  }
  return true;
}

export function buildOrderPayload(
  selectedAddress: number,
  paymentMethod: string,
  paymentGateway: string,
  notes: string,
  items: any[],
  appliedCoupon: any | null
) {
  return {
    addressId: selectedAddress,
    paymentMethod,
    paymentGateway: paymentMethod === "online" ? paymentGateway : undefined,
    notes,
    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    couponCode: appliedCoupon?.code,
  };
}
```

**Imports:**
```typescript
import { useEffect } from "react";
import type { Address } from "@shared/schema";
import type { PriceDetails } from "../types";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "../constants";
```

**Exports:**
```typescript
export { useCheckoutLogic, calculatePrices, formatPrice, validateAddressSelection, validatePaymentSelection, buildOrderPayload };
```

---

### 6. `client/src/pages/checkout/components/AddressStep.tsx` (120 خط)
**مسئولیت:** آدرس انتخاب + فرم

```typescript
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Address } from "@shared/schema";
import type { NewAddressForm } from "../types";

interface AddressStepProps {
  addresses?: Address[];
  selectedAddress: number | null;
  onSelectAddress: (id: number) => void;
  showNewAddress: boolean;
  onShowNewAddress: (show: boolean) => void;
  newAddress: NewAddressForm;
  onNewAddressChange: (address: NewAddressForm) => void;
  isLoading: boolean;
  onAddAddress: () => void;
}

export function AddressStep({
  addresses,
  selectedAddress,
  onSelectAddress,
  showNewAddress,
  onShowNewAddress,
  newAddress,
  onNewAddressChange,
  isLoading,
  onAddAddress,
}: AddressStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>انتخاب آدرس</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Addresses List */}
        {addresses && addresses.length > 0 && !showNewAddress && (
          <RadioGroup
            value={selectedAddress?.toString()}
            onValueChange={(value) => onSelectAddress(parseInt(value))}
          >
            {addresses.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                isSelected={selectedAddress === address.id}
                onSelect={() => onSelectAddress(address.id)}
              />
            ))}
          </RadioGroup>
        )}

        {/* Add New Address Button */}
        {!showNewAddress && (
          <Button
            variant="outline"
            onClick={() => onShowNewAddress(true)}
            className="w-full"
          >
            <Plus className="ml-2 h-4 w-4" />
            افزودن آدرس جدید
          </Button>
        )}

        {/* New Address Form */}
        {showNewAddress && (
          <AddressForm
            address={newAddress}
            onChange={onNewAddressChange}
            isLoading={isLoading}
            onSubmit={onAddAddress}
            onCancel={() => onShowNewAddress(false)}
          />
        )}
      </CardContent>
    </Card>
  );
}

function AddressItem({
  address,
  isSelected,
  onSelect,
}: {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
        isSelected ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
      }`}
      onClick={onSelect}
    >
      <RadioGroupItem value={address.id.toString()} id={`addr-${address.id}`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{address.title}</span>
          {address.isDefault && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              پیش‌فرض
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {address.fullName} - {address.phone}
        </p>
        <p className="text-sm mt-1">
          {address.province}، {address.city}، {address.address}
        </p>
        <p className="text-sm text-muted-foreground">
          کد پستی: {address.postalCode}
        </p>
      </div>
    </div>
  );
}

function AddressForm({
  address,
  onChange,
  isLoading,
  onSubmit,
  onCancel,
}: {
  address: NewAddressForm;
  onChange: (addr: NewAddressForm) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4 p-4 rounded-lg bg-muted/50">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>عنوان آدرس *</Label>
          <Input
            placeholder="مثلا: خانه"
            value={address.title}
            onChange={(e) => onChange({ ...address, title: e.target.value })}
          />
        </div>
        <div>
          <Label>نام و نام خانوادگی *</Label>
          <Input
            value={address.fullName}
            onChange={(e) => onChange({ ...address, fullName: e.target.value })}
          />
        </div>
      </div>
      {/* ... rest of form fields */}
      <div className="flex gap-2">
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "در حال ذخیره..." : "ذخیره آدرس"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          انصراف
        </Button>
      </div>
    </div>
  );
}
```

---

### 7. `client/src/pages/checkout/components/PaymentStep.tsx` (80 خط)
**مسئولیت:** روش پرداخت انتخاب

```typescript
import { CreditCard, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PAYMENT_GATEWAYS } from "../constants";

interface PaymentStepProps {
  paymentMethod: "online" | "cod";
  onPaymentMethodChange: (method: "online" | "cod") => void;
  paymentGateway: string;
  onPaymentGatewayChange: (gateway: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function PaymentStep({
  paymentMethod,
  onPaymentMethodChange,
  paymentGateway,
  onPaymentGatewayChange,
  notes,
  onNotesChange,
}: PaymentStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          روش پرداخت
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={(val) => onPaymentMethodChange(val as "online" | "cod")}>
          {/* Online Payment */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
              paymentMethod === "online"
                ? "border-primary bg-primary/5"
                : "border-transparent bg-muted/50"
            }`}
            onClick={() => onPaymentMethodChange("online")}
          >
            <RadioGroupItem value="online" id="online" />
            <div className="flex-1">
              <Label htmlFor="online" className="font-medium cursor-pointer">
                پرداخت آنلاین
              </Label>
              <p className="text-sm text-muted-foreground">درگاه پرداخت اینترنتی</p>
            </div>
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Payment Gateway Selection (if online) */}
          {paymentMethod === "online" && (
            <div className="space-y-2 mt-4">
              <Label>انتخاب درگاه پرداخت</Label>
              <RadioGroup value={paymentGateway} onValueChange={onPaymentGatewayChange}>
                {PAYMENT_GATEWAYS.map((gateway) => (
                  <div key={gateway.id} className="flex items-center gap-2">
                    <RadioGroupItem value={gateway.id} id={`gateway-${gateway.id}`} />
                    <Label htmlFor={`gateway-${gateway.id}`} className="cursor-pointer">
                      {gateway.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Cash on Delivery */}
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer mt-3 ${
              paymentMethod === "cod"
                ? "border-primary bg-primary/5"
                : "border-transparent bg-muted/50"
            }`}
            onClick={() => onPaymentMethodChange("cod")}
          >
            <RadioGroupItem value="cod" id="cod" />
            <div className="flex-1">
              <Label htmlFor="cod" className="font-medium cursor-pointer">
                پرداخت در محل
              </Label>
              <p className="text-sm text-muted-foreground">
                پرداخت هنگام تحویل سفارش
              </p>
            </div>
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
        </RadioGroup>

        {/* Order Notes */}
        <div>
          <Label>یادداشت سفارش (اختیاری)</Label>
          <Textarea
            placeholder="توضیحات یا درخواست خاص..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### 8. `client/src/pages/checkout/components/ReviewStep.tsx` (150 خط)
**مسئولیت:** مرور نهایی

```typescript
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Address } from "@shared/schema";
import { formatPrice } from "../hooks/useCheckoutLogic";

interface ReviewStepProps {
  addresses?: Address[];
  selectedAddress: number | null;
  paymentMethod: "online" | "cod";
  items: any[];
}

export function ReviewStep({
  addresses,
  selectedAddress,
  paymentMethod,
  items,
}: ReviewStepProps) {
  const selectedAddr = addresses?.find((a) => a.id === selectedAddress);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          تایید نهایی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address */}
        <div>
          <h3 className="font-medium mb-2">آدرس تحویل</h3>
          {selectedAddr && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{selectedAddr.title}</p>
              <p className="text-sm">
                {selectedAddr.fullName} - {selectedAddr.phone}
              </p>
              <p className="text-sm">
                {selectedAddr.province}، {selectedAddr.city}، {selectedAddr.address}
              </p>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-medium mb-2">روش پرداخت</h3>
          <div className="p-4 rounded-lg bg-muted/50">
            <p>{paymentMethod === "online" ? "پرداخت آنلاین" : "پرداخت در محل"}</p>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-medium mb-2">محصولات</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <img
                  src={item.image || "https://placehold.co/60x60"}
                  alt={item.name}
                  className="w-15 h-15 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} عدد × {formatPrice(Number(item.price))} تومان
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(Number(item.price) * item.quantity)} تومان
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### 9. `client/src/pages/checkout/components/OrderSummary.tsx` (100 خط)
**مسئولیت:** خلاصه سفارش

```typescript
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Coupon } from "@shared/schema";
import type { PriceDetails } from "../types";
import { formatPrice } from "../hooks/useCheckoutLogic";

interface OrderSummaryProps {
  items: any[];
  priceDetails: PriceDetails;
  appliedCoupon: Coupon | null;
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  isLoadingCoupon: boolean;
  onApplyCoupon: () => void;
}

export function OrderSummary({
  items,
  priceDetails,
  appliedCoupon,
  couponCode,
  onCouponCodeChange,
  isLoadingCoupon,
  onApplyCoupon,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>خلاصه سفارش</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items List */}
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[150px]">
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(Number(item.price) * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Price Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">مجموع</span>
            <span>{formatPrice(priceDetails.subtotal)}</span>
          </div>

          {priceDetails.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>تخفیف</span>
              <span>-{formatPrice(priceDetails.discount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">هزینه ارسال</span>
            <span>{priceDetails.shippingCost > 0 ? formatPrice(priceDetails.shippingCost) : "رایگان"}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ نهایی</span>
          <span>{formatPrice(priceDetails.total)}</span>
        </div>

        {/* Coupon Section */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="کد تخفیف"
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
              onClick={onApplyCoupon}
              disabled={isLoadingCoupon}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoadingCoupon ? "..." : "اعمال"}
            </button>
          </div>

          {appliedCoupon && (
            <Badge variant="success">
              کوپن {appliedCoupon.code} اعمال شد
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

---

### 10. `client/src/pages/checkout/Checkout.tsx` (50 خط - Main)
**مسئولیت:** Coordinator فقط

```typescript
import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "@shared/schema";

import { StepProgressIndicator } from "@/components/checkout/StepProgressIndicator";
import { CheckoutStepContent } from "@/components/checkout/CheckoutStepContent";

import { CHECKOUT_STEPS } from "./constants";
import { useCheckoutState } from "./hooks/useCheckoutState";
import { useCheckoutMutations } from "./hooks/useCheckoutMutations";
import { useCheckoutLogic, calculatePrices, validateAddressSelection, validatePaymentSelection, buildOrderPayload } from "./hooks/useCheckoutLogic";

import { AddressStep } from "./components/AddressStep";
import { PaymentStep } from "./components/PaymentStep";
import { ReviewStep } from "./components/ReviewStep";
import { OrderSummary } from "./components/OrderSummary";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  // State management
  const state = useCheckoutState();
  const mutations = useCheckoutMutations();

  // Queries
  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    enabled: isAuthenticated,
  });

  // Logic
  useCheckoutLogic(addresses, state.selectedAddress, state.setSelectedAddress);

  // Effects
  useEffect(() => {
    document.title = "تسویه حساب | فروشگاه اینترنتی";
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated]);

  // Handlers
  const handleNextStep = () => {
    if (state.currentStep === 1 && !validateAddressSelection(state.selectedAddress, state.showNewAddress)) {
      toast({ title: "آدرس انتخاب نشده", variant: "destructive" });
      return;
    }
    if (state.currentStep < 3) {
      state.setCurrentStep(state.currentStep + 1);
    }
  };

  const handleSubmitOrder = () => {
    if (!state.selectedAddress) {
      toast({ title: "آدرس انتخاب نشده", variant: "destructive" });
      return;
    }

    if (!validatePaymentSelection(state.paymentMethod, state.paymentGateway)) {
      toast({ title: "درگاه پرداخت انتخاب نشده", variant: "destructive" });
      return;
    }

    mutations.createOrderMutation.mutate(buildOrderPayload(
      state.selectedAddress,
      state.paymentMethod,
      state.paymentGateway,
      state.notes,
      items,
      state.appliedCoupon
    ));
  };

  // Calculations
  const prices = calculatePrices(getTotal(), state.appliedCoupon);

  // Empty cart
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">سبد خرید خالی است</h1>
          <Button asChild>
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <StepProgressIndicator
          steps={CHECKOUT_STEPS}
          currentStep={state.currentStep}
          onStepClick={(step) => {
            if (step < state.currentStep) {
              state.setCurrentStep(step);
            }
          }}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutStepContent isActive={state.currentStep === 1}>
              <AddressStep
                addresses={addresses}
                selectedAddress={state.selectedAddress}
                onSelectAddress={state.setSelectedAddress}
                showNewAddress={state.showNewAddress}
                onShowNewAddress={state.setShowNewAddress}
                newAddress={state.newAddress}
                onNewAddressChange={state.setNewAddress}
                isLoading={mutations.createAddressMutation.isPending}
                onAddAddress={() => mutations.createAddressMutation.mutate(state.newAddress)}
              />
            </CheckoutStepContent>

            <CheckoutStepContent isActive={state.currentStep === 2}>
              <PaymentStep
                paymentMethod={state.paymentMethod as "online" | "cod"}
                onPaymentMethodChange={state.setPaymentMethod}
                paymentGateway={state.paymentGateway}
                onPaymentGatewayChange={state.setPaymentGateway}
                notes={state.notes}
                onNotesChange={state.setNotes}
              />
            </CheckoutStepContent>

            <CheckoutStepContent isActive={state.currentStep === 3}>
              <ReviewStep
                addresses={addresses}
                selectedAddress={state.selectedAddress}
                paymentMethod={state.paymentMethod as "online" | "cod"}
                items={items}
              />
            </CheckoutStepContent>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              {state.currentStep > 1 ? (
                <Button variant="outline" onClick={() => state.setCurrentStep(state.currentStep - 1)}>
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  مرحله قبل
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/cart">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    بازگشت
                  </Link>
                </Button>
              )}

              {state.currentStep < 3 ? (
                <Button onClick={handleNextStep}>
                  مرحله بعد
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={mutations.createOrderMutation.isPending}
                  size="lg"
                >
                  {mutations.createOrderMutation.isPending ? "در حال ثبت..." : "ثبت سفارش"}
                </Button>
              )}
            </div>
          </div>

          {/* Summary */}
          <OrderSummary
            items={items}
            priceDetails={prices}
            appliedCoupon={state.appliedCoupon}
            couponCode={state.couponCode}
            onCouponCodeChange={(code) => state.couponCode = code}
            isLoadingCoupon={mutations.validateCouponMutation.isPending}
            onApplyCoupon={() => mutations.validateCouponMutation.mutate(state.couponCode)}
          />
        </div>
      </div>
    </Layout>
  );
}
```

---

## 📋 Task Breakdown

### Task 1: Create folder structure & files
- [ ] Create `client/src/pages/checkout/` directory
- [ ] Create `client/src/pages/checkout/types.ts`
- [ ] Create `client/src/pages/checkout/constants.ts`
- [ ] Create `client/src/pages/checkout/hooks/` directory
- [ ] Create `client/src/pages/checkout/components/` directory

### Task 2: Create type definitions
- [ ] Write `types.ts` (25 خط)
- [ ] Verify all types exported

### Task 3: Create constants
- [ ] Write `constants.ts` (15 خط)
- [ ] Verify constants exported

### Task 4: Create custom hooks
- [ ] Write `hooks/useCheckoutState.ts` (40 خط)
- [ ] Write `hooks/useCheckoutMutations.ts` (60 خط)
- [ ] Write `hooks/useCheckoutLogic.ts` (50 خط)

### Task 5: Create components
- [ ] Write `components/AddressStep.tsx` (120 خط)
- [ ] Write `components/PaymentStep.tsx` (80 خط)
- [ ] Write `components/ReviewStep.tsx` (150 خط)
- [ ] Write `components/OrderSummary.tsx` (100 خط)

### Task 6: Create new main component
- [ ] Write new `Checkout.tsx` (50 خط)

### Task 7: Update imports in App.tsx
- [ ] Change import from `client/src/pages/Checkout` to `client/src/pages/checkout/Checkout`

### Task 8: Test & verification
- [ ] Build project
- [ ] Test checkout flow
- [ ] Verify no runtime errors

---

## 📊 Summary

**Before:** 640 خط monolithic  
**After:** 8 فایل organized (~770 خط total but better organized)

- `types.ts` - 25 خط
- `constants.ts` - 15 خط
- `useCheckoutState.ts` - 40 خط
- `useCheckoutMutations.ts` - 60 خط
- `useCheckoutLogic.ts` - 50 خط
- `AddressStep.tsx` - 120 خط
- `PaymentStep.tsx` - 80 خط
- `ReviewStep.tsx` - 150 خط
- `OrderSummary.tsx` - 100 خط
- `Checkout.tsx` - 50 خط

**Benefits:**
- ✅ Single Responsibility
- ✅ Reusable components
- ✅ Easier testing
- ✅ Easier maintenance
- ✅ Better code organization

---

**STATUS:** ✅ **Plan Ready - Ready for Execution**
