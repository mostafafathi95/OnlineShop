import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

export default function Products() {
  useEffect(() => {
    document.title = "محصولات | فروشگاه اینترنتی";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'مشاهده کاتالوگ کامل محصولات فروشگاه اینترنتی. انتخاب از میان هزاران محصول با تخفیف‌های ویژه.');
  }, []);

  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  const params = new URLSearchParams(searchParams);

  const [searchQuery, setSearchQuery] = useState(params.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(params.get("category") || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [sortBy, setSortBy] = useState(params.get("sort") || "newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery, category: selectedCategory, sort: sortBy }],
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const updateURL = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("search", searchQuery);
    if (selectedCategory) newParams.set("category", selectedCategory);
    if (sortBy && sortBy !== "newest") newParams.set("sort", sortBy);
    const queryString = newParams.toString();
    setLocation(`/products${queryString ? `?${queryString}` : ""}`);
  };

  useEffect(() => {
    const timer = setTimeout(updateURL, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 10000000]);
    setSortBy("newest");
    setLocation("/products");
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== "newest";

  const FilterContent = () => (
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
                min={0}
                max={10000000}
                step={100000}
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">محصولات</h1>
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                جستجو: {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1">
                دسته‌بندی: {categories?.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <h2 className="font-semibold text-lg">فیلترها</h2>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                    <Filter className="ml-2 h-4 w-4" />
                    فیلترها
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="mr-2">
                        فعال
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>فیلترها</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2 mr-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {products?.length || 0} محصول
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="select-sort">
                    <SelectValue placeholder="مرتب‌سازی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">جدیدترین</SelectItem>
                    <SelectItem value="price-asc">ارزان‌ترین</SelectItem>
                    <SelectItem value="price-desc">گران‌ترین</SelectItem>
                    <SelectItem value="popular">پرفروش‌ترین</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ProductGrid products={products || []} isLoading={productsLoading} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
