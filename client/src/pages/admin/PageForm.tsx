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
import type { Page } from "@shared/schema";

export default function PageForm() {
  const [, params] = useRoute("/admin/pages/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaDescription: "",
    published: false,
  });

  const { data: page, isLoading } = useQuery<Page>({
    queryKey: ["/api/pages", params?.id],
    enabled: !isNew && !!params?.id,
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content || "",
        metaDescription: page.metaDescription || "",
        published: page.published || false,
      });
    }
  }, [page]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (isNew) {
        return apiRequest("POST", "/api/pages", formData);
      } else {
        return apiRequest("PATCH", `/api/pages/${params?.id}`, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ title: isNew ? "صفحه ایجاد شد" : "صفحه به‌روزرسانی شد" });
      setLocation("/admin/pages");
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
    <AdminLayout title={isNew ? "صفحه جدید" : "ویرایش صفحه"}>
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setLocation("/admin/pages")} data-testid="button-back">
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات اساسی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>عنوان</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  data-testid="input-title"
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
                <Label>توضیح Meta</Label>
                <Input
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  data-testid="input-meta"
                />
              </div>
              <div>
                <Label>محتوا</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  data-testid="input-content"
                  rows={8}
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                  data-testid="switch-published"
                />
                <Label>منتشر شده</Label>
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
