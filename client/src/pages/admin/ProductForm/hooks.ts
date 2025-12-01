import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";
import type { ProductFormData } from "./types";

const initialFormData: ProductFormData = {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  shortDescription: "",
  price: "",
  comparePrice: "",
  sku: "",
  stock: "0",
  categoryId: "",
  image: "",
  videoUrl: "",
  isActive: true,
  isFeatured: false,
  weight: "",
};

export function useProductForm(product?: Product) {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        nameEn: product.nameEn || "",
        slug: product.slug,
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        price: product.price.toString(),
        comparePrice: product.comparePrice?.toString() || "",
        sku: product.sku || "",
        stock: product.stock.toString(),
        categoryId: product.categoryId?.toString() || "",
        image: product.image || "",
        videoUrl: (product as any).videoUrl || "",
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        weight: product.weight?.toString() || "",
      });
    }
  }, [product]);

  const resetForm = () => setFormData(initialFormData);

  return { formData, setFormData, resetForm };
}

export function useProductCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\u0600-\u06FF\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
