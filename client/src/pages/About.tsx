import { Users, Target, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const values = [
  {
    icon: Target,
    title: "ماموریت ما",
    description: "ارائه بهترین محصولات با کیفیت عالی و قیمت مناسب به مشتریان عزیز در سراسر کشور.",
  },
  {
    icon: Award,
    title: "کیفیت",
    description: "تمامی محصولات ما از بهترین برندها و با ضمانت اصالت کالا عرضه می‌شوند.",
  },
  {
    icon: Heart,
    title: "رضایت مشتری",
    description: "رضایت شما اولویت ماست. تیم پشتیبانی ما همیشه آماده کمک به شماست.",
  },
  {
    icon: Users,
    title: "تیم ما",
    description: "تیمی متشکل از متخصصین با تجربه که با عشق برای شما کار می‌کنند.",
  },
];

const stats = [
  { number: "۱۰۰۰۰+", label: "مشتری راضی" },
  { number: "۵۰۰۰+", label: "محصول" },
  { number: "۳۱", label: "استان" },
  { number: "۵", label: "سال تجربه" },
];

export default function About() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره ما</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              فروشگاه اینترنتی ما با هدف ارائه بهترین تجربه خرید آنلاین به مشتریان ایرانی تاسیس شده است.
              ما معتقدیم که خرید آنلاین باید ساده، امن و لذت‌بخش باشد.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="p-6">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">ارزش‌های ما</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">داستان ما</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                فروشگاه ما در سال ۱۳۹۸ با یک ایده ساده شروع شد: ایجاد یک تجربه خرید آنلاین بی‌نظیر برای مشتریان ایرانی. 
                از همان ابتدا، تمرکز ما بر ارائه محصولات با کیفیت، قیمت مناسب و خدمات عالی بوده است.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                امروز، ما افتخار می‌کنیم که یکی از بزرگ‌ترین فروشگاه‌های آنلاین کشور هستیم و به بیش از ۱۰,۰۰۰ مشتری 
                در سراسر ایران خدمت می‌کنیم. تیم ما متشکل از افراد متخصص و متعهد است که هر روز تلاش می‌کنند 
                تا تجربه خرید شما را بهتر کنند.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                ما به آینده نگاه می‌کنیم و همواره در حال توسعه و بهبود خدمات خود هستیم. هدف ما این است که 
                خرید آنلاین را برای همه ایرانیان ساده و لذت‌بخش کنیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                سوالی دارید؟
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                تیم پشتیبانی ما آماده پاسخگویی به سوالات شماست.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-background text-foreground font-medium hover-elevate"
              >
                تماس با ما
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
