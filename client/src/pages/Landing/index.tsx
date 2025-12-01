import Layout from "@/components/layout/Layout";
import { BannerSection } from "@/components/landing/BannerSection";
import { LandingCarousel, LandingCategories } from "./LandingCarousel";
import { LandingHero } from "./LandingHero";
import { LandingDeals } from "./LandingDeals";
import { LandingFeatures } from "./LandingFeatures";
import { LandingProducts } from "./LandingProducts";
import { LandingNewsletter } from "./LandingNewsletter";
import { useLandingData, usePageMeta, useIsSectionVisible } from "./hooks";

export default function Landing() {
  usePageMeta();
  const { featuredProducts, products, sliders, categories, productsLoading } = useLandingData();
  const isSectionVisible = useIsSectionVisible();

  return (
    <Layout>
      {/* SLIDER SECTION */}
      {isSectionVisible("slider") && <LandingCarousel sliders={sliders || []} />}

      {/* HERO SECTION */}
      {isSectionVisible("hero") && <LandingHero />}

      {/* DEALS SECTION */}
      {isSectionVisible("deals") && <LandingDeals />}

      {/* BANNERS SECTION */}
      {isSectionVisible("banners") && <BannerSection />}

      {/* CATEGORIES SECTION */}
      {isSectionVisible("categories") && categories && categories.length > 0 && (
        <LandingCategories categories={categories} />
      )}

      {/* FEATURES SECTION */}
      {isSectionVisible("features") && <LandingFeatures />}

      {/* PRODUCTS SECTION */}
      {isSectionVisible("products_featured") && (
        <LandingProducts
          products={products || []}
          featuredProducts={featuredProducts || []}
          isLoading={productsLoading}
        />
      )}

      {/* NEWSLETTER SECTION */}
      {isSectionVisible("newsletter") && <LandingNewsletter />}
    </Layout>
  );
}
