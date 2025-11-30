import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [expandedCategory, setExpandedCategory] = useState<string>("categories");
  const [priceRange, setPriceRange] = useState([0, 100000000]);

  const { data: filters = {} } = useQuery({
    queryKey: ["/api/search/filters"],
    queryFn: async () => {
      const res = await fetch("/api/search/filters");
      return res.json();
    },
  });

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFilterChange({ minPrice: values[0], maxPrice: values[1] });
  };

  return (
    <div className="space-y-6" data-testid="search-filters">
      {/* Price Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "price" ? "" : "price")}
          className="w-full flex items-center justify-between font-semibold mb-3"
          data-testid="button-filter-price"
        >
          قیمت
          <ChevronDown size={16} />
        </button>
        {expandedCategory === "price" && (
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={filters.priceRange?.[1] || 100000000}
              step={100000}
              data-testid="slider-price-range"
            />
            <div className="flex justify-between text-sm">
              <span>{(priceRange[0] / 1000000).toFixed(1)}M</span>
              <span>{(priceRange[1] / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        )}
      </div>

      {/* Categories Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setExpandedCategory(expandedCategory === "categories" ? "" : "categories")}
          className="w-full flex items-center justify-between font-semibold mb-3"
          data-testid="button-filter-categories"
        >
          دسته‌بندی
          <ChevronDown size={16} />
        </button>
        {expandedCategory === "categories" && (
          <div className="space-y-2">
            {filters.categories?.map((cat: any) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  data-testid={`checkbox-category-${cat.id}`}
                  onCheckedChange={(checked) => {
                    onFilterChange({ categoryId: checked ? cat.id : undefined });
                  }}
                />
                <span className="text-sm">{cat.name}</span>
                <span className="text-xs text-muted-foreground">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
