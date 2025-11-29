import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/products/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

interface RelatedProductsProps {
  productId: number;
  categoryId: number;
  currentProductId?: number;
}

export default function RelatedProducts({
  productId,
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const { data: related, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: categoryId, limit: 8 }],
  });

  const filteredProducts = related?.filter((p) => p.id !== currentProductId).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!filteredProducts.length) {
    return null;
  }

  return <ProductGrid products={filteredProducts} />;
}
