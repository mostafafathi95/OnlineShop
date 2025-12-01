import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { ProductWithCategory } from "@shared/schema";

interface ProductInfoProps {
  product: ProductWithCategory;
  discount: number;
  formatPrice: (price: string | number) => string;
}

export default function ProductInfo({ product, discount, formatPrice }: ProductInfoProps) {
  return (
    <div>
      {product.category && (
        <Link
          href={`/products?category=${product.category.slug}`}
          className="text-sm text-primary hover:underline"
        >
          {product.category.name}
        </Link>
      )}
      <h1 className="text-2xl md:text-3xl font-bold mt-2" data-testid="text-product-title">
        {product.name}
      </h1>
      {product.sku && (
        <p className="text-sm text-muted-foreground mt-1">
          کد محصول: {product.sku}
        </p>
      )}

      <div className="flex items-baseline gap-3 mt-4">
        <span className="text-3xl font-bold text-primary" data-testid="text-product-price">
          {formatPrice(product.price)} تومان
        </span>
        {product.comparePrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.comparePrice)}
            </span>
            <Badge variant="destructive">{discount}% تخفیف</Badge>
          </>
        )}
      </div>

      {product.shortDescription && (
        <p className="text-muted-foreground leading-relaxed mt-4">
          {product.shortDescription}
        </p>
      )}
    </div>
  );
}
