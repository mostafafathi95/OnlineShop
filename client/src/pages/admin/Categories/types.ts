import type { Category } from "@shared/schema";

export interface CategoryFormData {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  sortOrder: number;
}
