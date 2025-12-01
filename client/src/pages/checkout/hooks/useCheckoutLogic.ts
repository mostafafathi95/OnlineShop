import { useEffect } from "react";
import type { Address } from "@shared/schema";
import type { PriceDetails } from "../types";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from "../constants";

export function useCheckoutLogic(
  addresses: Address[] | undefined,
  selectedAddress: number | null,
  setSelectedAddress: (id: number) => void
) {
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
