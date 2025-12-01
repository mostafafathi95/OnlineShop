import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductFormData } from "./types";

interface StatusProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

export function Status({ formData, onChange }: StatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>وضعیت</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="isActive">فعال</Label>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => onChange({ isActive: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="isFeatured">ویژه</Label>
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) => onChange({ isFeatured: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
