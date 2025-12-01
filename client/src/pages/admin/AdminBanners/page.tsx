import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useBannerForm, useBannerMutations } from "./hooks";
import { BannerDialog, BannerCard } from "./components";
import { useToast } from "@/hooks/use-toast";
import type { Banner } from "@shared/schema";

export default function AdminBanners() {
  const { toast } = useToast();
  const {
    formData,
    setFormData,
    editingId,
    setEditingId,
    uploading,
    setUploading,
    handleEdit,
    resetForm,
    getDefaultFormData,
  } = useBannerForm();

  const { createMutation, updateMutation, deleteMutation, moveMutation } =
    useBannerMutations();

  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners/admin"],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDialog = () => {
    setEditingId(null);
    setFormData(getDefaultFormData());
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast({ title: "عنوان الزامی است", variant: "destructive" });
      return;
    }

    if (editingId) {
      updateMutation.mutate(
        { ...formData, id: editingId },
        {
          onSuccess: () => {
            resetForm();
            setIsOpen(false);
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          resetForm();
          setIsOpen(false);
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleMoveUp = (banner: Banner) => {
    moveMutation.mutate({
      id: banner.id,
      sortOrder: banner.sortOrder - 1,
    });
  };

  const handleMoveDown = (banner: Banner) => {
    moveMutation.mutate({
      id: banner.id,
      sortOrder: banner.sortOrder + 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">مدیریت بنرها</h1>
        <BannerDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          uploading={uploading}
          setUploading={setUploading}
          onSubmit={handleSubmit}
          isPending={createMutation.isPending || updateMutation.isPending}
          onOpenDialog={handleOpenDialog}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8">در حال بارگذاری...</div>
      ) : banners.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            هیچ بنری یافت نشد
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {banners.map((banner, index) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              index={index}
              total={banners.length}
              onEdit={(b) => {
                handleEdit(b);
                setIsOpen(true);
              }}
              onDelete={handleDelete}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ))}
        </div>
      )}
    </div>
  );
}
