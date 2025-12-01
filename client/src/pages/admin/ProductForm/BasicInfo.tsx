import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateSlug } from "./hooks";
import type { ProductFormData } from "./types";

interface BasicInfoProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

export function BasicInfo({ formData, onChange }: BasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات اصلی</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">نام محصول *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                onChange({
                  name: e.target.value,
                  slug: formData.slug || generateSlug(e.target.value),
                })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="nameEn">نام انگلیسی</Label>
            <Input
              id="nameEn"
              value={formData.nameEn}
              onChange={(e) => onChange({ nameEn: e.target.value })}
              dir="ltr"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="slug">اسلاگ (URL) *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
            dir="ltr"
            required
          />
        </div>

        <div>
          <Label htmlFor="shortDescription">توضیح کوتاه</Label>
          <Textarea
            id="shortDescription"
            value={formData.shortDescription}
            onChange={(e) => onChange({ shortDescription: e.target.value })}
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="description">توضیحات کامل</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
}
