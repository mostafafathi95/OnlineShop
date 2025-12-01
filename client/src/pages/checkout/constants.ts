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

export const FREE_SHIPPING_THRESHOLD = 500000;
export const STANDARD_SHIPPING_COST = 50000;
