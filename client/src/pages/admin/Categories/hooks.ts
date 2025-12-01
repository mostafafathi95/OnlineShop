import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";
import type { CategoryFormData } from "./types";

const initialFormData: CategoryFormData = {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  image: "",
  isActive: true,
  sortOrder: 0,
};

export function useCategoryForm() {
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const resetForm = () => setFormData(initialFormData);
  return { formData, setFormData, resetForm };
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/admin/categories"],
  });
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function parseCategoryForEdit(category: Category): CategoryFormData {
  return {
    name: category.name,
    nameEn: category.nameEn || "",
    slug: category.slug,
    description: category.description || "",
    image: category.image || "",
    isActive: category.isActive,
    sortOrder: category.sortOrder || 0,
  };
}
