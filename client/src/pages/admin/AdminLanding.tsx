import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Section {
  id: number;
  key: string;
  title: string;
  description: string;
  isVisible: boolean;
  sortOrder: number;
}

export default function AdminLanding() {
  const { toast } = useToast();

  const { data: sections = [], isLoading } = useQuery<Section[]>({
    queryKey: ["/api/admin/landing-sections"],
  });

  const updateMutation = useMutation({
    mutationFn: (section: Section) =>
      apiRequest(`/api/admin/landing-sections/${section.id}`, {
        method: "PUT",
        body: JSON.stringify({ isVisible: section.isVisible }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/landing-sections"] });
      toast({ title: "تنظیمات ذخیره شد" });
    },
  });

  const handleToggle = (section: Section) => {
    updateMutation.mutate({ ...section, isVisible: !section.isVisible });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">مدیریت بخش‌های صفحه اصلی</h1>
        <p className="text-muted-foreground">
          نمایش یا عدم نمایش بخش‌های مختلف صفحه اصلی سایت
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">در حال بارگذاری...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.id} className="p-6" data-testid={`card-section-${section.key}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg" data-testid={`text-section-title-${section.key}`}>
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm font-medium">
                  {section.isVisible ? "📺 نمایش" : "🚫 پنهان"}
                </span>
                <Switch
                  checked={section.isVisible}
                  onCheckedChange={() => handleToggle(section)}
                  disabled={updateMutation.isPending}
                  data-testid={`switch-section-${section.key}`}
                />
              </div>

              {updateMutation.isPending && (
                <div className="mt-2 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
