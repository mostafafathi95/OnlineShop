import { useState } from "react";
import { useComparisonStore } from "@/stores/comparisonStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function ProductsCompare() {
  const { items: compareItems, removeItem, clearComparison } = useComparisonStore();

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">مقایسه محصولات</h1>
        </div>

        {compareItems.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">
                محصولی برای مقایسه انتخاب نشده است
              </p>
              <Link href="/products">
                <Button>بازگشت به محصولات</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                {compareItems.length} محصول برای مقایسه
              </p>
              <Button
                variant="outline"
                onClick={clearComparison}
                className="text-red-600"
              >
                پاک کردن همه
              </Button>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-12 gap-4 mb-6">
                  <div className="col-span-2 font-bold">مشخصات</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      <div className="space-y-4">
                        <div className="relative group">
                          <img
                            src={product.image || "https://placehold.co/200"}
                            alt={product.name}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeItem(product.id)}
                            data-testid={`button-remove-comparison-${product.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <p className="font-medium hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Price Row */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-2 font-bold">قیمت</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          {formatPrice(product.price)} تومان
                        </p>
                        {product.comparePrice && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.comparePrice)} تومان
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Stock Row */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-2 font-bold">موجودی</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      {product.stock > 0 ? (
                        <Badge className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200">
                          {product.stock} عدد موجود
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200">
                          ناموجود
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Weight Row */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-2 font-bold">وزن</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      {product.weight ? (
                        <p>{product.weight} کیلوگرم</p>
                      ) : (
                        <p className="text-muted-foreground">—</p>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* SKU Row */}
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-2 font-bold">کد محصول</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      {product.sku ? (
                        <p className="text-sm font-mono">{product.sku}</p>
                      ) : (
                        <p className="text-muted-foreground">—</p>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Action Row */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-2 font-bold">عملیات</div>
                  {compareItems.map((product) => (
                    <div key={product.id} className="col-span-2">
                      <div className="space-y-2">
                        <Link href={`/products/${product.slug}`}>
                          <Button variant="outline" className="w-full">
                            مشاهده
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
