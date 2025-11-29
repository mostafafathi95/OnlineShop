import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SiInstagram, SiTelegram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="font-bold text-xl">Shop</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              فروشگاه اینترنتی با بهترین کیفیت و قیمت مناسب. ارسال سریع به سراسر کشور با ضمانت اصالت کالا.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover-elevate"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover-elevate"
                data-testid="link-telegram"
              >
                <SiTelegram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-muted hover-elevate"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">
                  محصولات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  شرایط ارسال
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  شرایط مرجوعی
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span dir="ltr">021-12345678</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@shop.com</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} تمامی حقوق محفوظ است.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.zarinpal.com/badges/trustLogo/1.svg"
                alt="Zarinpal"
                className="h-12 opacity-60 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
