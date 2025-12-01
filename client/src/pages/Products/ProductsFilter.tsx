import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX, PRICE_RANGE_STEP } from "./types";

interface ProductsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  categories: Category[] | undefined;
  categoriesLoading: boolean;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function ProductsFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  categories,
  categoriesLoading,
  hasActiveFilters,
  clearFilters,
}: ProductsFilterProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-2 block">جستجو</label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="نام محصول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            data-testid="input-filter-search"
          />
        </div>
      </div>

      <Accordion type="single" collapsible defaultValue="categories" className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">دسته‌بندی‌ها</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {categoriesLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))
              ) : (
                <>
                  <div
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover-elevate ${
                      !selectedCategory ? "bg-primary/10" : ""
                    }`}
                    onClick={() => setSelectedCategory("")}
                    data-testid="filter-category-all"
                  >
                    <Checkbox checked={!selectedCategory} />
                    <span className="text-sm">همه دسته‌بندی‌ها</span>
                  </div>
                  {categories?.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover-elevate ${
                        selectedCategory === category.slug ? "bg-primary/10" : ""
                      }`}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.slug ? "" : category.slug
                        )
                      }
                      data-testid={`filter-category-${category.slug}`}
                    >
                      <Checkbox checked={selectedCategory === category.slug} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">محدوده قیمت</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2 px-1">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={PRICE_RANGE_MIN}
                max={PRICE_RANGE_MAX}
                step={PRICE_RANGE_STEP}
                data-testid="slider-price-range"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{priceRange[0].toLocaleString("fa-IR")} تومان</span>
                <span>{priceRange[1].toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
          data-testid="button-clear-filters"
        >
          <X className="ml-2 h-4 w-4" />
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
}
