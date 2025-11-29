import { useEffect } from "react";
import { Link } from "wouter";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { WishlistItem } from "@shared/schema";

interface WishlistItemWithProduct extends WishlistItem {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    stock: number;
    slug: string;
  };
}

export default function Wishlist() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: wishlist, isLoading } = useQuery<WishlistItemWithProduct[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      return apiRequest("DELETE", `/api/wishlist/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({ title: "از علاقه‌مندی‌ها حذف شد" });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        description: "برای مشاهده علاقه‌مندی‌ها ابتدا وارد شوید.",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated, toast]);

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">علاقه‌مندی‌های من</h1>
            <p className="text-muted-foreground">محصولات مورد علاقه شما</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : wishlist && wishlist.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-elevate" data-testid={`wishlist-item-${item.product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.product.image || "https://placehold.co/300x300/e2e8f0/64748b?text=No+Image"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                  {item.product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">ناموجود</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <Link href={`/products/${item.product.slug}`}>
                    <h3 className="font-semibold line-clamp-2 hover:text-primary mb-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-primary font-bold mb-4">
                    {formatPrice(item.product.price)} تومان
                  </p>
                  <div className="space-y-2">
                    <Button
                      asChild
                      size="sm"
                      className="w-full"
                      disabled={item.product.stock <= 0}
                      data-testid={`button-view-product-${item.product.id}`}
                    >
                      <Link href={`/products/${item.product.slug}`}>
                        <ShoppingBag className="h-4 w-4 ml-2" />
                        مشاهده محصول
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => removeFromWishlistMutation.mutate(item.product.id)}
                      disabled={removeFromWishlistMutation.isPending}
                      data-testid={`button-remove-wishlist-${item.product.id}`}
                    >
                      <Heart className="h-4 w-4 ml-2 fill-current" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">علاقه‌مندی‌ای وجود ندارد</h3>
              <p className="text-muted-foreground mb-6">محصولات مورد علاقه خود را اینجا ذخیره کنید</p>
              <Button asChild>
                <Link href="/products">مشاهده محصولات</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
