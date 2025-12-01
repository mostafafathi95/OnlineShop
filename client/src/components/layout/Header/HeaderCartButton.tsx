import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

export function HeaderCartButton({ itemCount, onCartClick }: HeaderCartButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onCartClick}
      className="relative"
      data-testid="button-cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Button>
  );
}
