import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface DashboardLowStockProps {
  products: Product[] | undefined;
  formatPrice: (price: number | string) => string;
}

export function DashboardLowStock({
  products,
  formatPrice,
}: DashboardLowStockProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>محصولات کم موجودی</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">مشاهده همه</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {products && products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product) => (
              <Link key={product.id} href={`/admin/products/${product.id}`}>
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover-elevate cursor-pointer">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/48x48/e2e8f0/64748b?text=N"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.price)} تومان
                    </p>
                  </div>
                  <Badge
                    variant={product.stock <= 0 ? "destructive" : "secondary"}
                  >
                    {product.stock} عدد
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            همه محصولات موجودی کافی دارند.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
