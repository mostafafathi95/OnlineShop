/**
 * Centralized admin configuration and constants
 * Single source of truth for status colors, labels, and options
 */

import type { BadgeProps } from "@/components/ui/badge";

export type StatusVariant = BadgeProps["variant"];

export const STATUS_VARIANTS: Record<string, StatusVariant> = {
  // Order statuses
  pending: "secondary",
  processing: "default",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",

  // Payment statuses
  paid: "default",
  failed: "destructive",
  refunded: "secondary",

  // Product statuses
  active: "default",
  inactive: "secondary",
  draft: "secondary",
  archived: "destructive",
};

export const ORDER_STATUS_OPTIONS = [
  { value: "all", label: "همه" },
  { value: "pending", label: "در انتظار" },
  { value: "processing", label: "پردازش" },
  { value: "shipped", label: "ارسال شده" },
  { value: "delivered", label: "تحویل داده شده" },
  { value: "cancelled", label: "لغو شده" },
];

export const PRODUCT_STATUS_OPTIONS = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
  { value: "draft", label: "پیش‌نویس" },
  { value: "archived", label: "آرشیو" },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: "pending", label: "در انتظار" },
  { value: "paid", label: "پرداخت شده" },
  { value: "failed", label: "ناموفق" },
  { value: "refunded", label: "بازپرداخت شده" },
];

export const PAGINATION_LIMIT = 20;
export const DEBOUNCE_DELAY = 300;
export const CACHE_TIME = 1000 * 60 * 5; // 5 minutes
export const STALE_TIME = 1000 * 60 * 2; // 2 minutes
