import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Address } from "@shared/schema";
import { formatPrice } from "../hooks/useCheckoutLogic";

interface ReviewStepProps {
  addresses?: Address[];
  selectedAddress: number | null;
  paymentMethod: "online" | "cod";
  items: any[];
}

export function ReviewStep({
  addresses,
  selectedAddress,
  paymentMethod,
  items,
}: ReviewStepProps) {
  const selectedAddr = addresses?.find((a) => a.id === selectedAddress);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Check className="h-5 w-5" />
          تایید نهایی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">آدرس تحویل</h3>
          {selectedAddr && (
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="font-medium">{selectedAddr.title}</p>
              <p className="text-sm">
                {selectedAddr.fullName} - {selectedAddr.phone}
              </p>
              <p className="text-sm">
                {selectedAddr.province}، {selectedAddr.city}، {selectedAddr.address}
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-medium mb-2">روش پرداخت</h3>
          <div className="p-4 rounded-lg bg-muted/50">
            <p>{paymentMethod === "online" ? "پرداخت آنلاین" : "پرداخت در محل"}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">محصولات</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <img
                  src={item.image || "https://placehold.co/60x60"}
                  alt={item.name}
                  className="w-15 h-15 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} عدد × {formatPrice(Number(item.price))} تومان
                  </p>
                </div>
                <p className="font-semibold">
                  {formatPrice(Number(item.price) * item.quantity)} تومان
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
