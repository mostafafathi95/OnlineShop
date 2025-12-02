import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAdminProducts, useAdminCategories } from "@/hooks/useAdminData";
import { formatPrice, formatProductStatus } from "@/lib/formatters";
import { STATUS_VARIANTS, PRODUCT_STATUS_OPTIONS } from "@/lib/admin-constants";
import type { Product, Category } from "@shared/schema";

export default function AdminProducts() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const { data: products = [], isLoading } = useAdminProducts();
  const { data: categories = [] } = useAdminCategories();

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest("DELETE", `/api/admin/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول حذف شد" });
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">مدیریت محصولات</h1>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          <Plus size={20} />
          محصول جدید
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">افزودن محصول جدید</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="نام محصول"
              className="border rounded px-3 py-2"
              data-testid="input-product-name"
            />
            <input
              type="number"
              placeholder="قیمت"
              className="border rounded px-3 py-2"
              data-testid="input-product-price"
            />
            <input
              type="number"
              placeholder="موجودی"
              className="border rounded px-3 py-2"
              data-testid="input-product-stock"
            />
            <select className="border rounded px-3 py-2" data-testid="select-category">
              <option>انتخاب دسته‌بندی</option>
              {(categories as Category[]).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <Button data-testid="button-save-product">ذخیره</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              انصراف
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">در حال بارگذاری...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            محصولی وجود ندارد
          </div>
        ) : (
          products.map((product) => (
            <Card key={product.id} className="p-4" data-testid={`card-product-admin-${product.id}`}>
              <div className="flex gap-4 items-start">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                    data-testid={`img-product-${product.id}`}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg" data-testid={`text-product-name-${product.id}`}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.slug}</p>
                    </div>
                    {product.isActive && (
                      <Badge data-testid={`badge-active-${product.id}`}>فعال</Badge>
                    )}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">قیمت</p>
                      <p className="font-bold" data-testid={`text-price-${product.id}`}>
                        {formatPrice(product.price)} تومان
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">موجودی</p>
                      <p
                        className={`font-bold ${
                          product.stock <= 0 ? "text-red-500" : "text-green-500"
                        }`}
                        data-testid={`text-stock-${product.id}`}
                      >
                        {product.stock}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        data-testid={`button-edit-${product.id}`}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(product.id)}
                        data-testid={`button-delete-${product.id}`}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
