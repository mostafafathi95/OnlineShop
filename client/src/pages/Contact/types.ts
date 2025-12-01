import type { LucideIcon } from "lucide-react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}

export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: Phone,
    title: "تلفن",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    description: "شنبه تا پنجشنبه ۹ تا ۱۸",
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "info@shop.com",
    description: "پاسخگویی در کمتر از ۲۴ ساعت",
  },
  {
    icon: MapPin,
    title: "آدرس",
    value: "تهران، خیابان ولیعصر",
    description: "پلاک ۱۲۳، طبقه ۵",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "۹ صبح تا ۶ عصر",
    description: "شنبه تا پنجشنبه",
  },
];
