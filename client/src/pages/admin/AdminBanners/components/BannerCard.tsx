import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Banner } from "@shared/schema";

interface BannerCardProps {
  banner: Banner;
  index: number;
  total: number;
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  onMoveUp: (banner: Banner) => void;
  onMoveDown: (banner: Banner) => void;
}

export function BannerCard({
  banner,
  index,
  total,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: BannerCardProps) {
  return (
    <Card
      style={{
        backgroundColor: `${banner.backgroundColor}20`,
        borderColor: banner.backgroundColor,
        borderWidth: "2px",
      }}
      className="overflow-hidden"
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold">{banner.title}</h3>
              <Badge variant={banner.isActive ? "default" : "secondary"}>
                {banner.isActive ? "فعال" : "غیرفعال"}
              </Badge>
            </div>
            {banner.subtitle && (
              <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
            )}
            {banner.badgeText && (
              <p className="text-sm text-muted-foreground">
                نشان: {banner.badgeText}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {index > 0 && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onMoveUp(banner)}
                data-testid={`button-move-up-${banner.id}`}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            {index < total - 1 && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onMoveDown(banner)}
                data-testid={`button-move-down-${banner.id}`}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}

            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(banner)}
              data-testid={`button-edit-banner-${banner.id}`}
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                  data-testid={`button-delete-banner-${banner.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                <AlertDialogDescription>
                  این بنر حذف خواهد شد
                </AlertDialogDescription>
                <AlertDialogCancel>لغو</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(banner.id)}
                  className="bg-red-600 hover:bg-red-700"
                  data-testid="button-confirm-delete-banner"
                >
                  حذف کردن
                </AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
