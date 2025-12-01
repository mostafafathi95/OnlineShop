import { Link } from "wouter";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "./AdminLayout";
import { useQuery } from "@tanstack/react-query";
import type { Order, Product } from "@shared/schema";

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
  }>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders", { limit: 5 }],
  });

  const { data: lowStockProducts } = useQuery<Product[]>({
    queryKey: ["/api/admin/products", { lowStock: true, limit: 5 }],
  });

  const formatPrice = (price: number | string) => {
    return Number(price).toLocaleString("fa-IR");
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "در انتظار",
      processing: "پردازش",
      shipped: "ارسال شده",
      delivered: "تحویل داده شده",
      cancelled: "لغو شده",
    };
    return labels[status] || status;
  };

  const statCards = [
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

  return (
    <AdminLayout title="داشبورد">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))
            : statCards.map((stat, index) => (
                <Card key={index} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          stat.trendUp
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        <stat.icon
                          className={`h-6 w-6 ${
                            stat.trendUp ? "text-green-600" : "text-red-600"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      {stat.trendUp ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600 ml-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600 ml-1" />
                      )}
                      <span
                        className={
                          stat.trendUp ? "text-green-600" : "text-red-600"
                        }
                      >
                        {stat.trend}
                      </span>
                      <span className="text-muted-foreground mr-1">
                        نسبت به ماه قبل
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>آخرین سفارشات</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">مشاهده همه</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12" />
                  ))}
                </div>
              ) : recentOrders && recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <Link key={order.id} href={`/admin/orders/${order.id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate cursor-pointer">
                        <div>
                          <p className="font-medium">#{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt!).toLocaleDateString("fa-IR")}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold">
                            {formatPrice(order.total)} تومان
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  سفارشی ثبت نشده است.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>محصولات کم موجودی</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/products">مشاهده همه</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {lowStockProducts && lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <Link key={product.id} href={`/admin/products/${product.id}`}>
                      <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover-elevate cursor-pointer">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                          <img
                            src={
                              product.image ||
                              "https://placehold.co/48x48/e2e8f0/64748b?text=N"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(product.price)} تومان
                          </p>
                        </div>
                        <Badge
                          variant={product.stock <= 0 ? "destructive" : "secondary"}
                        >
                          {product.stock} عدد
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  همه محصولات موجودی کافی دارند.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
