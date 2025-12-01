import { Filter, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet as SheetComponent, SheetContent as SheetContentComponent, SheetHeader as SheetHeaderComponent, SheetTitle as SheetTitleComponent, SheetTrigger as SheetTriggerComponent } from "@/components/ui/sheet";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { AdvancedSearch } from "@/components/discovery/AdvancedSearch";
import { RecentlyViewed } from "@/components/discovery/RecentlyViewed";
import { ProductsFilter } from "./ProductsFilter";
import { ProductsSorting } from "./ProductsSorting";
import { useProductFilters, useProductQueries, useFilterURL, usePageMeta } from "./hooks";
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from "./types";
import { X } from "lucide-react";

export default function Products() {
  usePageMeta();

  const {
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
  } = useProductFilters();

  const { products, categories, productsLoading, categoriesLoading } = useProductQueries(
    searchQuery,
    selectedCategory,
    sortBy
  );

  useFilterURL(searchQuery, selectedCategory, sortBy, setLocation);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([PRICE_RANGE_MIN, PRICE_RANGE_MAX]);
    setSortBy("newest");
    setLocation("/products");
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== "newest";

  const categoryName = categories?.find((c) => c.slug === selectedCategory)?.name;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <AdvancedSearch
            onSearch={(filters) => {
              if (filters.query) setSearchQuery(filters.query);
              if (filters.categories.length > 0) setSelectedCategory(filters.categories[0]);
            }}
          />
        </div>

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
                دسته‌بندی: {categoryName}
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
              <ProductsFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                categories={categories}
                categoriesLoading={categoriesLoading}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-4">
              <SheetComponent open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTriggerComponent asChild>
                  <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
                    <Filter className="ml-2 h-4 w-4" />
                    فیلترها
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="mr-2">
                        فعال
                      </Badge>
                    )}
                  </Button>
                </SheetTriggerComponent>
                <SheetContentComponent side="right" className="w-80">
                  <SheetHeaderComponent>
                    <SheetTitleComponent>فیلترها</SheetTitleComponent>
                  </SheetHeaderComponent>
                  <div className="mt-6">
                    <ProductsFilter
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      categories={categories}
                      categoriesLoading={categoriesLoading}
                      hasActiveFilters={hasActiveFilters}
                      clearFilters={clearFilters}
                    />
                  </div>
                </SheetContentComponent>
              </SheetComponent>

              <ProductsSorting
                sortBy={sortBy}
                setSortBy={setSortBy}
                productCount={products?.length || 0}
              />
            </div>

            <ProductGrid products={products || []} isLoading={productsLoading} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <RecentlyViewed />
        </div>
      </div>
    </Layout>
  );
}
