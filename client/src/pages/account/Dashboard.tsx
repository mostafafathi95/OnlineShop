import { useEffect } from "react";
import { Link } from "wouter";
import { Package, MapPin, User, Settings, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "@shared/schema";

import { Heart, MessageSquare } from "lucide-react";

const menuItems = [
  { icon: Package, title: "سفارشات من", href: "/account/orders", description: "مشاهده و پیگیری سفارشات" },
  { icon: Heart, title: "علاقه‌مندی‌ها", href: "/account/wishlist", description: "محصولات مورد علاقه" },
  { icon: MessageSquare, title: "نظرات من", href: "/account/reviews", description: "نظرات ثبت شده" },
  { icon: MapPin, title: "آدرس‌ها", href: "/account/addresses", description: "مدیریت آدرس‌های تحویل" },
  { icon: User, title: "پروفایل", href: "/account/profile", description: "ویرایش اطلاعات کاربری" },
];

export default function Dashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: recentOrders, isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders", { limit: 3 }],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        description: "برای دسترسی به حساب کاربری ابتدا وارد شوید.",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated, toast]);

  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "در انتظار پرداخت",
      processing: "در حال پردازش",
      shipped: "ارسال شده",
      delivered: "تحویل داده شده",
      cancelled: "لغو شده",
    };
    return labels[status] || status;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.profileImageUrl || undefined} className="object-cover" />
                  <AvatarFallback className="text-xl">
                    {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">
                    سلام {user?.firstName || "کاربر"} عزیز
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>آخرین سفارشات</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/account/orders">
                مشاهده همه
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
            ) : recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/account/orders/${order.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-elevate cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">سفارش #{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt!).toLocaleDateString("fa-IR")}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-primary">
                          {Number(order.total).toLocaleString("fa-IR")} تومان
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getStatusLabel(order.status)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">هنوز سفارشی ثبت نکرده‌اید.</p>
                <Button asChild className="mt-4">
                  <Link href="/products">شروع خرید</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
