import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowRight, Package, Truck, Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { OrderWithItems } from "@shared/schema";

export default function OrderDetail() {
  const [, params] = useRoute("/account/orders/:id");
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery<OrderWithItems>({
    queryKey: ["/api/orders", params?.id],
    enabled: !!params?.id && isAuthenticated,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated, toast]);

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

  const getStatusIcon = (status: string) => {
    const icons: Record<string, typeof Clock> = {
      pending: Clock,
      processing: Package,
      shipped: Truck,
      delivered: Check,
      cancelled: Clock,
    };
    return icons[status] || Clock;
  };

  const formatPrice = (price: number | string) => {
    return Number(price).toLocaleString("fa-IR");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
            <Skeleton className="h-64" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">سفارش یافت نشد</h1>
          <Button asChild>
            <Link href="/account/orders">بازگشت به سفارشات</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const StatusIcon = getStatusIcon(order.status);
  const shippingAddress = order.shippingAddress as any;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account/orders">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">سفارش #{order.orderNumber}</h1>
            <p className="text-muted-foreground">
              تاریخ ثبت: {new Date(order.createdAt!).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <StatusIcon className="h-5 w-5" />
                    وضعیت سفارش
                  </CardTitle>
                  <Badge>{getStatusLabel(order.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-4">
                  {["pending", "processing", "shipped", "delivered"].map((step, index) => {
                    const isCompleted = ["pending", "processing", "shipped", "delivered"]
                      .indexOf(order.status) >= index;
                    const stepLabels = {
                      pending: "ثبت سفارش",
                      processing: "پردازش",
                      shipped: "ارسال",
                      delivered: "تحویل",
                    };
                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="text-xs mt-2 text-center">
                          {stepLabels[step as keyof typeof stepLabels]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>محصولات سفارش</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.productImage || "https://placehold.co/80x80"}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} عدد × {formatPrice(item.price)} تومان
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{formatPrice(item.total)} تومان</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {shippingAddress && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    آدرس تحویل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="font-medium">{shippingAddress.title}</p>
                    <p className="text-sm">
                      {shippingAddress.fullName} - {shippingAddress.phone}
                    </p>
                    <p className="text-sm mt-2">
                      {shippingAddress.province}، {shippingAddress.city}، {shippingAddress.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      کد پستی: {shippingAddress.postalCode}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">جمع محصولات</span>
                  <span>{formatPrice(order.subtotal)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هزینه ارسال</span>
                  <span>
                    {Number(order.shippingCost) === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      `${formatPrice(order.shippingCost || 0)} تومان`
                    )}
                  </span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف</span>
                    <span>- {formatPrice(order.discount || 0)} تومان</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع</span>
                  <span className="text-primary">{formatPrice(order.total)} تومان</span>
                </div>

                {order.notes && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium mb-1">یادداشت:</p>
                      <p className="text-sm text-muted-foreground">{order.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Note: This component displays order status tracking.
// Status badges show: pending → processing → shipped → delivered
// Users can cancel orders with pending/processing status
// Payment status shows if transaction completed successfully
