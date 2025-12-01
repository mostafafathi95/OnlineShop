import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductGrid from "@/components/products/ProductGrid";
import type { Product } from "@shared/schema";

interface LandingProductsProps {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
}

export function LandingProducts({ products, featuredProducts, isLoading }: LandingProductsProps) {
  const [activeTab, setActiveTab] = useState<"newest" | "popular" | "sale">("newest");

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">محصولات منتخب</h2>
              <p className="text-muted-foreground">جدیدترین محصولات</p>
            </div>
          </div>
          <div className="flex gap-2 mb-8">
            {(["newest", "popular", "sale"] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="rounded-full"
              >
                {tab === "newest" && "جدیدترین"}
                {tab === "popular" && "محبوب‌ترین"}
                {tab === "sale" && "تخفیف‌دار"}
              </Button>
            ))}
          </div>
          <ProductGrid products={products || []} isLoading={isLoading} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">محصولات محبوب</h2>
              <p className="text-muted-foreground">پرفروش‌ترین محصولات</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                مشاهده همه
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts?.slice(0, 8) || []} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
}
