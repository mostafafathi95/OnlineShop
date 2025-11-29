import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Truck, Shield, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { RecentlyViewed } from "@/components/discovery/RecentlyViewed";
import { SocialProof } from "@/components/discovery/SocialProof";
import { useQuery } from "@tanstack/react-query";
import type { Product, Category } from "@shared/schema";

const features = [
  {
    icon: Truck,
    title: "ارسال سریع",
    description: "ارسال به سراسر کشور",
  },
  {
    icon: Shield,
    title: "ضمانت اصالت",
    description: "تضمین کیفیت کالا",
  },
  {
    icon: Clock,
    title: "پشتیبانی ۲۴/۷",
    description: "همیشه در کنار شما",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    description: "درگاه پرداخت مطمئن",
  },
];

export default function Landing() {
  useEffect(() => {
    document.title = "فروشگاه اینترنتی | محصولات با بهترین قیمت";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'فروشگاه اینترنتی پیشرو با ارسال سریع و ضمانت اصالت کالا. خریدتان از ما کاملاً امن و قابل اعتماد است.');
  }, []);

  const { data: featuredProducts, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true, limit: 8 }],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              بهترین محصولات با
              <span className="text-primary"> بهترین قیمت</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              فروشگاه اینترنتی با تنوع بالا و کیفیت برتر. ارسال سریع به سراسر کشور با ضمانت بازگشت کالا.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/products" data-testid="link-hero-products">
                  مشاهده محصولات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/about" data-testid="link-hero-about">
                  درباره ما
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">دسته‌بندی‌ها</h2>
              <Button variant="ghost" asChild>
                <Link href="/products" data-testid="link-all-categories">
                  مشاهده همه
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover-elevate">
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl font-bold text-muted-foreground/30">
                            {category.name[0]}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">محصولات ویژه</h2>
            <Button variant="ghost" asChild>
              <Link href="/products" data-testid="link-all-products">
                مشاهده همه
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid
            products={featuredProducts || []}
            isLoading={productsLoading}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <RecentlyViewed />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                عضو خبرنامه ما شوید
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                از آخرین محصولات و تخفیف‌های ویژه باخبر شوید.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-md bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                  data-testid="input-newsletter-email"
                />
                <Button
                  variant="secondary"
                  size="lg"
                  data-testid="button-newsletter-submit"
                >
                  عضویت
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SocialProof />
    </Layout>
  );
}
