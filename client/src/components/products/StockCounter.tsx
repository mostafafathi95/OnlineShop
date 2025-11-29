import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StockCounterProps {
  stock: number;
  threshold?: number;
}

export default function StockCounter({ stock, threshold = 10 }: StockCounterProps) {
  const isLowStock = stock > 0 && stock <= threshold;
  const isOutOfStock = stock <= 0;

  if (isOutOfStock) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <span className="text-destructive font-medium">ناموجود</span>
      </div>
    );
  }

  if (isLowStock) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
          فقط {stock} عدد باقی‌مانده
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      <span className="text-green-600 dark:text-green-400 font-medium">
        موجود در انبار ({stock} عدد)
      </span>
    </div>
  );
}
