import type { LucideIcon } from "lucide-react";

export interface StatCard {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  trendUp: boolean;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "در انتظار",
  processing: "پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل داده شده",
  cancelled: "لغو شده",
};
