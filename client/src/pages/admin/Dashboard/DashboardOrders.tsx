import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@shared/schema";
import { ORDER_STATUS_LABELS } from "./types";

interface DashboardOrdersProps {
  orders: Order[] | undefined;
  isLoading: boolean;
  formatPrice: (price: number | string) => string;
}

export function DashboardOrders({
  orders,
  isLoading,
  formatPrice,
}: DashboardOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>آخرین سفارشات</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders">مشاهده همه</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
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
                      {ORDER_STATUS_LABELS[order.status] || order.status}
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
  );
}
