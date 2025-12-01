import type { Product, Category } from "@shared/schema";

export interface ProductFormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  comparePrice: string;
  sku: string;
  stock: string;
  categoryId: string;
  image: string;
  videoUrl: string;
  isActive: boolean;
  isFeatured: boolean;
  weight: string;
}

export interface ProductFormProps {
  isNew: boolean;
  product?: Product;
  categories?: Category[];
  productLoading: boolean;
}
