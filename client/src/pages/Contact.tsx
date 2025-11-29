import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const contactInfo = [
  {
    icon: Phone,
    title: "تلفن",
    value: "۰۲۱-۱۲۳۴۵۶۷۸",
    description: "شنبه تا پنجشنبه ۹ تا ۱۸",
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "info@shop.com",
    description: "پاسخگویی در کمتر از ۲۴ ساعت",
  },
  {
    icon: MapPin,
    title: "آدرس",
    value: "تهران، خیابان ولیعصر",
    description: "پلاک ۱۲۳، طبقه ۵",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "۹ صبح تا ۶ عصر",
    description: "شنبه تا پنجشنبه",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "اطلاعات ناقص",
        description: "لطفا فیلدهای الزامی را پر کنید.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "پیام شما ارسال شد",
      description: "به زودی با شما تماس خواهیم گرفت.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">تماس با ما</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              سوالی دارید؟ تیم پشتیبانی ما آماده پاسخگویی به شماست.
              از هر طریقی که راحت‌تر هستید با ما در تماس باشید.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-primary font-medium">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>ارسال پیام</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">نام و نام خانوادگی *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">ایمیل *</Label>
                        <Input
                          id="email"
                          type="email"
                          dir="ltr"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">شماره تماس</Label>
                        <Input
                          id="phone"
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          data-testid="input-contact-phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">موضوع</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          data-testid="input-contact-subject"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">پیام *</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        data-testid="input-contact-message"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-contact-submit">
                      {isSubmitting ? (
                        "در حال ارسال..."
                      ) : (
                        <>
                          <Send className="ml-2 h-4 w-4" />
                          ارسال پیام
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>موقعیت ما</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="aspect-video rounded-b-lg overflow-hidden bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8477524673244!2d51.41893231525896!3d35.71542618018693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e011b3a534f37%3A0x6b3b3b3b3b3b3b3b!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">پشتیبانی فوری</h3>
                  <p className="text-primary-foreground/80 mb-4">
                    برای پاسخ سریع‌تر، با شماره زیر تماس بگیرید:
                  </p>
                  <a
                    href="tel:02112345678"
                    className="text-2xl font-bold"
                    dir="ltr"
                  >
                    021-12345678
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
