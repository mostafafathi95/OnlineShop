import { Heart } from "lucide-react";
import { useState } from "react";

interface WishlistHeartProps {
  productId: number;
  size?: "sm" | "md" | "lg";
}

export function WishlistHeart({ productId, size = "md" }: WishlistHeartProps) {
  const [isWishlisted, setIsWishlisted] = useState(() => {
    if (typeof window === "undefined") return false;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishlist.includes(productId);
  });

  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      const updated = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
    } else {
      localStorage.setItem("wishlist", JSON.stringify([...wishlist, productId]));
    }

    setIsWishlisted(!isWishlisted);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-1 rounded-full transition-all duration-300 hover:scale-110 hover-elevate"
      data-testid="button-wishlist-toggle"
    >
      <Heart
        className={`${sizeMap[size]} transition-all duration-300 ${
          isWishlisted
            ? "fill-destructive text-destructive animate-scale-pulse"
            : "text-muted-foreground hover:text-destructive"
        }`}
      />
    </button>
  );
}
