import { useRoute } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import ComparisonModal from "@/components/products/ComparisonModal";
import RelatedProducts from "@/components/products/RelatedProducts";
import { useCartStore } from "@/stores/cartStore";
import { useComparisonStore } from "@/stores/comparisonStore";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { Product, ProductWithCategory } from "@shared/schema";
import { useProductDetail } from "./product-detail/useProductDetail";
import ProductGallery from "./product-detail/ProductGallery";
import ProductInfo from "./product-detail/ProductInfo";
import ProductActions from "./product-detail/ProductActions";
import ProductTabs from "./product-detail/ProductTabs";
import Breadcrumb from "./product-detail/Breadcrumb";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const { addItem, openCart } = useCartStore();
  const { items: compareItems, addItem: addToCompare, removeItem: removeFromCompare, isOpen: compareOpen, openComparison, closeComparison, hasItem: hasInComparison } = useComparisonStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<ProductWithCategory>({
    queryKey: ["/api/products", params?.slug],
    enabled: !!params?.slug,
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: product?.categoryId, limit: 4 }],
    enabled: !!product?.categoryId,
  });

  const {
    quantity,
    setQuantity,
    selectedImage,
    setSelectedImage,
    isWishlisted,
    setIsWishlisted,
    wishlistMutation,
  } = useProductDetail(product);

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.stock <= 0) {
      toast({
        title: "محصول ناموجود",
        description: "این محصول در حال حاضر موجود نیست.",
        variant: "destructive",
      });
      return;
    }

    addItem(product, quantity);
    toast({
      title: "به سبد خرید اضافه شد",
      description: `${quantity} عدد ${product.name}`,
    });
    openCart();
  };

  const discount = product?.comparePrice
    ? Math.round(
        ((Number(product.comparePrice) - Number(product.price)) /
          Number(product.comparePrice)) *
          100
      )
    : 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
          <p className="text-muted-foreground mb-6">
            محصول مورد نظر موجود نیست یا حذف شده است.
          </p>
          <Button asChild>
            <Link href="/products">بازگشت به محصولات</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const images = product.images?.length
    ? product.images.map((img) => img.url)
    : [product.image || "https://placehold.co/600x600/e2e8f0/64748b?text=No+Image"];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb product={product} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery
            images={images}
            videoUrl={product.videoUrl || undefined}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          <div className="space-y-6">
            <ProductInfo product={product} discount={discount} formatPrice={formatPrice} />
            <ProductActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onWishlist={() => wishlistMutation.mutate()}
              onCompare={() => {
                if (hasInComparison(product.id)) {
                  removeFromCompare(product.id);
                  toast({ title: "از مقایسه حذف شد" });
                } else {
                  addToCompare(product);
                  toast({ title: "به مقایسه اضافه شد" });
                }
              }}
              isWishlisted={isWishlisted}
              hasInComparison={hasInComparison(product.id)}
              stock={product.stock}
              productName={product.name}
              productUrl={typeof window !== "undefined" ? window.location.href : ""}
            />
          </div>
        </div>

        <ProductTabs product={product} />

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
            <ProductGrid
              products={relatedProducts.filter((p) => p.id !== product.id).slice(0, 4)}
            />
          </div>
        )}
      </div>

      <ComparisonModal
        isOpen={compareOpen}
        onOpenChange={(open) => open ? openComparison() : closeComparison()}
        compareItems={compareItems}
        onRemove={removeFromCompare}
      />
    </Layout>
  );
}
