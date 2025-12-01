import Layout from "@/components/layout/Layout";
import { ContactInfoCards } from "./ContactInfo";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";
import { useContactForm } from "./hooks";
import { CONTACT_INFO } from "./types";

export default function Contact() {
  const { formData, setFormData, handleSubmit, isSubmitting } =
    useContactForm();

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
          <div className="mb-16">
            <ContactInfoCards items={CONTACT_INFO} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ContactForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
            <ContactMap />
          </div>
        </div>
      </section>
    </Layout>
  );
}
