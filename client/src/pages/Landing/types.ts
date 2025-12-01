import type { LucideIcon } from "lucide-react";
import { Truck, Shield, Clock, CreditCard } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Deal {
  label: string;
  value: string;
  color: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "برای خریدهای بالای ۵۰۰ هزار تومان",
  },
  {
    icon: Shield,
    title: "ضمانت اصالت",
    description: "۱۰۰% تضمین کیفیت کالا",
  },
  {
    icon: Clock,
    title: "پشتیبانی ۲۴/۷",
    description: "همیشه در کنار شما",
  },
  {
    icon: CreditCard,
    title: "درگاه‌های ایمن",
    description: "۶ درگاه پرداخت اصلی",
  },
];

export const DEALS: Deal[] = [
  { label: "تخفیف تابستان", value: "۴۰%", color: "bg-red-500" },
  { label: "خرید ۲ تومان ۱", value: "خرید الکترونیکی", color: "bg-blue-500" },
  { label: "رایگان برای اعضا", value: "ارسال اکسپرس", color: "bg-green-500" },
];
