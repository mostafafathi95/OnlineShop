import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AdminLayout from "./AdminLayout";
import { ShoppingCart, Users, TrendingUp, Award } from "lucide-react";
import type { Order, User, Product } from "@shared/schema";

export default function AdminReports() {
  const { data: orders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products"],
  });

  const isLoading = ordersLoading || usersLoading || productsLoading;

  // Calculate stats
  const totalOrders = orders?.length || 0;
  const totalUsers = users?.length || 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) || 0;
  const totalProducts = products?.length || 0;

  // Chart data
  const orderStatusData = [
    { name: "درانتظار", value: orders?.filter(o => o.status === "pending").length || 0 },
    { name: "درحال پردازش", value: orders?.filter(o => o.status === "processing").length || 0 },
    { name: "ارسال شده", value: orders?.filter(o => o.status === "shipped").length || 0 },
    { name: "تحویل داده شده", value: orders?.filter(o => o.status === "delivered").length || 0 },
  ].filter(d => d.value > 0);

  const COLORS = ["#ff9800", "#2196f3", "#4caf50", "#9c27b0"];

  const stats = [
    { label: "کل سفارشات", value: totalOrders, icon: ShoppingCart, color: "bg-blue-500" },
    { label: "کل کاربران", value: totalUsers, icon: Users, color: "bg-green-500" },
    { label: "درآمد کل", value: `${Number(totalRevenue).toLocaleString("fa-IR")} تومان`, icon: TrendingUp, color: "bg-purple-500" },
    { label: "کل محصولات", value: totalProducts, icon: Award, color: "bg-orange-500" },
  ];

  return (
    <AdminLayout title="گزارشات و آمار">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} data-testid={`stat-card-${i}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>وضعیت سفارشات</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-80" />
              ) : orderStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">هیچ داده‌ای موجود نیست</p>
              )}
            </CardContent>
          </Card>

          {/* Monthly Stats */}
          <Card>
            <CardHeader>
              <CardTitle>آمار سفارشات</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-80" />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>میانگین سفارش</span>
                    <span className="font-bold">{totalOrders > 0 ? `${Math.round(totalRevenue / totalOrders).toLocaleString("fa-IR")}` : "0"} تومان</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>سفارشات تحویل شده</span>
                    <span className="font-bold">{orders?.filter(o => o.status === "delivered").length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>سفارشات درانتظار</span>
                    <span className="font-bold">{orders?.filter(o => o.status === "pending").length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <span>میانگین کاربر برای سفارش</span>
                    <span className="font-bold">{totalUsers > 0 ? `${Math.round(totalOrders / totalUsers * 100) / 100}` : "0"}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>آخرین سفارشات</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-48" />
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {orders?.slice(0, 10).map((order, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-muted rounded text-sm" data-testid={`order-row-${i}`}>
                    <span>{order.orderNumber}</span>
                    <span>{Number(order.total || 0).toLocaleString("fa-IR")} تومان</span>
                    <span className="text-muted-foreground">{order.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
