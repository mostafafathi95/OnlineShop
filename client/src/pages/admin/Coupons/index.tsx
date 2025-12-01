import { useState } from "react";
import { Plus, Edit, Trash2, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Coupon } from "@shared/schema";
import { useCouponForm, useCoupons, formatPrice, parseCouponForEdit } from "./hooks";
import { useCreateCouponMutation, useUpdateCouponMutation, useDeleteCouponMutation } from "./mutations";
import { CouponForm } from "./CouponForm";

export default function AdminCoupons() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: coupons, isLoading } = useCoupons();
  const { formData, setFormData, resetForm } = useCouponForm();

  const createMutation = useCreateCouponMutation();
  const updateMutation = useUpdateCouponMutation();
  const deleteMutation = useDeleteCouponMutation();

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData(parseCouponForEdit(coupon));
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.discountValue) {
      toast({
        title: "خطا",
        description: "کد و درصد تخفیف الزامی است",
        variant: "destructive",
      });
      return;
    }

    if (editingCoupon) {
      updateMutation.mutate({ id: editingCoupon.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <AdminLayout title="مدیریت کوپن‌ها">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a href="/admin">
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">مدیریت کوپن‌ها</h1>
              <p className="text-muted-foreground">ایجاد و مدیریت کوپن‌های تخفیف</p>
            </div>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setEditingCoupon(null);
              setIsDialogOpen(true);
            }}
            className="gap-2"
            data-testid="button-create-coupon"
          >
            <Plus className="h-5 w-5" />
            کوپن جدید
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : coupons && coupons.length > 0 ? (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <Card key={coupon.id} data-testid={`coupon-${coupon.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Ticket className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{coupon.code}</h3>
                          <Badge variant={coupon.isActive ? "default" : "secondary"}>
                            {coupon.isActive ? "فعال" : "غیرفعال"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">تخفیف:</span>
                            <p className="font-semibold">
                              {coupon.discountValue} {coupon.discountType === "percentage" ? "%" : "تومان"}
                            </p>
                          </div>
                          {coupon.minOrderValue && (
                            <div>
                              <span className="text-muted-foreground">حداقل سفارش:</span>
                              <p className="font-semibold">{formatPrice(coupon.minOrderValue)} تومان</p>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">استفاده:</span>
                            <p className="font-semibold">{coupon.currentUses} از {coupon.maxUses || "∞"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(coupon)}
                        data-testid={`button-edit-coupon-${coupon.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setDeleteId(coupon.id)}
                        data-testid={`button-delete-coupon-${coupon.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">کوپنی وجود ندارد</h3>
              <p className="text-muted-foreground">کوپن جدید ایجاد کنید تا شروع کند</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "ویرایش کوپن" : "کوپن جدید"}</DialogTitle>
            <DialogDescription>
              {editingCoupon ? "کد تخفیف را ویرایش کنید" : "یک کد تخفیف جدید ایجاد کنید"}
            </DialogDescription>
          </DialogHeader>
          <CouponForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={createMutation.isPending || updateMutation.isPending}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف کوپن</DialogTitle>
            <DialogDescription>آیا مطمئن هستید؟ این عمل قابل بازگشت نیست.</DialogDescription>
          </DialogHeader>
          <div>
            <Button data-testid="button-cancel-delete">انصراف</Button>
            <Button
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              حذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
