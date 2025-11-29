import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AdminLayout from "./AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Setting } from "@shared/schema";

export default function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const { data: settings, isLoading } = useQuery<Setting[]>({
    queryKey: ["/api/settings"],
    onSuccess: (data) => {
      const settingsMap = data.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
      setValues(settingsMap);
    },
  });

  const mutation = useMutation({
    mutationFn: async (key: string) => {
      return apiRequest("PATCH", `/api/settings/${key}`, { value: values[key] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "تنظیمات ذخیره شد" });
    },
  });

  if (isLoading) return <AdminLayout title="تنظیمات"><Skeleton className="h-96" /></AdminLayout>;

  return (
    <AdminLayout title="تنظیمات فروشگاه">
      <div className="space-y-6 max-w-2xl">
        {settings?.map((setting) => (
          <Card key={setting.key}>
            <CardHeader>
              <CardTitle>{setting.key}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{setting.key}</Label>
                <div className="flex gap-2">
                  <Input
                    value={values[setting.key] || ""}
                    onChange={(e) => setValues({ ...values, [setting.key]: e.target.value })}
                    data-testid={`input-setting-${setting.key}`}
                  />
                  <Button
                    onClick={() => mutation.mutate(setting.key)}
                    disabled={mutation.isPending}
                    data-testid={`button-save-${setting.key}`}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
