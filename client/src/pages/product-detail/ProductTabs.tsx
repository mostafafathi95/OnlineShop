import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductWithCategory } from "@shared/schema";

interface ProductTabsProps {
  product: ProductWithCategory;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <div className="mt-12">
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">توضیحات</TabsTrigger>
          <TabsTrigger value="specs">مشخصات</TabsTrigger>
          <TabsTrigger value="reviews">نظرات</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            {product.description ? (
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            ) : (
              <p className="text-muted-foreground">توضیحاتی برای این محصول ثبت نشده است.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="specs" className="mt-6">
          <div className="space-y-4">
            {product.weight && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">وزن</span>
                <span className="font-medium">{product.weight} کیلوگرم</span>
              </div>
            )}
            {product.sku && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">کد محصول</span>
                <span className="font-medium">{product.sku}</span>
              </div>
            )}
            {product.category && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">دسته‌بندی</span>
                <span className="font-medium">{product.category.name}</span>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <p className="text-muted-foreground text-center py-8">
            هنوز نظری برای این محصول ثبت نشده است.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
