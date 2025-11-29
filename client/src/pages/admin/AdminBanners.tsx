import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, ChevronUp, ChevronDown, Upload, X as XIcon } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Banner, InsertBanner } from "@shared/schema";

export default function AdminBanners() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<InsertBanner>({
    title: "",
    subtitle: "",
    badgeText: "",
    description: "",
    link: "",
    backgroundColor: "#ef4444",
    textColor: "#ffffff",
    imageUrl: "",
    icon: "📢",
    isActive: true,
    sortOrder: 0,
  });

  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners/admin"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertBanner) =>
      apiRequest("POST", "/api/banners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      setIsOpen(false);
      setFormData({
        title: "",
        subtitle: "",
        badgeText: "",
        description: "",
        link: "",
        backgroundColor: "#ef4444",
        textColor: "#ffffff",
        imageUrl: "",
        icon: "📢",
        isActive: true,
        sortOrder: 0,
      });
      toast({ title: "بنر ایجاد شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertBanner) =>
      apiRequest("PUT", `/api/banners/${editingId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      setEditingId(null);
      setIsOpen(false);
      toast({ title: "بنر به‌روز شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) =>
      apiRequest("DELETE", `/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر حذف شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, sortOrder }: { id: number; sortOrder: number }) =>
      apiRequest("PUT", `/api/banners/${id}`, { sortOrder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
    },
  });

  const handleSubmit = () => {
    if (!formData.title) {
      toast({ title: "عنوان الزامی است", variant: "destructive" });
      return;
    }

    if (editingId) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      badgeText: banner.badgeText || "",
      description: banner.description || "",
      link: banner.link || "",
      backgroundColor: banner.backgroundColor,
      textColor: banner.textColor,
      imageUrl: banner.imageUrl || "",
      icon: banner.icon || "",
      isActive: banner.isActive,
      sortOrder: banner.sortOrder,
    });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت بنرها</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  subtitle: "",
                  badgeText: "",
                  description: "",
                  link: "",
                  backgroundColor: "#ef4444",
                  textColor: "#ffffff",
                  imageUrl: "",
                  icon: "📢",
                  isActive: true,
                  sortOrder: 0,
                });
              }}
              data-testid="button-add-banner"
            >
              <Plus className="h-4 w-4 ml-2" />
              افزودن بنر
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "ویرایش بنر" : "افزودن بنر جدید"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">عنوان *</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="📢 یا 🎁 یا 🚀"
                  maxLength={2}
                  data-testid="input-banner-icon"
                />
              </div>

              <div>
                <label className="text-sm font-medium">تصویر بنر</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUploading(true);
                        const formDataUpload = new FormData();
                        formDataUpload.append('file', file);
                        try {
                          const response = await fetch('/api/upload', {
                            method: 'POST',
                            body: formDataUpload,
                          });
                          const data = await response.json();
                          if (data.success) {
                            setFormData({ ...formData, imageUrl: data.imageUrl });
                            toast({ title: "تصویر آپلود شد" });
                          }
                        } catch (error) {
                          toast({ title: "خطا در آپلود", variant: "destructive" });
                        } finally {
                          setUploading(false);
                        }
                      }
                    }}
                    data-testid="input-banner-image"
                  />
                  {formData.imageUrl && (
                    <button
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                      className="p-2 hover-elevate"
                      type="button"
                      data-testid="button-remove-image"
                    >
                      <XIcon className="h-4 w-4 text-red-500" />
                    </button>
                  )}
                </div>
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Banner preview"
                    className="mt-2 h-20 rounded object-cover"
                    data-testid="img-banner-preview"
                  />
                )}
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

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                data-testid="button-cancel-banner"
              >
                لغو
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  createMutation.isPending || updateMutation.isPending
                }
                data-testid="button-save-banner"
              >
                {editingId ? "به‌روز کردن" : "افزودن"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8">در حال بارگذاری...</div>
      ) : banners.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            هیچ بنری یافت نشد
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner, index) => (
            <Card
              key={banner.id}
              style={{
                backgroundColor: `${banner.backgroundColor}20`,
                borderColor: banner.backgroundColor,
                borderWidth: "2px",
              }}
              className="overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{banner.title}</h3>
                      <Badge
                        variant={banner.isActive ? "default" : "secondary"}
                      >
                        {banner.isActive ? "فعال" : "غیرفعال"}
                      </Badge>
                    </div>
                    {banner.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.badgeText && (
                      <p className="text-sm text-muted-foreground">
                        نشان: {banner.badgeText}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {index > 0 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          moveMutation.mutate({
                            id: banner.id,
                            sortOrder: banner.sortOrder - 1,
                          })
                        }
                        data-testid={`button-move-up-${banner.id}`}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    )}
                    {index < banners.length - 1 && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          moveMutation.mutate({
                            id: banner.id,
                            sortOrder: banner.sortOrder + 1,
                          })
                        }
                        data-testid={`button-move-down-${banner.id}`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(banner)}
                      data-testid={`button-edit-banner-${banner.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          data-testid={`button-delete-banner-${banner.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          این بنر حذف خواهد شد
                        </AlertDialogDescription>
                        <AlertDialogCancel>لغو</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(banner.id)}
                          className="bg-red-600 hover:bg-red-700"
                          data-testid="button-confirm-delete-banner"
                        >
                          حذف کردن
                        </AlertDialogAction>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
