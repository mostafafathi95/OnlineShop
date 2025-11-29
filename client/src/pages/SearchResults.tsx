import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, BarChart3 } from "lucide-react";
import type { Product } from "@shared/schema";

export default function SearchResults() {
  const [location] = useLocation();
  const queryParam = new URLSearchParams(location.split("?")[1]).get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    document.title = `جستجو برای "${searchQuery}" | فروشگاه اینترنتی`;
  }, [searchQuery]);

  // Fetch search results
  const { data: searchData, isLoading } = useQuery({
    queryKey: ["/api/search", searchQuery],
    enabled: !!searchQuery,
  });

  // Fetch filters
  const { data: filtersData } = useQuery({
    queryKey: ["/api/search/filters"],
  });

  const results: Product[] = searchData?.results || [];
  const filters = filtersData || { brands: [], priceRange: [0, 0] };

  // Filter results by price
  const filteredResults = results.filter((p) => {
    const price = parseInt(p.price as any) || 0;
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (parseInt(a.price as any) || 0) - (parseInt(b.price as any) || 0);
      case "price-high":
        return (parseInt(b.price as any) || 0) - (parseInt(a.price as any) || 0);
      case "newest":
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">نتایج جستجو</h1>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو کنید..."
              className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              data-testid="input-search-results"
            />
            <Button data-testid="button-search-again">جستجو</Button>
          </div>
        </div>

        {/* Results Info */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="secondary">{sortedResults.length} نتیجه</Badge>
            {searchData?.resultsCount === 0 && (
              <Badge variant="destructive">بدون نتیجه</Badge>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  فیلترها
                </h3>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold mb-3 block">محدوده قیمت</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={filters.priceRange?.[0] || 0}
                  max={filters.priceRange?.[1] || 10000000}
                  step={100000}
                  data-testid="slider-price-range"
                />
                <div className="text-xs text-slate-500 mt-2">
                  {new Intl.NumberFormat("fa-IR").format(priceRange[0])} - {new Intl.NumberFormat("fa-IR").format(priceRange[1])}
                </div>
              </div>

              {/* Brands */}
              {filters.brands && filters.brands.length > 0 && (
                <div>
                  <label className="text-sm font-semibold mb-3 block">برندها</label>
                  <div className="space-y-2">
                    {filters.brands.map((brand: string) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          data-testid={`filter-brand-${brand}`}
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setPriceRange([0, filters.priceRange?.[1] || 10000000]);
                }}
                data-testid="button-clear-filters"
              >
                پاک کردن فیلترها
              </Button>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-slate-600" />
                <span className="text-sm text-slate-600">مرتب‌سازی:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">بیشترین ارتباط</SelectItem>
                  <SelectItem value="newest">جدیدترین</SelectItem>
                  <SelectItem value="price-low">قیمت: کم به زیاد</SelectItem>
                  <SelectItem value="price-high">قیمت: زیاد به کم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : sortedResults.length > 0 ? (
              <ProductGrid products={sortedResults} />
            ) : (
              <Card className="p-12 text-center">
                <Search className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">نتیجه‌ای یافت نشد</h3>
                <p className="text-slate-600">لطفاً شرایط جستجو یا فیلترها را تغییر دهید</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
