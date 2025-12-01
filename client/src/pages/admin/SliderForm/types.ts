export interface SliderFormData {
  title: string;
  slug: string;
  description: string;
  image: string;
  link: string;
  startDate: string;
  endDate: string;
  sortOrder: number;
  isActive: boolean;
  type: string;
}

export const SLIDER_TYPES = ["banner", "promotion", "featured"];
