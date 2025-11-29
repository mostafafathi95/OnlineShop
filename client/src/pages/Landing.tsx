import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Truck, Shield, Clock, CreditCard, Star, ChevronRight, Search, TrendingUp, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { RecentlyViewed } from "@/components/discovery/RecentlyViewed";
import { SocialProof } from "@/components/discovery/SocialProof";
import { Carousel } from "@/components/Carousel";
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

const testimonials = [
  {
    name: "علی محمدی",
    role: "خریدار منظم",
    content: "تجربه خریدی عالی، محصولات اصل و ارسال سریع!",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "فاطمه احمدی",
    role: "خریدار راضی",
    content: "خدمات پس از فروش بسیار خوب و پرسنل مودب",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    name: "محمد رضا",
    role: "خریدار قدیمی",
    content: "سال‌هاست که خریداری می‌کنم، بهترین انتخاب",
    rating: 5,
    avatar: "👨‍🔧",
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
                <Badge className="mb-4 animate-fade-scale">🎉 تخفیف ۵۰% برای خریداران جدید</Badge>
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
                  <div className="text-2xl font-bold text-primary">۴.۸⭐</div>
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
                
                {/* Featured Product Preview */}
                <Card className="overflow-hidden hover-elevate">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                    alt="محصول ویژه"
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <p className="text-sm text-primary font-semibold">محصول برتر ماه</p>
                    <h3 className="font-bold mt-1">لپ‌تاپ Pro</h3>
                    <p className="text-lg font-bold text-primary mt-2">۵۰۰K تومان</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DEALS BANNER */}
      <section className="py-8 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6" />
              <span className="font-bold text-lg">فلش فروش ۲۴ ساعته</span>
            </div>
            <div className="text-2xl font-bold">۴۵ دقیقه ۲۳ ثانیه باقی مانده</div>
            <Button variant="secondary" size="sm">مشاهده کل فروش</Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-elevate group">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SHOWCASE */}
      {categories && categories.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">دسته‌بندی‌ها</h2>
              <Button variant="ghost" asChild>
                <Link href="/products">
                  مشاهده همه
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link key={category.id} href={`/products?category=${category.slug}`} className="group">
                  <Card className="overflow-hidden hover-elevate h-32 flex items-end">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground/30">{category.name[0]}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative p-4 w-full">
                      <h3 className="text-white font-semibold text-sm">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS WITH TABS */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-3xl font-bold">محصولات انتخابی</h2>
              <div className="flex gap-2">
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
            </div>
            <ProductGrid
              products={products || []}
              isLoading={productsLoading}
            />
          </div>
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

      {/* TESTIMONIALS */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">نظرات خریداران</h2>
            <p className="text-muted-foreground">هزاران خریدار راضی از سرویس ما</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                <Input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="bg-white text-foreground h-12"
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
