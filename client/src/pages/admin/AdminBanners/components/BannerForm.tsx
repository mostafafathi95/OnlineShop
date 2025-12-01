import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, XIcon, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { InsertBanner } from "@shared/schema";

interface BannerFormProps {
  formData: InsertBanner;
  setFormData: (data: InsertBanner) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
}

export function BannerForm({
  formData,
  setFormData,
  uploading,
  setUploading,
}: BannerFormProps) {
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "حجم فایل بیشتر از 5MB است", variant: "destructive" });
      return;
    }

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ ...formData, imageUrl: data.imageUrl });
        toast({ title: "تصویر با موفقیت آپلود شد ✓" });
      } else {
        toast({ title: "خطا در آپلود تصویر", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "خطای سرور در آپلود", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">عنوان *</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="عنوان بنر"
          data-testid="input-banner-title"
        />
      </div>

      <div>
        <label className="text-sm font-medium">زیرعنوان</label>
        <Input
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({ ...formData, subtitle: e.target.value })
          }
          placeholder="زیرعنوان"
          data-testid="input-banner-subtitle"
        />
      </div>

      <div>
        <label className="text-sm font-medium">متن نشان</label>
        <Input
          value={formData.badgeText}
          onChange={(e) =>
            setFormData({ ...formData, badgeText: e.target.value })
          }
          placeholder="مثال: خرید ۲ تومان ۱"
          data-testid="input-banner-badge"
        />
      </div>

      <div>
        <label className="text-sm font-medium">توضیح</label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="توضیح بنر"
          data-testid="input-banner-description"
        />
      </div>

      <div>
        <label className="text-sm font-medium">لینک</label>
        <Input
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          placeholder="/products?category=electronics"
          data-testid="input-banner-link"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">رنگ پس‌زمینه</label>
          <input
            type="color"
            value={formData.backgroundColor}
            onChange={(e) =>
              setFormData({
                ...formData,
                backgroundColor: e.target.value,
              })
            }
            className="w-full h-10 rounded cursor-pointer"
            data-testid="input-banner-bg-color"
          />
        </div>
        <div>
          <label className="text-sm font-medium">رنگ متن</label>
          <input
            type="color"
            value={formData.textColor}
            onChange={(e) =>
              setFormData({ ...formData, textColor: e.target.value })
            }
            className="w-full h-10 rounded cursor-pointer"
            data-testid="input-banner-text-color"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">آیکون/ایموجی</label>
        <Input
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="📢 یا 🎁 یا 🚀"
          maxLength={2}
          data-testid="input-banner-icon"
        />
      </div>

      <div>
        <label className="text-sm font-medium flex items-center gap-2">
          تصویر بنر (اختیاری)
          {formData.imageUrl && (
            <CheckCircle className="h-4 w-4 text-green-600" />
          )}
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={uploading}
              onChange={handleImageUpload}
              data-testid="input-banner-image"
              className="cursor-pointer"
            />
            {formData.imageUrl && (
              <button
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="p-2 hover-elevate text-destructive"
                type="button"
                title="حذف تصویر"
                data-testid="button-remove-image"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          {uploading && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Upload className="h-4 w-4 animate-spin" />
              درحال آپلود...
            </div>
          )}
          {formData.imageUrl && (
            <div className="relative h-32 w-full rounded-lg overflow-hidden border-2 border-green-200 bg-green-50">
              <img
                src={formData.imageUrl}
                alt="Banner preview"
                className="w-full h-full object-cover"
                data-testid="img-banner-preview"
              />
              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                بارگذاری شد
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
            data-testid="input-banner-active"
          />
          <span className="text-sm">فعال</span>
        </label>
      </div>
    </div>
  );
}
