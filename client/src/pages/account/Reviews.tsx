import { useEffect } from "react";
import { Link } from "wouter";
import { Star, ArrowRight, MessageSquare, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Review } from "@shared/schema";

interface ReviewWithProduct extends Review {
  product?: {
    id: number;
    name: string;
    slug: string;
  };
}

export default function Reviews() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: reviews, isLoading } = useQuery<ReviewWithProduct[]>({
    queryKey: ["/api/account/reviews"],
    enabled: isAuthenticated,
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: number) => {
      return apiRequest("DELETE", `/api/reviews/${reviewId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/account/reviews"] });
      toast({ title: "نظر حذف شد" });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        description: "برای مشاهده نظرات ابتدا وارد شوید.",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated, toast]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    );
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
            <h1 className="text-2xl font-bold">نظرات من</h1>
            <p className="text-muted-foreground">نظراتی که شما ثبت کرده‌اید</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} data-testid={`review-${review.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{review.title}</h3>
                        <Badge variant={review.isApproved ? "default" : "secondary"}>
                          {review.isApproved ? "تایید شده" : "درانتظار تایید"}
                        </Badge>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        data-testid={`button-edit-review-${review.id}`}
                      >
                        <Link href={`/products/${review.product?.slug}`}>
                          <Edit className="h-4 w-4 ml-1" />
                          ویرایش
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteReviewMutation.mutate(review.id)}
                        disabled={deleteReviewMutation.isPending}
                        data-testid={`button-delete-review-${review.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">{review.content}</p>

                  {review.product && (
                    <Link href={`/products/${review.product.slug}`} className="text-primary hover:underline text-sm">
                      {review.product.name}
                    </Link>
                  )}

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">{review.helpful}</span>
                      <span>آن را مفید شناختند</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-red-600">{review.unhelpful}</span>
                      <span>آن را غیرمفید شناختند</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">نظری ثبت نشده</h3>
              <p className="text-muted-foreground mb-6">نظر خود را برای محصولات ثبت کنید</p>
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
