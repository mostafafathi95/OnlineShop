import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Slider } from "@shared/schema";

interface CarouselProps {
  slides: Slider[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSlideClick?: (slide: Slider) => void;
}

export function Carousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  onSlideClick,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovering || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovering, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-testid="carousel-container"
    >
      {/* Slides */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
            data-testid={`slide-${idx}`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-4 p-4">
              <h2 className="text-3xl md:text-5xl font-bold">{s.title}</h2>
              {s.description && (
                <p className="text-lg md:text-xl max-w-2xl">{s.description}</p>
              )}
              {s.link && (
                <Button
                  size="lg"
                  onClick={() => {
                    onSlideClick?.(s);
                    window.location.href = s.link!;
                  }}
                  data-testid={`button-slide-${s.id}`}
                >
                  مشاهده بیشتر
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70"
        onClick={goToPrevious}
        data-testid="button-prev-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70"
        onClick={goToNext}
        data-testid="button-next-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            data-testid={`dot-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}
