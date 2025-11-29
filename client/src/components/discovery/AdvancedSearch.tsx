import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  inStock: boolean;
  categories: string[];
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "الکترونیکی",
    "پوشاک",
    "کتاب",
    "خانه و آشپزخانه",
    "ورزش",
    "اسباب‌بازی",
  ];

  const handleSearch = () => {
    onSearch({
      query,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      rating: minRating,
      inStock,
      categories: selectedCategories,
    });
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const hasActiveFilters =
    query ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000000 ||
    minRating > 0 ||
    inStock ||
    selectedCategories.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative group">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="جستجو برای محصولات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 text-right"
              dir="rtl"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            فیلترها
          </Button>
          <Button onClick={handleSearch}>جستجو</Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="p-6 space-y-6 animate-slide-down">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">محدوده قیمت</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1000000}
              step={10000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0].toLocaleString()} تومان</span>
              <span>{priceRange[1].toLocaleString()} تومان</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">حداقل امتیاز</Label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                    minRating === rating
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {rating}⭐
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="inStock"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked as boolean)}
            />
            <Label htmlFor="inStock" className="font-medium cursor-pointer">
              فقط موجود
            </Label>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">دسته‌بندی</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={category} className="cursor-pointer text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleSearch} className="flex-1">
              اعمال فیلترها
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setPriceRange([0, 1000000]);
                  setMinRating(0);
                  setInStock(false);
                  setSelectedCategories([]);
                }}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                حذف
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
