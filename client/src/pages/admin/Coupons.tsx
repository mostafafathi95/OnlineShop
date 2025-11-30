import { useState } from "react";
import { Plus, Edit, Trash2, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Coupon } from "@shared/schema";

export default function AdminCoupons() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    minOrderValue: "",
    maxUses: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const { data: coupons, isLoading } = useQuery<Coupon[]>({
    queryKey: ["/api/admin/coupons"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/coupons", {
        ...data,
        discountValue: parseFloat(data.discountValue),
        minOrderValue: data.minOrderValue ? parseFloat(data.minOrderValue) : null,
        maxUses: data.maxUses ? parseInt(data.maxUses) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "کوپن ایجاد شد" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest("PATCH", `/api/admin/coupons/${id}`, {
        ...data,
        discountValue: parseFloat(data.discountValue),
        minOrderValue: data.minOrderValue ? parseFloat(data.minOrderValue) : null,
        maxUses: data.maxUses ? parseInt(data.maxUses) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      setIsDialogOpen(false);
      setEditingCoupon(null);
      resetForm();
      toast({ title: "کوپن بروزرسانی شد" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/coupons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      toast({ title: "کوپن حذف شد" });
      setDeleteId(null);
    },
  });

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      minOrderValue: "",
      maxUses: "",
      startDate: "",
      endDate: "",
      isActive: true,
    });
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType as "percentage" | "fixed",
      discountValue: coupon.discountValue.toString(),
      minOrderValue: coupon.minOrderValue?.toString() || "",
      maxUses: coupon.maxUses?.toString() || "",
      startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().split("T")[0] : "",
      endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split("T")[0] : "",
      isActive: coupon.isActive,
    });
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
  };

  const formatPrice = (price: string | number) => {
    return Number(price).toLocaleString("fa-IR");
  };

  return (
    <AdminLayout>
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
          <Button onClick={() => {
            resetForm();
            setEditingCoupon(null);
            setIsDialogOpen(true);
          }} className="gap-2" data-testid="button-create-coupon">
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
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">کد کوپن</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="مثال: SUMMER20"
                data-testid="input-coupon-code"
              />
            </div>
            <div>
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="توضیحات کوپن"
                rows={2}
                data-testid="input-coupon-description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountType">نوع تخفیف</Label>
                <select
                  id="discountType"
                  className="w-full h-10 px-3 rounded-md border border-input"
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                  data-testid="select-discount-type"
                >
                  <option value="percentage">درصد</option>
                  <option value="fixed">مبلغ ثابت</option>
                </select>
              </div>
              <div>
                <Label htmlFor="discountValue">مقدار تخفیف</Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  placeholder="0"
                  data-testid="input-discount-value"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="minOrderValue">حداقل مبلغ سفارش</Label>
              <Input
                id="minOrderValue"
                type="number"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                placeholder="اختیاری"
                data-testid="input-min-order"
              />
            </div>
            <div>
              <Label htmlFor="maxUses">حداکثر استفاده</Label>
              <Input
                id="maxUses"
                type="number"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
                placeholder="خالی = نامحدود"
                data-testid="input-max-uses"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">تاریخ شروع</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  data-testid="input-start-date"
                />
              </div>
              <div>
                <Label htmlFor="endDate">تاریخ انتها</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  data-testid="input-end-date"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                data-testid="switch-coupon-active"
              />
              <Label>فعال</Label>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-coupon"
              >
                {editingCoupon ? "بروزرسانی" : "ایجاد"}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-coupon"
              >
                انصراف
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>حذف کوپن</AlertDialogTitle>
            <AlertDialogDescription>آیا مطمئن هستید؟ این عمل قابل بازگشت نیست.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
