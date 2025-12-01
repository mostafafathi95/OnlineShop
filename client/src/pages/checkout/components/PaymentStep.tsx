import { CreditCard, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { PAYMENT_GATEWAYS } from "../constants";

interface PaymentStepProps {
  paymentMethod: "online" | "cod";
  onPaymentMethodChange: (method: "online" | "cod") => void;
  paymentGateway: string;
  onPaymentGatewayChange: (gateway: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function PaymentStep({
  paymentMethod,
  onPaymentMethodChange,
  paymentGateway,
  onPaymentGatewayChange,
  notes,
  onNotesChange,
}: PaymentStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          روش پرداخت
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={(val) => onPaymentMethodChange(val as "online" | "cod")}>
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
              paymentMethod === "online" ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
            }`}
            onClick={() => onPaymentMethodChange("online")}
          >
            <RadioGroupItem value="online" id="online" />
            <div className="flex-1">
              <Label htmlFor="online" className="font-medium cursor-pointer">
                پرداخت آنلاین
              </Label>
              <p className="text-sm text-muted-foreground">درگاه پرداخت اینترنتی</p>
            </div>
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>

          {paymentMethod === "online" && (
            <div className="space-y-2 mt-4">
              <Label>انتخاب درگاه پرداخت</Label>
              <RadioGroup value={paymentGateway} onValueChange={onPaymentGatewayChange}>
                {PAYMENT_GATEWAYS.map((gateway) => (
                  <div key={gateway.id} className="flex items-center gap-2">
                    <RadioGroupItem value={gateway.id} id={`gateway-${gateway.id}`} />
                    <Label htmlFor={`gateway-${gateway.id}`} className="cursor-pointer">
                      {gateway.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer mt-3 ${
              paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-transparent bg-muted/50"
            }`}
            onClick={() => onPaymentMethodChange("cod")}
          >
            <RadioGroupItem value="cod" id="cod" />
            <div className="flex-1">
              <Label htmlFor="cod" className="font-medium cursor-pointer">
                پرداخت در محل
              </Label>
              <p className="text-sm text-muted-foreground">پرداخت هنگام تحویل سفارش</p>
            </div>
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
        </RadioGroup>

        <div>
          <Label>یادداشت سفارش (اختیاری)</Label>
          <Textarea
            placeholder="توضیحات یا درخواست خاص..."
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
