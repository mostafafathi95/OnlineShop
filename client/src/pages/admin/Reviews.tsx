import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Check, AlertCircle } from "lucide-react";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDate } from "@/lib/formatters";
import type { Review } from "@shared/schema";

export default function ReviewsManagement() {
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved">("all");

  const { data: reviews = [] } = useAdminData<Review>("/api/admin/reviews");

  const approveReviewMutation = useMutation({
    mutationFn: async (reviewId: number) => {
      return apiRequest("PATCH", `/api/admin/reviews/${reviewId}/approve`);
    },
    onSuccess: () => {
      toast({ title: "نظر تایید شد" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
    },
    onError: () => {
      toast({
        title: "خطا در تایید نظر",
        variant: "destructive",
      });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: number) => {
      return apiRequest("DELETE", `/api/admin/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast({ title: "نظر حذف شد" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
    },
    onError: () => {
      toast({
        title: "خطا در حذف نظر",
        variant: "destructive",
      });
    },
  });

  const filteredReviews = reviews.filter((review) => {
    if (filterStatus === "pending") return !review.isApproved;
    if (filterStatus === "approved") return review.isApproved;
    return true;
  });

  return (
    <AdminLayout title="مدیریت نظرات">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">مدیریت نظرات</h1>
          <p className="text-muted-foreground">تایید یا حذف نظرات کاربران</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            data-testid="button-filter-all-reviews"
          >
            تمام ({reviews.length})
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            onClick={() => setFilterStatus("pending")}
            data-testid="button-filter-pending-reviews"
          >
            در انتظار ({reviews.filter((r) => !r.isApproved).length})
          </Button>
          <Button
            variant={filterStatus === "approved" ? "default" : "outline"}
            onClick={() => setFilterStatus("approved")}
            data-testid="button-filter-approved-reviews"
          >
            تایید شده ({reviews.filter((r) => r.isApproved).length})
          </Button>
        </div>

        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="pt-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">هیچ نظری یافت نشد</p>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <Card key={review.id} data-testid={`card-review-${review.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">محصول #{review.productId}</h3>
                        <Badge variant={review.isApproved ? "default" : "secondary"}>
                          {review.isApproved ? "تایید شده" : "در انتظار تایید"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>⭐ {review.rating}/5</span>
                        <span>•</span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {review.title && (
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">عنوان:</p>
                        <p>{review.title}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">نظر:</p>
                      <p className="whitespace-pre-wrap">{review.comment}</p>
                    </div>
                    {review.userId && (
                      <p className="text-xs text-muted-foreground">کاربر: {review.userId}</p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {!review.isApproved && (
                      <Button
                        onClick={() => approveReviewMutation.mutate(review.id)}
                        disabled={approveReviewMutation.isPending}
                        size="sm"
                        data-testid={`button-approve-review-${review.id}`}
                      >
                        <Check className="h-4 w-4 ml-2" />
                        تایید
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => deleteReviewMutation.mutate(review.id)}
                      disabled={deleteReviewMutation.isPending}
                      size="sm"
                      data-testid={`button-delete-review-${review.id}`}
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
