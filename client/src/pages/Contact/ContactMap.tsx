import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactMap() {
  return (
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
          <a href="tel:02112345678" className="text-2xl font-bold" dir="ltr">
            021-12345678
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
