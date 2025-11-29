import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowRight, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ShippingMethod } from "@shared/schema";

export default function ShippingMethodsForm() {
  const [, params] = useRoute("/admin/shipping-methods/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    estimatedDays: "3",
    active: true,
  });

  const { data: method, isLoading } = useQuery<ShippingMethod>({
    queryKey: ["/api/shipping-methods", params?.id],
    enabled: !isNew && !!params?.id,
  });

  useEffect(() => {
    if (method) {
      setFormData({
        name: method.name,
        description: method.description || "",
        cost: method.cost.toString(),
        estimatedDays: method.estimatedDays?.toString() || "3",
        active: method.active || true,
      });
    }
  }, [method]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (isNew) {
        return apiRequest("POST", "/api/shipping-methods", {
          ...formData,
          cost: formData.cost,
          estimatedDays: parseInt(formData.estimatedDays),
        });
      } else {
        return apiRequest("PATCH", `/api/shipping-methods/${params?.id}`, {
          ...formData,
          cost: formData.cost,
          estimatedDays: parseInt(formData.estimatedDays),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/shipping-methods"] });
      toast({ title: isNew ? "روش ارسال ایجاد شد" : "روش ارسال به‌روزرسانی شد" });
      setLocation("/admin/shipping-methods");
    },
    onError: () => {
      toast({ title: "خطا", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <AdminLayout title="بارگذاری..." />;

  return (
    <AdminLayout
      title={isNew ? "روش ارسال جدید" : "ویرایش روش ارسال"}
    >
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setLocation("/admin/shipping-methods")}
          data-testid="button-back"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات روش ارسال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>نام روش</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-testid="input-name"
                  placeholder="مثال: پست سریع، پیک موتوری"
                  required
                />
              </div>

              <div>
                <Label>توضیحات</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  data-testid="input-description"
                  rows={3}
                />
              </div>

              <div>
                <Label>هزینه (تومان)</Label>
                <Input
                  type="number"
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: e.target.value })
                  }
                  data-testid="input-cost"
                  required
                />
              </div>

              <div>
                <Label>روز تحویل تخمینی</Label>
                <Input
                  type="number"
                  value={formData.estimatedDays}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedDays: e.target.value })
                  }
                  data-testid="input-days"
                  min="1"
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                  data-testid="switch-active"
                />
                <Label>فعال</Label>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={mutation.isPending}
            data-testid="button-submit"
          >
            <Save className="w-4 h-4 ml-2" />
            {mutation.isPending ? "درحال ذخیره..." : "ذخیره"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
