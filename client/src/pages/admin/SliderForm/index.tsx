import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "../AdminLayout";
import { useSliderForm } from "./hooks";
import { SLIDER_TYPES } from "./types";

export default function SliderForm() {
  const [, setLocation] = useLocation();
  const { formData, setFormData, isLoading, isEdit, saveMutation } = useSliderForm();

  if (isLoading) {
    return (
      <AdminLayout title="">
        <Skeleton className="h-96" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEdit ? "ویرایش اسلایدر" : "اسلایدر جدید"}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/admin/sliders")}
          data-testid="button-back"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>
              {isEdit ? "ویرایش اسلایدر" : "اسلایدر جدید"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">عنوان *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="عنوان اسلایدر"
                data-testid="input-title"
              />
            </div>

            <div>
              <Label htmlFor="slug">اسلاگ *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="slider-name"
                data-testid="input-slug"
              />
            </div>

            <div>
              <Label htmlFor="image">لینک تصویر *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                data-testid="input-image"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="mt-4 h-48 w-full object-cover rounded"
                />
              )}
            </div>

            <div>
              <Label htmlFor="link">لینک</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="/products یا https://example.com"
                data-testid="input-link"
              />
            </div>

            <div>
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="توضیحات اسلایدر"
                data-testid="input-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">تاریخ شروع *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                  data-testid="input-startDate"
                />
              </div>
              <div>
                <Label htmlFor="endDate">تاریخ پایان *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  data-testid="input-endDate"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="sortOrder">ترتیب نمایش</Label>
              <Input
                id="sortOrder"
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sortOrder: parseInt(e.target.value),
                  })
                }
                data-testid="input-sortOrder"
              />
            </div>

            <div>
              <Label htmlFor="type">نوع</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                data-testid="select-type"
              >
                {SLIDER_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded">
              <Label htmlFor="isActive">فعال</Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
                data-testid="switch-isActive"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setLocation("/admin/sliders")}
              >
                لغو
              </Button>
              <Button
                onClick={() => saveMutation.mutate(formData)}
                disabled={saveMutation.isPending}
                data-testid="button-save"
              >
                {saveMutation.isPending ? "درحال ذخیره..." : "ذخیره"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
