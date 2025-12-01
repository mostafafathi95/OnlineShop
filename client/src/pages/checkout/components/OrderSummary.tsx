import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Coupon } from "@shared/schema";
import type { PriceDetails } from "../types";
import { formatPrice } from "../hooks/useCheckoutLogic";

interface OrderSummaryProps {
  items: any[];
  priceDetails: PriceDetails;
  appliedCoupon: Coupon | null;
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  isLoadingCoupon: boolean;
  onApplyCoupon: () => void;
}

export function OrderSummary({
  items,
  priceDetails,
  appliedCoupon,
  couponCode,
  onCouponCodeChange,
  isLoadingCoupon,
  onApplyCoupon,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>خلاصه سفارش</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground truncate max-w-[150px]">
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(Number(item.price) * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">مجموع</span>
            <span>{formatPrice(priceDetails.subtotal)}</span>
          </div>

          {priceDetails.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>تخفیف</span>
              <span>-{formatPrice(priceDetails.discount)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">هزینه ارسال</span>
            <span>{priceDetails.shippingCost > 0 ? formatPrice(priceDetails.shippingCost) : "رایگان"}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ نهایی</span>
          <span>{formatPrice(priceDetails.total)}</span>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="کد تخفیف"
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
            />
            <Button
              onClick={onApplyCoupon}
              disabled={isLoadingCoupon}
              size="sm"
            >
              {isLoadingCoupon ? "..." : "اعمال"}
            </Button>
          </div>

          {appliedCoupon && (
            <Badge className="bg-green-100 text-green-800">
              کوپن {appliedCoupon.code} اعمال شد
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
