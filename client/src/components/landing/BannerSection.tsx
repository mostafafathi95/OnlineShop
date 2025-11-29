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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {banners.slice(0, 3).map((banner) => (
            <Link
              key={banner.id}
              href={banner.link || "/products"}
              data-testid={`banner-${banner.id}`}
            >
              <Card
                className="overflow-hidden hover-elevate cursor-pointer h-full"
                style={{
                  backgroundColor: banner.backgroundColor,
                }}
              >
                <CardContent className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl mb-2">{banner.icon}</div>
                    {banner.badgeText && (
                      <p
                        className="text-sm font-medium mb-2 opacity-90"
                        style={{ color: banner.textColor }}
                        data-testid={`banner-badge-${banner.id}`}
                      >
                        {banner.badgeText}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ color: banner.textColor }}
                      data-testid={`banner-title-${banner.id}`}
                    >
                      {banner.title}
                    </h3>
                    {banner.subtitle && (
                      <p
                        className="text-sm opacity-90"
                        style={{ color: banner.textColor }}
                        data-testid={`banner-subtitle-${banner.id}`}
                      >
                        {banner.subtitle}
                      </p>
                    )}
                    {banner.description && (
                      <p
                        className="text-xs mt-2 opacity-75"
                        style={{ color: banner.textColor }}
                        data-testid={`banner-description-${banner.id}`}
                      >
                        {banner.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
