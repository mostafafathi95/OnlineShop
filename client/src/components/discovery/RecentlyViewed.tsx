import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ViewedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  viewedAt: number;
}

export function RecentlyViewed() {
  const [viewed, setViewed] = useState<ViewedProduct[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("recentlyViewed");
    if (saved) {
      const products = JSON.parse(saved)
        .sort((a: ViewedProduct, b: ViewedProduct) => b.viewedAt - a.viewedAt)
        .slice(0, 12);
      setViewed(products);
    }
  }, []);

  if (viewed.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recently-viewed-scroll");
    if (container) {
      const scrollAmount = 300;
      const newPosition =
        scrollPosition + (direction === "right" ? scrollAmount : -scrollAmount);
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">اخیراً مشاهده شده</h2>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => scroll("left")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => scroll("right")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        id="recently-viewed-scroll"
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {viewed.map((product) => (
          <Card
            key={product.id}
            className="flex-shrink-0 w-40 overflow-hidden hover-elevate cursor-pointer group"
          >
            <div className="relative overflow-hidden bg-muted h-40">
              <img
                src={product.image || "https://placehold.co/160x160"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-3 space-y-2">
              <p className="text-sm font-medium line-clamp-2">{product.name}</p>
              <p className="text-primary font-bold">
                {product.price.toLocaleString()} تومان
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function trackProductView(product: any) {
  const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
  const filtered = viewed.filter((p: ViewedProduct) => p.id !== product.id);
  const updated = [
    {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      viewedAt: Date.now(),
    },
    ...filtered,
  ];
  localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 50)));
}
