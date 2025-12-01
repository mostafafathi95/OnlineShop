import { Button } from "@/components/ui/button";

export function LandingNewsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80" data-testid="newsletter-section">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">خبرنامه ما را دنبال کنید</h2>
          <p className="mb-6 opacity-90">آخرین پیشنهادات و محصولات جدید را اول دریافت کنید</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = (e.currentTarget.elements.namedItem('newsletter-email') as HTMLInputElement)?.value;
            if (email) {
              console.log('Newsletter subscription:', email);
            }
          }} className="flex gap-2">
            <input
              type="email"
              name="newsletter-email"
              placeholder="ایمیل خود را وارد کنید"
              className="flex-1 px-4 py-3 rounded-lg text-right text-black"
              required
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-lg"
              data-testid="button-newsletter-subscribe"
            >
              ثبت‌نام
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
