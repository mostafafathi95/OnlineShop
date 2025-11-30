import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

export default function AdminCategories() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ["/api/admin/categories"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/admin/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/categories"] });
      toast({ title: "دسته‌بندی حذف شد" });
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مدیریت دسته‌بندی‌ها</h1>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          <Plus size={20} />
          دسته‌بندی جدید
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">افزودن دسته‌بندی جدید</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="نام دسته‌بندی"
              className="border rounded px-3 py-2"
              data-testid="input-category-name"
            />
            <input
              type="text"
              placeholder="Slug (انگلیسی)"
              className="border rounded px-3 py-2"
              data-testid="input-category-slug"
            />
            <textarea
              placeholder="توضیحات"
              className="border rounded px-3 py-2 md:col-span-2"
              data-testid="input-category-description"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <Button data-testid="button-save-category">ذخیره</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              انصراف
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="text-center col-span-3 py-8">در حال بارگذاری...</div>
        ) : categories.length === 0 ? (
          <div className="text-center col-span-3 py-8 text-muted-foreground">
            دسته‌بندی‌ای وجود ندارد
          </div>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="overflow-hidden" data-testid={`card-category-${category.id}`}>
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover"
                  data-testid={`img-category-${category.id}`}
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg" data-testid={`text-category-name-${category.id}`}>
                    {category.name}
                  </h3>
                  {category.isActive && <Badge data-testid={`badge-category-active-${category.id}`}>فعال</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description || "بدون توضیح"}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="flex-1"
                    data-testid={`button-edit-category-${category.id}`}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => deleteMutation.mutate(category.id)}
                    data-testid={`button-delete-category-${category.id}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
