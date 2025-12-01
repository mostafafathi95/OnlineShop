import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SORT_OPTIONS } from "./types";

interface ProductsSortingProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  productCount: number;
}

export function ProductsSorting({
  sortBy,
  setSortBy,
  productCount,
}: ProductsSortingProps) {
  return (
    <div className="flex items-center gap-2 mr-auto">
      <span className="text-sm text-muted-foreground hidden sm:inline">
        {productCount || 0} محصول
      </span>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-40" data-testid="select-sort">
          <SelectValue placeholder="مرتب‌سازی" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
