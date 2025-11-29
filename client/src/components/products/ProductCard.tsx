import { Link } from "wouter";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast({
        title: "محصول ناموجود",
        description: "این محصول در حال حاضر موجود نیست.",
        variant: "destructive",
      });
      return;
    }

    addItem(product);
    toast({
      title: "به سبد خرید اضافه شد",
      description: product.name,
    });
    openCart();
  };

  const discount = product.comparePrice
    ? Math.round(
        ((Number(product.comparePrice) - Number(product.price)) /
          Number(product.comparePrice)) *
          100
      )
    : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card
        className="group overflow-visible h-full hover-elevate cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-muted">
          <img
            src={product.image || "https://placehold.co/400x500/e2e8f0/64748b?text=No+Image"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-2 right-2"
            >
              {discount}% تخفیف
            </Badge>
          )}
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg">ناموجود</Badge>
            </div>
          )}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3
            className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem]"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col">
              <span
                className="text-lg font-bold text-primary"
                data-testid={`text-product-price-${product.id}`}
              >
                {formatPrice(product.price)} تومان
              </span>
              {product.comparePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <Button
              size="icon"
              variant="default"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
