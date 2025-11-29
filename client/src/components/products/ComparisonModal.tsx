import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ComparisonModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  compareItems: Product[];
  onRemove: (productId: number) => void;
}

export default function ComparisonModal({
  isOpen,
  onOpenChange,
  compareItems,
  onRemove,
}: ComparisonModalProps) {
  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  if (compareItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>مقایسه محصولات</DialogTitle>
            <DialogDescription>محصولی برای مقایسه انتخاب نشده است</DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            محصولی برای مقایسه انتخاب نشده است
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>مقایسه محصولات ({compareItems.length})</DialogTitle>
          <DialogDescription>مقایسه جزئیات محصولات برای انتخاب بهتر</DialogDescription>
        </DialogHeader>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header */}
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
              <div className="font-bold">مشخصات</div>
              {compareItems.map((product) => (
                <div key={`header-${product.id}`} className="font-bold">
                  {product.name}
                </div>
              ))}
            </div>

            {/* Image Row */}
            <div className="border-b pb-4 mb-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
                <div className="font-medium text-muted-foreground">تصویر</div>
                {compareItems.map((product) => (
                  <div key={`image-${product.id}`} className="h-24 rounded overflow-hidden bg-muted">
                    <img
                      src={product.image || "https://placehold.co/150"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Row */}
            <div className="border-b pb-4 mb-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
                <div className="font-medium text-muted-foreground">قیمت</div>
                {compareItems.map((product) => (
                  <div key={`price-${product.id}`}>
                    <div className="font-bold text-lg text-primary">{formatPrice(product.price)} تومان</div>
                    {product.comparePrice && (
                      <div className="text-muted-foreground line-through text-sm">
                        {formatPrice(product.comparePrice)} تومان
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weight Row */}
            <div className="border-b pb-4 mb-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
                <div className="font-medium text-muted-foreground">وزن</div>
                {compareItems.map((product) => (
                  <div key={`weight-${product.id}`}>
                    {product.weight ? `${product.weight} کیلوگرم` : "—"}
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Row */}
            <div className="border-b pb-4 mb-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
                <div className="font-medium text-muted-foreground">موجودی</div>
                {compareItems.map((product) => (
                  <div key={`stock-${product.id}`}>
                    {product.stock > 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">{product.stock} عدد</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">ناموجود</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${compareItems.length + 1}, minmax(200px, 1fr))` }}>
              <div className="font-medium text-muted-foreground">عملیات</div>
              {compareItems.map((product) => (
                <div key={`action-${product.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemove(product.id)}
                    className="w-full"
                    data-testid={`button-remove-comparison-modal-${product.id}`}
                  >
                    <X className="h-4 w-4 ml-1" />
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
