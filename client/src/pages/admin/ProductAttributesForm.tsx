import { useState } from "react";
import { ArrowRight, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "./AdminLayout";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function ProductAttributesForm() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "text" as "text" | "select" | "color" | "size",
    values: [] as string[],
  });
  const [newValue, setNewValue] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/product-attributes", {
        ...formData,
        values: formData.values.length > 0 ? formData.values : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/product-attributes"] });
      toast({ title: "ویژگی ایجاد شد" });
      setLocation("/admin/product-attributes");
    },
    onError: () => {
      toast({ title: "خطا در ایجاد ویژگی", variant: "destructive" });
    },
  });

  const handleAddValue = () => {
    if (newValue.trim()) {
      setFormData({
        ...formData,
        values: [...formData.values, newValue],
      });
      setNewValue("");
    }
  };

  const handleRemoveValue = (index: number) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: "نام ویژگی الزامی است", variant: "destructive" });
      return;
    }
    mutation.mutate();
  };

  return (
    <AdminLayout title="ویژگی جدید">
      <div className="space-y-6 max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => setLocation("/admin/product-attributes")}
          data-testid="button-back"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          بازگشت
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات ویژگی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>نام ویژگی</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-testid="input-name"
                  placeholder="مثال: رنگ، سایز، مدل"
                  required
                />
              </div>

              <div>
                <Label>نوع ویژگی</Label>
                <Select
                  value={formData.type}
                  onValueChange={(type: any) =>
                    setFormData({ ...formData, type })
                  }
                >
                  <SelectTrigger data-testid="select-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">متن</SelectItem>
                    <SelectItem value="select">انتخاب</SelectItem>
                    <SelectItem value="color">رنگ</SelectItem>
                    <SelectItem value="size">سایز</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.type === "select" ||
                formData.type === "color" ||
                formData.type === "size") && (
                <div>
                  <Label>مقادیر ویژگی</Label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="مقدار جدید..."
                        data-testid="input-value"
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddValue()
                        }
                      />
                      <Button
                        type="button"
                        onClick={handleAddValue}
                        variant="outline"
                        data-testid="button-add-value"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {formData.values.length > 0 && (
                      <div className="space-y-2">
                        {formData.values.map((value, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <span data-testid={`value-${i}`}>{value}</span>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => handleRemoveValue(i)}
                              data-testid={`button-remove-value-${i}`}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
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
