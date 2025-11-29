import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Truck, Shield, Clock, CreditCard, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { BannerSection } from "@/components/landing/BannerSection";
import { useQuery } from "@tanstack/react-query";
import type { Product, Slider } from "@shared/schema";

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
    queryKey: ["/api/products", { limit: 8, sort: activeTab }],
  });

  const { data: sliders = [] } = useQuery<Slider[]>({
    queryKey: ["/api/sliders/active"],
  });

  return (
    <Layout>
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
            <div className="space-y-8">
              <div>
                <Badge className="mb-4">تخفیف ۵۰% برای خریداران جدید</Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  بهترین محصولات
                  <br />
                  <span className="text-primary">بهترین قیمت</span>
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

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold text-primary">۵۰K+</div>
                  <div className="text-sm text-muted-foreground">محصول</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">۱۰۰K+</div>
                  <div className="text-sm text-muted-foreground">خریدار راضی</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">۴.۸</div>
                  <div className="text-sm text-muted-foreground">امتیاز</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {sliders && sliders.length > 0 ? (
                <div className="text-center">
                  <p className="text-muted-foreground">اسلایدرهای تبلیغاتی</p>
                </div>
              ) : (
                deals.map((deal, idx) => (
                  <Card key={idx} className={`${deal.color} text-white overflow-hidden hover-elevate`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm opacity-90">{deal.label}</p>
                          <p className="text-2xl font-bold">{deal.value}</p>
                        </div>
                        <TrendingUp className="h-12 w-12 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <BannerSection />

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
          <ProductGrid products={products || []} isLoading={productsLoading} />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">محصولات پیشنهادی</h2>
              <p className="text-muted-foreground">پرفروش‌ترین محصولات</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/products">
                مشاهده همه
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts?.slice(0, 8) || []} isLoading={productsLoading} />
        </div>
      </section>
    </Layout>
  );
}
