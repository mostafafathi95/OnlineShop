import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Product, Slider } from "@shared/schema";

export function useLandingData() {
  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 12 }],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products", { limit: 8, sort: "newest" }],
  });

  const { data: sliders = [] } = useQuery<Slider[]>({
    queryKey: ["/api/sliders/active"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: landingSections = [], isLoading: sectionsLoading, error: sectionsError } = useQuery({
    queryKey: ["/api/landing-sections"],
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    featuredProducts,
    products,
    sliders,
    categories,
    landingSections,
    productsLoading,
    sectionsLoading,
    sectionsError,
  };
}

export function usePageMeta() {
  useEffect(() => {
    document.title = "فروشگاه اینترنتی | محصولات با بهترین قیمت";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'فروشگاه اینترنتی پیشرو با ارسال سریع و ضمانت اصالت کالا. خریدتان از ما کاملاً امن و قابل اعتماد است.');
    }
  }, []);
}

export function useIsSectionVisible() {
  const { landingSections, sectionsError } = useLandingData();

  return (key: string): boolean => {
    if (sectionsError) return true;
    if (landingSections.length === 0 && !sectionsError) return false;
    return landingSections.some(s => s.key === key && s.isVisible);
  };
}
