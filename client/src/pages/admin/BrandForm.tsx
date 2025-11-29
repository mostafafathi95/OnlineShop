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
import type { Brand } from "@shared/schema";

export default function BrandForm() {
  const [, params] = useRoute("/admin/brands/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    logo: "",
    website: "",
    active: true,
  });

  const { data: brand, isLoading } = useQuery<Brand>({
    queryKey: ["/api/brands", params?.id],
    enabled: !isNew && !!params?.id,
  });

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        slug: brand.slug,
        description: brand.description || "",
        logo: brand.logo || "",
        website: brand.website || "",
        active: brand.active || true,
      });
    }
  }, [brand]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (isNew) {
        return apiRequest("POST", "/api/brands", formData);
      } else {
        return apiRequest("PATCH", `/api/brands/${params?.id}`, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/brands"] });
      toast({ title: isNew ? "برند ایجاد شد" : "برند به‌روزرسانی شد" });
      setLocation("/admin/brands");
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
    <AdminLayout title={isNew ? "برند جدید" : "ویرایش برند"}>
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setLocation("/admin/brands")} data-testid="button-back">
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات برند</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>نام برند</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="input-name"
                  required
                />
              </div>
              <div>
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  data-testid="input-slug"
                  required
                />
              </div>
              <div>
                <Label>توضیحات</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  data-testid="input-description"
                  rows={3}
                />
              </div>
              <div>
                <Label>URL لوگو</Label>
                <Input
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  data-testid="input-logo"
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label>وبسایت</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  data-testid="input-website"
                  placeholder="https://..."
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
