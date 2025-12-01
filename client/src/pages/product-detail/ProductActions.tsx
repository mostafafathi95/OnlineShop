import { ShoppingCart, Heart, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StockCounter from "@/components/products/StockCounter";
import SocialShare from "@/components/products/SocialShare";
import { Minus, Plus, Truck, Shield } from "lucide-react";

interface ProductActionsProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onWishlist: () => void;
  onCompare: () => void;
  isWishlisted: boolean;
  hasInComparison: boolean;
  stock: number;
  productName: string;
  productUrl: string;
}

export default function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
  onWishlist,
  onCompare,
  isWishlisted,
  hasInComparison,
  stock,
  productName,
  productUrl,
}: ProductActionsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <StockCounter stock={stock} />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">تعداد:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              data-testid="button-decrease-quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuantityChange(Math.min(stock, quantity + 1))}
              disabled={quantity >= stock}
              data-testid="button-increase-quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="lg"
            className="flex-1"
            onClick={onAddToCart}
            disabled={stock <= 0}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="ml-2 h-5 w-5" />
            افزودن به سبد خرید
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onWishlist}
            data-testid="button-add-to-wishlist"
            className={isWishlisted ? "bg-red-50 dark:bg-red-950 border-red-200" : ""}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onCompare}
            data-testid="button-add-to-comparison"
            className={hasInComparison ? "bg-blue-50 dark:bg-blue-950 border-blue-200" : ""}
          >
            <Copy className={`h-5 w-5 ${hasInComparison ? "text-blue-500" : ""}`} />
          </Button>
        </div>

        <div className="pt-4 border-t">
          <SocialShare title={productName} url={productUrl} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Card className="hover-elevate">
          <CardContent className="p-4 flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-sm">ارسال سریع</p>
              <p className="text-xs text-muted-foreground">به سراسر کشور</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover-elevate">
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-sm">ضمانت اصالت</p>
              <p className="text-xs text-muted-foreground">۷ روز بازگشت</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
