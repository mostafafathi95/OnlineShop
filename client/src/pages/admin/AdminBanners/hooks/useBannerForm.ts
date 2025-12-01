import { useState } from "react";
import type { Banner, InsertBanner } from "@shared/schema";

const DEFAULT_FORM_DATA: InsertBanner = {
  title: "",
  subtitle: "",
  badgeText: "",
  description: "",
  link: "",
  backgroundColor: "#ef4444",
  textColor: "#ffffff",
  imageUrl: "",
  icon: "📢",
  isActive: true,
  sortOrder: 0,
};

export const useBannerForm = () => {
  const [formData, setFormData] = useState<InsertBanner>(DEFAULT_FORM_DATA);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleEdit = (banner: Banner) => {
    setEditingId(banner.id);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      badgeText: banner.badgeText || "",
      description: banner.description || "",
      link: banner.link || "",
      backgroundColor: banner.backgroundColor,
      textColor: banner.textColor,
      imageUrl: banner.imageUrl || "",
      icon: banner.icon || "",
      isActive: banner.isActive,
      sortOrder: banner.sortOrder,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM_DATA);
    setUploading(false);
  };

  const getDefaultFormData = () => DEFAULT_FORM_DATA;

  return {
    formData,
    setFormData,
    editingId,
    setEditingId,
    uploading,
    setUploading,
    handleEdit,
    resetForm,
    getDefaultFormData,
  };
};
