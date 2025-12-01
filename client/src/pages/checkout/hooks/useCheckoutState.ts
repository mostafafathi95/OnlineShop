import { useState } from "react";
import type { Coupon } from "@shared/schema";
import type { NewAddressForm } from "../types";
import { INITIAL_ADDRESS_FORM } from "../constants";

export function useCheckoutState() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [paymentGateway, setPaymentGateway] = useState("zarinpal");
  const [notes, setNotes] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [newAddress, setNewAddress] = useState<NewAddressForm>(INITIAL_ADDRESS_FORM);

  const resetAddressForm = () => {
    setNewAddress(INITIAL_ADDRESS_FORM);
    setShowNewAddress(false);
  };

  return {
    currentStep,
    setCurrentStep,
    selectedAddress,
    setSelectedAddress,
    paymentMethod,
    setPaymentMethod,
    paymentGateway,
    setPaymentGateway,
    notes,
    setNotes,
    showNewAddress,
    setShowNewAddress,
    appliedCoupon,
    setAppliedCoupon,
    newAddress,
    setNewAddress,
    couponCode,
    setCouponCode,
    resetAddressForm,
  };
}
