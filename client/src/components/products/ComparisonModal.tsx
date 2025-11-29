import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">تصویر</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    <img
                      src={product.image || "https://placehold.co/150"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">نام</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    <Link href={`/products/${product.slug}`} className="text-primary hover:underline">
                      {product.name}
                    </Link>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">قیمت</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    <div className="font-bold text-lg">{formatPrice(product.price)} تومان</div>
                    {product.comparePrice && (
                      <div className="text-muted-foreground line-through">
                        {formatPrice(product.comparePrice)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">وزن</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    {product.weight ? `${product.weight} کیلوگرم` : "—"}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 font-medium">موجودی</td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    {product.stock > 0 ? `${product.stock} عدد` : "ناموجود"}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4"></td>
                {compareItems.map((product) => (
                  <td key={product.id} className="py-4 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemove(product.id)}
                      className="w-full"
                    >
                      <X className="h-4 w-4 ml-1" />
                      حذف
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
