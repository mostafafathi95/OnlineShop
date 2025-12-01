import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { generateSlug } from "./hooks";
import type { CategoryFormData } from "./types";

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: (data: CategoryFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CategoryForm({ formData, setFormData, onSubmit, isLoading }: CategoryFormProps) {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>نام دسته‌بندی *</Label>
          <Input
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              setFormData({
                ...formData,
                name,
                slug: formData.slug || generateSlug(name),
              });
            }}
          />
        </div>
        <div>
          <Label>نام انگلیسی</Label>
          <Input
            value={formData.nameEn}
            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <Label>اسلاگ (URL) *</Label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          dir="ltr"
        />
      </div>

      <div>
        <Label>توضیحات</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label>لینک تصویر</Label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          dir="ltr"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>ترتیب نمایش</Label>
          <Input
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
            dir="ltr"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label>فعال</Label>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
        {isLoading ? "در حال ذخیره..." : "ذخیره"}
      </Button>
    </div>
  );
}
