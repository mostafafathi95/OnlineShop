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
import type { News } from "@shared/schema";

export default function NewsForm() {
  const [, params] = useRoute("/admin/news/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    image: "",
    published: false,
  });

  const { data: news, isLoading } = useQuery<News>({
    queryKey: ["/api/news", params?.id],
    enabled: !isNew && !!params?.id,
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        slug: news.slug,
        content: news.content || "",
        excerpt: news.excerpt || "",
        image: news.image || "",
        published: news.published || false,
      });
    }
  }, [news]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (isNew) {
        return apiRequest("POST", "/api/news", formData);
      } else {
        return apiRequest("PATCH", `/api/news/${params?.id}`, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: isNew ? "خبر ایجاد شد" : "خبر به‌روزرسانی شد" });
      setLocation("/admin/news");
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
    <AdminLayout title={isNew ? "خبر جدید" : "ویرایش خبر"}>
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => setLocation("/admin/news")} data-testid="button-back">
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
                <Label>خلاصه</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  data-testid="input-excerpt"
                  rows={3}
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
              <div>
                <Label>تصویر</Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  data-testid="input-image"
                  placeholder="https://..."
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
