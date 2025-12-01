export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: string;
  mobileFiltersOpen: boolean;
}

export interface SortOption {
  label: string;
  value: string;
}

export const PRICE_RANGE_MIN = 0;
export const PRICE_RANGE_MAX = 10000000;
export const PRICE_RANGE_STEP = 100000;

export const SORT_OPTIONS: SortOption[] = [
  { label: "جدیدترین", value: "newest" },
  { label: "ارزان‌ترین", value: "price-asc" },
  { label: "گران‌ترین", value: "price-desc" },
  { label: "پرفروش‌ترین", value: "popular" },
];
