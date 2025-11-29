import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowRight, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category } from "@shared/schema";

export default function ProductForm() {
  const [, params] = useRoute("/admin/products/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "",
    comparePrice: "",
    sku: "",
    stock: "0",
    categoryId: "",
    image: "",
    videoUrl: "",
    isActive: true,
    isFeatured: false,
    weight: "",
  });

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ["/api/admin/products", params?.id],
    enabled: !isNew && !!params?.id,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        nameEn: product.nameEn || "",
        slug: product.slug,
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        price: product.price.toString(),
        comparePrice: product.comparePrice?.toString() || "",
        sku: product.sku || "",
        stock: product.stock.toString(),
        categoryId: product.categoryId?.toString() || "",
        image: product.image || "",
        videoUrl: (product as any).videoUrl || "",
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        weight: product.weight?.toString() || "",
      });
    }
  }, [product]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/products", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول ایجاد شد" });
      setLocation("/admin/products");
    },
    onError: () => {
      toast({
        title: "خطا در ایجاد محصول",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("PATCH", `/api/admin/products/${params?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول بروزرسانی شد" });
      setLocation("/admin/products");
    },
    onError: () => {
      toast({
        title: "خطا در بروزرسانی",
        variant: "destructive",
      });
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.slug) {
      toast({
        title: "اطلاعات ناقص",
        description: "نام، قیمت و اسلاگ محصول الزامی است.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      ...formData,
      price: formData.price,
      comparePrice: formData.comparePrice || null,
      stock: parseInt(formData.stock) || 0,
      categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
      weight: formData.weight || null,
    };

    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  if (!isNew && productLoading) {
    return (
      <AdminLayout title="ویرایش محصول">
        <div className="max-w-4xl space-y-6">
          <Skeleton className="h-96" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isNew ? "افزودن محصول" : "ویرایش محصول"}>
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/admin/products")}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">
            {isNew ? "محصول جدید" : product?.name}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameEn">نام انگلیسی</Label>
                    <Input
                      id="nameEn"
                      value={formData.nameEn}
                      onChange={(e) =>
                        setFormData({ ...formData, nameEn: e.target.value })
                      }
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="slug">اسلاگ (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    dir="ltr"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">توضیح کوتاه</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="description">توضیحات کامل</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

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
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, comparePrice: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sku">کد محصول (SKU)</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تصویر محصول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.image ? (
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={formData.image}
                        alt="تصویر محصول"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData({ ...formData, image: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          آپلود تصویر
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="imageUrl">لینک تصویر</Label>
                    <Input
                      id="imageUrl"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://..."
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>دسته‌بندی</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: value })
                  }
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
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isFeatured">ویژه</Label>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFeatured: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <Save className="ml-2 h-4 w-4" />
            {createMutation.isPending || updateMutation.isPending
              ? "در حال ذخیره..."
              : "ذخیره محصول"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/admin/products")}
          >
            انصراف
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
