import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Banner } from "@shared/schema";

export function BannerSection() {
  const { data: banners = [], isLoading } = useQuery<Banner[]>({
    queryKey: ["/api/banners"],
  });

  if (isLoading || banners.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">پیشنهادات ویژه</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {banners.slice(0, 3).map((banner) => (
            <Link
              key={banner.id}
              href={banner.link || "/products"}
              data-testid={`banner-${banner.id}`}
            >
              <div
                className="relative overflow-hidden rounded-lg hover-elevate cursor-pointer h-64 transition-transform group"
                style={{
                  backgroundColor: banner.backgroundColor || "#f5f5f5",
                }}
              >
                {banner.imageUrl && (
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    data-testid={`banner-image-${banner.id}`}
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                <div className="relative p-6 h-full flex flex-col justify-between text-white">
                  <div>
                    <div className="text-5xl mb-2">{banner.icon}</div>
                    {banner.badgeText && (
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-2 bg-white/20 px-3 py-1 rounded-full w-fit"
                        style={{ color: banner.textColor }}
                        data-testid={`banner-badge-${banner.id}`}
                      >
                        {banner.badgeText}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: banner.textColor || "white" }}
                      data-testid={`banner-title-${banner.id}`}
                    >
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p
                        className="text-sm font-semibold opacity-90"
                        style={{ color: banner.textColor || "white" }}
                        data-testid={`banner-subtitle-${banner.id}`}
                      >
                        {banner.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
