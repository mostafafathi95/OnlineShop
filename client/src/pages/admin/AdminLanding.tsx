import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "./AdminLayout";
import { landingPageSections } from "@shared/schema";

type LandingPageSection = typeof landingPageSections.$inferSelect;

export default function AdminLanding() {
  const { toast } = useToast();

  const { data: sections = [], isLoading } = useQuery<LandingPageSection[]>({
    queryKey: ["/api/admin/landing-sections"],
  });

  const updateMutation = useMutation({
    mutationFn: (section: LandingPageSection) =>
      apiRequest("PUT", `/api/admin/landing-sections/${section.id}`, { isVisible: section.isVisible }),
    onSuccess: (updatedSection: LandingPageSection) => {
      // Invalidate both admin and public queries for immediate sync
      queryClient.invalidateQueries({ queryKey: ["/api/admin/landing-sections"] });
      queryClient.invalidateQueries({ queryKey: ["/api/landing-sections"] });
      
      toast({
        title: updatedSection.isVisible ? "بخش فعال شد" : "بخش غیرفعال شد",
        description: `${updatedSection.title} با موفقیت به‌روز شد`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error?.message || "مشکلی در به‌روز‌رسانی پیش آمد",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (section: LandingPageSection) => {
    updateMutation.mutate({ ...section, isVisible: !section.isVisible });
  };

  return (
    <AdminLayout title="مدیریت صفحه اصلی">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">مدیریت بخش‌های صفحه اصلی</h1>
        <p className="text-muted-foreground">
          نمایش یا عدم نمایش بخش‌های مختلف صفحه اصلی سایت. تغییرات فوری اعمال می‌شوند.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>در حال بارگذاری...</p>
          </div>
        </div>
      ) : sections.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">هیچ بخشی یافت نشد</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card 
              key={section.id} 
              className="p-6 hover-elevate transition-all" 
              data-testid={`card-section-${section.key}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 
                    className="font-bold text-lg mb-1" 
                    data-testid={`text-section-title-${section.key}`}
                  >
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {section.isVisible ? (
                    <>
                      <Eye className="h-4 w-4 text-green-600" />
                      <span>فعال</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 text-red-600" />
                      <span>غیرفعال</span>
                    </>
                  )}
                </div>
                <Switch
                  checked={section.isVisible}
                  onCheckedChange={() => handleToggle(section)}
                  disabled={updateMutation.isPending}
                  data-testid={`switch-section-${section.key}`}
                  aria-label={`${section.title} را کنترل کن`}
                />
              </div>

              {updateMutation.isPending && (
                <div className="mt-3 flex items-center justify-center text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin ml-1" />
                  در حال به‌روز‌رسانی...
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
