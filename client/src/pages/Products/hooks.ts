import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from "./types";

export function useProductFilters() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(searchParams);

  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(params.get("category") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_RANGE_MIN,
    PRICE_RANGE_MAX,
  ]);
  const [sortBy, setSortBy] = useState(params.get("sort") || "newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    setLocation,
  };
}

export function useProductQueries(searchQuery: string, selectedCategory: string, sortBy: string) {
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery, category: selectedCategory, sort: sortBy }],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return {
    products,
    categories,
    productsLoading,
    categoriesLoading,
  };
}

export function useFilterURL(
  searchQuery: string,
  selectedCategory: string,
  sortBy: string,
  setLocation: (path: string) => void
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams();
      if (searchQuery) newParams.set("search", searchQuery);
      if (selectedCategory) newParams.set("category", selectedCategory);
      if (sortBy && sortBy !== "newest") newParams.set("sort", sortBy);
      const queryString = newParams.toString();
      setLocation(`/products${queryString ? `?${queryString}` : ""}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy, setLocation]);
}

export function usePageMeta() {
  useEffect(() => {
    document.title = "محصولات | فروشگاه اینترنتی";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "مشاهده کاتالوگ کامل محصولات فروشگاه اینترنتی. انتخاب از میان هزاران محصول با تخفیف‌های ویژه."
      );
    }
  }, []);
}
