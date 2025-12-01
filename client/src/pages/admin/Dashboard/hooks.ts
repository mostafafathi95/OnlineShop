import { useQuery } from "@tanstack/react-query";
import type { Order, Product } from "@shared/schema";
import type { DashboardStats } from "./types";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";

export function useDashboardData() {
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders", { limit: 5 }],
  });

  const { data: lowStockProducts } = useQuery<Product[]>({
    queryKey: ["/api/admin/products", { lowStock: true, limit: 5 }],
  });

  return {
    stats,
    recentOrders,
    lowStockProducts,
    statsLoading,
    ordersLoading,
  };
}

export function useFormatPrice() {
  return (price: number | string) => Number(price).toLocaleString("fa-IR");
}

export function useStatCards(stats: DashboardStats | undefined) {
  const formatPrice = useFormatPrice();

  return [
    {
      title: "کل محصولات",
      value: stats?.totalProducts || 0,
      icon: Package,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "کل سفارشات",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "کاربران",
      value: stats?.totalUsers || 0,
      icon: Users,
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "درآمد کل",
      value: `${formatPrice(stats?.totalRevenue || 0)} تومان`,
      icon: TrendingUp,
      trend: "+15%",
      trendUp: true,
    },
  ];
}
