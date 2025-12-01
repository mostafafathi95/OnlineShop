import { Link } from "wouter";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { DEALS } from "./types";

export function LandingHero() {
  return (
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
            {DEALS.map((deal, idx) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
