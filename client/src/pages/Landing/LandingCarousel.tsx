import { Carousel } from "@/components/Carousel";
import type { Slider } from "@shared/schema";
import { Link } from "wouter";

interface LandingCarouselProps {
  sliders: Slider[];
}

export function LandingCarousel({ sliders }: LandingCarouselProps) {
  if (!sliders || sliders.length === 0) return null;

  return (
    <section className="w-full" data-testid="carousel-section">
      <Carousel
        slides={sliders}
        autoPlay={true}
        autoPlayInterval={4000}
      />
    </section>
  );
}

interface CategoriesProps {
  categories: any[];
}

export function LandingCategories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} data-testid={`category-${category.id}`}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3 h-40 bg-muted hover-elevate">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      data-testid={`category-image-${category.id}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📦</div>
                        <p className="text-xs text-muted-foreground">بدون عکس</p>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-center group-hover:text-primary transition-colors" data-testid={`category-name-${category.id}`}>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
