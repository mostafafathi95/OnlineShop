import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Truck, Shield, Clock, CreditCard, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { RecentlyViewed } from "@/components/discovery/RecentlyViewed";
import { SocialProof } from "@/components/discovery/SocialProof";
import { Carousel } from "@/components/Carousel";
import { BannerSection } from "@/components/landing/BannerSection";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category, Slider } from "@shared/schema";

const features = [
  {
    icon: Truck,
    title: "ارسال رایگان",
    description: "برای خریدهای بالای ۵۰۰ هزار تومان",
  },
  {
    icon: Shield,
    title: "ضمانت اصالت",
    description: "۱۰۰% تضمین کیفیت کالا",
  },
  {
    icon: Clock,
    title: "پشتیبانی ۲۴/۷",
    description: "همیشه در کنار شما",
  },
  {
    icon: CreditCard,
    title: "درگاه‌های ایمن",
    description: "۶ درگاه پرداخت اصلی",
  },
];

const deals = [
  { label: "تخفیف تابستان", value: "۴۰%", color: "bg-red-500" },
  { label: "خرید ۲ تومان ۱", value: "خرید الکترونیکی", color: "bg-blue-500" },
  { label: "رایگان برای اعضا", value: "ارسال اکسپرس", color: "bg-green-500" },
];

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"newest" | "popular" | "sale">("newest");

  useEffect(() => {
    document.title = "فروشگاه اینترنتی | محصولات با بهترین قیمت";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'فروشگاه اینترنتی پیشرو با ارسال سریع و ضمانت اصالت کالا. خریدتان از ما کاملاً امن و قابل اعتماد است.');
  }, []);

  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 12 }],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery, limit: 8, sort: activeTab }],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: sliders = [] } = useQuery<Slider[]>({
    queryKey: ["/api/sliders/active"],
  });

  return (
    <Layout>
      {/* HERO SECTION - Premium */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/30" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-8 animate-slide-down">
              <div>
                <Badge className="mb-4 animate-fade-scale">تخفیف ۵۰% برای خریداران جدید</Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  بهترین محصولات
                  <br />
                  <span className="text-primary"> بهترین قیمت</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
                بیش از ۱۰۰ هزار محصول اصل با ضمانت و ارسال سریع. از امروز شروع کنید!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 h-14">
                  <Link href="/products">
                    <Search className="ml-2 h-5 w-5" />
                    جستجو و خریداری
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 h-14">
                  <Link href="/about">
                    درباره ما
                    <ArrowLeft className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="animate-fade-scale" style={{ animationDelay: "0s" }}>
                  <div className="text-2xl font-bold text-primary">۵۰K+</div>
                  <div className="text-sm text-muted-foreground">محصول</div>
                </div>
                <div className="animate-fade-scale" style={{ animationDelay: "0.1s" }}>
                  <div className="text-2xl font-bold text-primary">۱۰۰K+</div>
                  <div className="text-sm text-muted-foreground">خریدار راضی</div>
                </div>
                <div className="animate-fade-scale" style={{ animationDelay: "0.2s" }}>
                  <div className="text-2xl font-bold text-primary">۴.۸</div>
                  <div className="text-sm text-muted-foreground">امتیاز</div>
                </div>
              </div>
            </div>

            {/* Carousel or Deals */}
            {sliders && sliders.length > 0 ? (
              <div className="animate-slide-up">
                <Carousel slides={sliders} autoPlay={true} autoPlayInterval={5000} />
              </div>
            ) : (
              <div className="space-y-4 animate-slide-up">
                {deals.map((deal, idx) => (
                  <Card key={idx} className={`${deal.color} text-white overflow-hidden hover-elevate group`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">{deal.label}</p>
                          <p className="text-2xl font-bold">{deal.value}</p>
                        </div>
                        <TrendingUp className="h-12 w-12 opacity-20 group-hover:opacity-40 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BANNERS SECTION */}
      <BannerSection />

      {/* FEATURES */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">محصولات منتخب</h2>
              <p className="text-muted-foreground">جدیدترین محصولات و بیشترین فروش‌ها</p>
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
          <ProductGrid
            products={products || []}
            isLoading={productsLoading}
          />
        </div>
      </section>

      {/* PREMIUM PRODUCTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">محصولات پیشنهادی</h2>
              <p className="text-muted-foreground">پرفروش‌ترین محصولات بر اساس انتخاب خریداران</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                مشاهده همه
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid
            products={featuredProducts?.slice(0, 8) || []}
            isLoading={productsLoading}
          />
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RecentlyViewed />
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <Card className="bg-white/10 border-white/20 backdrop-blur">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold">عضو خبرنامه ما شوید</h2>
              <p className="text-white/80 max-w-lg mx-auto text-lg">
                از آخرین محصولات، تخفیف‌های اختصاصی و پیشنهادات ویژه باخبر شوید
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-foreground"
                />
                <Button size="lg" variant="secondary">عضویت</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SocialProof />
    </Layout>
  );
}
