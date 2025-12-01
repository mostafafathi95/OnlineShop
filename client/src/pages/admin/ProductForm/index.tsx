import { useRoute, useLocation } from "wouter";
import { ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "../AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { useProductForm, useProductCategories } from "./hooks";
import { useCreateProductMutation, useUpdateProductMutation } from "./mutations";
import { BasicInfo } from "./BasicInfo";
import { PriceStock } from "./PriceStock";
import { Media } from "./Media";
import { CategorySection } from "./Category";
import { Status } from "./Status";

export default function ProductForm() {
  const [, params] = useRoute("/admin/products/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: ["/api/admin/products", params?.id],
    enabled: !isNew && !!params?.id,
  });

  const { data: categories } = useProductCategories();
  const { formData, setFormData, resetForm } = useProductForm(product);

  const createMutation = useCreateProductMutation(() => setLocation("/admin/products"));
  const updateMutation = useUpdateProductMutation(params?.id as string, () => setLocation("/admin/products"));

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

    if (isNew) {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
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
            <BasicInfo formData={formData} onChange={(data) => setFormData({ ...formData, ...data })} />
            <PriceStock formData={formData} onChange={(data) => setFormData({ ...formData, ...data })} />
          </div>

          <div className="space-y-6">
            <Media formData={formData} onChange={(data) => setFormData({ ...formData, ...data })} />
            <CategorySection
              formData={formData}
              categories={categories}
              onChange={(data) => setFormData({ ...formData, ...data })}
            />
            <Status formData={formData} onChange={(data) => setFormData({ ...formData, ...data })} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <Save className="ml-2 h-4 w-4" />
            {createMutation.isPending || updateMutation.isPending ? "در حال ذخیره..." : "ذخیره محصول"}
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
