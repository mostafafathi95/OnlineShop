import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Category } from "@shared/schema";
import type { ProductFormData } from "./types";

interface CategoryProps {
  formData: ProductFormData;
  categories?: Category[];
  onChange: (data: Partial<ProductFormData>) => void;
}

export function CategorySection({ formData, categories, onChange }: CategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>دسته‌بندی</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>دسته‌بندی</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) => onChange({ categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
