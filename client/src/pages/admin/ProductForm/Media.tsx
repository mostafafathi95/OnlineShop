import { X, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductFormData } from "./types";

interface MediaProps {
  formData: ProductFormData;
  onChange: (data: Partial<ProductFormData>) => void;
}

export function Media({ formData, onChange }: MediaProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>تصویر محصول</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.image ? (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={formData.image}
                  alt="تصویر محصول"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => onChange({ image: "" })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">آپلود تصویر</p>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="imageUrl">لینک تصویر</Label>
              <Input
                id="imageUrl"
                value={formData.image}
                onChange={(e) => onChange({ image: e.target.value })}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ویدیو محصول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="videoUrl">لینک ویدیو (YouTube یا MP4)</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => onChange({ videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground mt-2">
              YouTube یا لینک مستقیم MP4
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
