import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ShoppingCart, Heart, Minus, Plus, Check, Truck, Shield, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { useCartStore } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product, ProductWithCategory, Review } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const { data: product, isLoading } = useQuery<ProductWithCategory>({
    queryKey: ["/api/products", params?.slug],
    enabled: !!params?.slug,
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: product?.categoryId, limit: 4 }],
    enabled: !!product?.categoryId,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/products", product?.id, "reviews"],
    enabled: !!product?.id,
  });

  const reviewMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      return apiRequest("POST", "/api/reviews", {
        productId: product.id,
        title: reviewTitle,
        content: reviewContent,
        rating: reviewRating,
      });
    },
    onSuccess: () => {
      if (product?.id) {
        queryClient.invalidateQueries({ queryKey: ["/api/products", product.id, "reviews"] });
        setReviewTitle("");
        setReviewContent("");
        setReviewRating(5);
        toast({ title: "نظر شما ثبت شد" });
      }
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      if (isWishlisted) {
        return apiRequest("DELETE", `/api/wishlist/${product.id}`);
      } else {
        return apiRequest("POST", "/api/wishlist", { productId: product.id });
      }
    },
    onSuccess: () => {
      setIsWishlisted(!isWishlisted);
      toast({ title: isWishlisted ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد" });
    },
  });

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

  const handleReviewSubmit = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    if (!reviewTitle || !reviewContent) {
      toast({
        title: "خطا",
        description: "عنوان و متن نظر الزامی است",
        variant: "destructive",
      });
      return;
    }
    reviewMutation.mutate();
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
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            خانه
          </Link>
          <ArrowRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-foreground">
            محصولات
          </Link>
          {product.category && (
            <>
              <ArrowRight className="h-4 w-4" />
              <Link
                href={`/products?category=${product.category.slug}`}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
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
            </div>

            <div className="flex items-baseline gap-3">
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
              <p className="text-muted-foreground leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">
                      موجود در انبار ({product.stock} عدد)
                    </span>
                  </>
                ) : (
                  <Badge variant="secondary">ناموجود</Badge>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">تعداد:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
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
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="ml-2 h-5 w-5" />
                  افزودن به سبد خرید
                </Button>
                <Button variant="outline" size="lg" data-testid="button-add-to-wishlist">
                  <Heart className="h-5 w-5" />
                </Button>
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
        </div>

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

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
            <ProductGrid
              products={relatedProducts.filter((p) => p.id !== product.id).slice(0, 4)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
