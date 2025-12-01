import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileJson, FileText } from "lucide-react";
import AdminLayout from "./AdminLayout";

const AdminExport = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = async (type: "products" | "orders" | "users" | "analytics") => {
    try {
      setLoading(type);
      const response = await fetch(`/api/admin/export/${type}`);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-${Date.now()}.${type === "analytics" || type === "orders" ? "json" : "csv"}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setLoading(null);
    }
  };

  const exports = [
    {
      title: "محصولات",
      description: "صادرات تمام محصولات به فرمت CSV",
      icon: FileText,
      type: "products" as const
    },
    {
      title: "سفارشات",
      description: "صادرات تمام سفارشات به فرمت JSON",
      icon: FileJson,
      type: "orders" as const
    },
    {
      title: "کاربران",
      description: "صادرات لیست کاربران به فرمت CSV",
      icon: FileText,
      type: "users" as const
    },
    {
      title: "تحلیلات",
      description: "صادرات گزارش تحلیلات به فرمت JSON",
      icon: FileJson,
      type: "analytics" as const
    }
  ];

  return (
    <AdminLayout title="صادرات داده‌ها">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">صادرات داده‌ها</h1>
          <p className="text-muted-foreground mt-1">صادرات اطلاعات به فرمت‌های مختلف</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exports.map((exp) => {
            const Icon = exp.icon;
            return (
              <Card key={exp.type} className="p-6 hover-elevate">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description}
                    </p>
                  </div>
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button
                  onClick={() => handleExport(exp.type)}
                  disabled={loading === exp.type}
                  className="w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  {loading === exp.type ? "درحال صادرات..." : "صادرات"}
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h3 className="font-bold mb-2">نکات مهم:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ تمام اطلاعات صادرات شده فارسی است</li>
            <li>✓ فایل‌های CSV با کدگذاری UTF-8 ذخیره می‌شوند</li>
            <li>✓ می‌تواند از این فایل‌ها برای پشتیبان‌گیری استفاده کنید</li>
            <li>✓ صادرات شامل تمام رکوردهای فعل است</li>
          </ul>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminExport;
