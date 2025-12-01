import type { Address, Coupon } from "@shared/schema";

export interface NewAddressForm {
  title: string;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
}

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

export interface PriceDetails {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

export interface StepDef {
  id: number;
  name: string;
  icon: any;
}
