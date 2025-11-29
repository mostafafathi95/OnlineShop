import { FileText, ShieldCheck, Truck, RefreshCw, CreditCard, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const sections = [
  {
    icon: FileText,
    title: "شرایط عمومی",
    content: `با استفاده از این وب‌سایت، شما موافقت خود را با تمامی قوانین و مقررات ذکر شده در این صفحه اعلام می‌کنید. 
    لطفاً قبل از استفاده از خدمات ما، این قوانین را به دقت مطالعه کنید.
    
    ما حق تغییر این قوانین را در هر زمان برای خود محفوظ می‌داریم و تغییرات از زمان انتشار در وب‌سایت قابل اجرا خواهند بود.`,
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت کالا",
    content: `تمامی محصولات عرضه شده در فروشگاه ما دارای ضمانت اصالت کالا هستند. در صورت عدم تطابق کالای دریافتی با مشخصات ذکر شده، 
    می‌توانید ظرف مدت ۷ روز کالا را مرجوع کنید.
    
    ما متعهد به ارائه محصولات با کیفیت و اصل هستیم و از تمامی تامین‌کنندگان معتبر تهیه می‌کنیم.`,
  },
  {
    icon: Truck,
    title: "شرایط ارسال",
    content: `ارسال سفارشات به سراسر کشور انجام می‌شود. زمان تحویل بسته به مقصد بین ۲ تا ۷ روز کاری متغیر است.
    
    - ارسال به تهران: ۱ تا ۲ روز کاری
    - ارسال به مراکز استان‌ها: ۲ تا ۴ روز کاری
    - ارسال به سایر شهرها: ۳ تا ۷ روز کاری
    
    برای سفارشات بالای ۵۰۰,۰۰۰ تومان، ارسال رایگان خواهد بود.`,
  },
  {
    icon: RefreshCw,
    title: "شرایط مرجوعی",
    content: `شما می‌توانید ظرف مدت ۷ روز از تاریخ تحویل، کالای خریداری شده را مرجوع کنید. شرایط مرجوعی به شرح زیر است:
    
    - کالا باید در بسته‌بندی اصلی و بدون استفاده باشد
    - برچسب‌ها و لیبل‌های کالا نباید جدا شده باشند
    - کالا نباید آسیب‌دیده یا خراش داشته باشد
    - رسید خرید باید همراه کالا ارسال شود
    
    پس از تایید مرجوعی، مبلغ پرداختی ظرف ۷۲ ساعت به حساب شما واریز می‌شود.`,
  },
  {
    icon: CreditCard,
    title: "شرایط پرداخت",
    content: `پرداخت سفارشات از طریق درگاه‌های بانکی معتبر و امن انجام می‌شود. روش‌های پرداخت موجود:
    
    - پرداخت آنلاین از طریق درگاه بانکی (تمامی کارت‌های عضو شتاب)
    - پرداخت در محل (فقط برای تهران و برخی شهرها)
    
    تمامی تراکنش‌ها با رمزنگاری SSL محافظت می‌شوند.`,
  },
  {
    icon: Lock,
    title: "حریم خصوصی",
    content: `ما به حفظ حریم خصوصی کاربران متعهد هستیم. اطلاعات شخصی شما فقط برای پردازش سفارشات استفاده می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد.
    
    اطلاعات جمع‌آوری شده شامل:
    - نام و نام خانوادگی
    - آدرس ایمیل
    - شماره تلفن
    - آدرس پستی
    
    شما می‌توانید در هر زمان درخواست حذف اطلاعات خود را ارائه دهید.`,
  },
];

export default function Terms() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">قوانین و مقررات</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              لطفاً قبل از استفاده از خدمات فروشگاه، این قوانین را مطالعه کنید.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  در صورت داشتن هرگونه سوال، با{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    تیم پشتیبانی
                  </a>{" "}
                  ما تماس بگیرید.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
