import { logger } from "./logger";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  async sendOrderConfirmation(
    email: string,
    orderNumber: string,
    total: string
  ): Promise<boolean> {
    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; direction: rtl;">
        <h2>تأیید سفارش</h2>
        <p>سفارش شما با شماره <strong>${orderNumber}</strong> ثبت‌شده است.</p>
        <p>مبلغ کل: <strong>${total} تومان</strong></p>
        <p>متشکریم که از ما خرید کردید!</p>
      </div>
    `;
    
    return this.send({
      to: email,
      subject: "تأیید سفارش",
      html,
      text: `سفارش شما ${orderNumber} ثبت شد. مبلغ: ${total} تومان`
    });
  }

  async sendShippingNotification(
    email: string,
    orderNumber: string,
    trackingNumber: string
  ): Promise<boolean> {
    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>اطلاع ارسال</h2>
        <p>سفارش <strong>${orderNumber}</strong> آماده ارسال است.</p>
        <p>کد رهگیری: <strong>${trackingNumber}</strong></p>
        <p>با این کد می‌تواند وضعیت ارسال را پیگیری کنید.</p>
      </div>
    `;
    
    return this.send({
      to: email,
      subject: "اطلاع ارسال سفارش",
      html,
      text: `سفارش ارسال شد. کد رهگیری: ${trackingNumber}`
    });
  }

  async sendDeliveryNotification(
    email: string,
    orderNumber: string
  ): Promise<boolean> {
    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>تحویل سفارش</h2>
        <p>سفارش <strong>${orderNumber}</strong> تحویل داده شد.</p>
        <p>از خریدتان سپاسگزاریم!</p>
      </div>
    `;
    
    return this.send({
      to: email,
      subject: "تحویل سفارش",
      html,
      text: `سفارش ${orderNumber} تحویل داده شد.`
    });
  }

  async sendWelcomeEmail(
    email: string,
    firstName: string
  ): Promise<boolean> {
    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>خوش‌آمدید!</h2>
        <p>سلام ${firstName}!</p>
        <p>خوش‌آمدید به فروشگاه آنلاین ما.</p>
        <p>اکنون می‌تواند محصولات را مرور کنید و خریداری کنید.</p>
      </div>
    `;
    
    return this.send({
      to: email,
      subject: "خوش‌آمدید به فروشگاه",
      html,
      text: `سلام ${firstName}! خوش‌آمدید.`
    });
  }

  private async send(options: EmailOptions): Promise<boolean> {
    try {
      // Mock implementation - in production, integrate with SendGrid, AWS SES, etc.
      console.log(`[EMAIL] Sent to ${options.to}: ${options.subject}`);
      
      // Placeholder for actual email sending
      // In production, implement with actual email service
      return true;
    } catch (error) {
      console.error(`[EMAIL] Send failed: ${(error as any).message}`);
      return false;
    }
  }
}

export const emailService = new EmailService();
