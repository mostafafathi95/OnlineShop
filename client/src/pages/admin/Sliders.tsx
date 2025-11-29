import { useLocation } from "wouter";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Slider } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function AdminSliders() {
  const [, setLocation] = useLocation();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: sliders, isLoading } = useQuery<Slider[]>({
    queryKey: ["/api/admin/sliders"],
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/sliders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sliders"] });
      setDeleteId(null);
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: (slider: Slider) =>
      apiRequest("PATCH", `/api/admin/sliders/${slider.id}`, {
        ...slider,
        isActive: !slider.isActive,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sliders"] });
    },
  });

  return (
    <AdminLayout title="مدیریت اسلایدرها">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">اسلایدرهای صفحه اصلی</h2>
          <Button onClick={() => setLocation("/admin/sliders/new")} data-testid="button-new-slider">
            <Plus className="w-4 h-4 ml-2" />
            اسلایدر جدید
          </Button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : sliders && sliders.length > 0 ? (
          <div className="space-y-3">
            {sliders.map((slider) => (
              <Card key={slider.id} data-testid={`card-slider-${slider.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      {/* Image */}
                      {slider.image && (
                        <img
                          src={slider.image}
                          alt={slider.title}
                          className="w-20 h-20 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{slider.title}</h3>
                        <p className="text-sm text-muted-foreground">{slider.slug}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>شروع: {new Date(slider.startDate).toLocaleDateString("fa-IR")}</span>
                          <span>پایان: {new Date(slider.endDate).toLocaleDateString("fa-IR")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          toggleActiveMutation.mutate(slider)
                        }
                        data-testid={`button-toggle-${slider.id}`}
                      >
                        {slider.isActive ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setLocation(`/admin/sliders/${slider.id}`)}
                        data-testid={`button-edit-${slider.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(slider.id)}
                        data-testid={`button-delete-${slider.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              هیچ اسلایدری موجود نیست
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent data-testid="dialog-delete-slider">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف اسلایدر</AlertDialogTitle>
            <AlertDialogDescription>
              آیا مطمئن هستید؟ این عمل قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>لغو</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              حذف
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
