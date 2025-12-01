import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductFormData } from "./types";

interface PriceStockProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

export function PriceStock({ formData, onChange }: PriceStockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قیمت و موجودی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">قیمت (تومان) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => onChange({ price: e.target.value })}
              dir="ltr"
              required
            />
          </div>
          <div>
            <Label htmlFor="comparePrice">قیمت قبلی (تومان)</Label>
            <Input
              id="comparePrice"
              type="number"
              value={formData.comparePrice}
              onChange={(e) => onChange({ comparePrice: e.target.value })}
              dir="ltr"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="stock">موجودی</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => onChange({ stock: e.target.value })}
              dir="ltr"
            />
          </div>
          <div>
            <Label htmlFor="sku">کد محصول (SKU)</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => onChange({ sku: e.target.value })}
              dir="ltr"
            />
          </div>
          <div>
            <Label htmlFor="weight">وزن (کیلوگرم)</Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => onChange({ weight: e.target.value })}
              dir="ltr"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
