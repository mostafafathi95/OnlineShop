import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BannerForm } from "./BannerForm";
import type { InsertBanner } from "@shared/schema";

interface BannerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: number | null;
  formData: InsertBanner;
  setFormData: (data: InsertBanner) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
  onSubmit: () => void;
  isPending: boolean;
  onOpenDialog: () => void;
}

export function BannerDialog({
  isOpen,
  onOpenChange,
  editingId,
  formData,
  setFormData,
  uploading,
  setUploading,
  onSubmit,
  isPending,
  onOpenDialog,
}: BannerDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onOpenDialog} data-testid="button-add-banner">
          <Plus className="h-4 w-4 ml-2" />
          افزودن بنر
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingId ? "ویرایش بنر" : "افزودن بنر جدید"}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? "بنر موجود را ویرایش کنید"
              : "یک بنر تبلیغاتی جدید ایجاد کنید"}
          </DialogDescription>
        </DialogHeader>

        <BannerForm
          formData={formData}
          setFormData={setFormData}
          uploading={uploading}
          setUploading={setUploading}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel-banner"
          >
            لغو
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            data-testid="button-save-banner"
          >
            {editingId ? "به‌روز کردن" : "افزودن"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
