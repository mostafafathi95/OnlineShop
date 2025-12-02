/**
 * Centralized formatting utilities
 * Eliminates duplicate formatting code across components
 */

export const formatPrice = (price: string | number): string => {
  return Number(price).toLocaleString("fa-IR");
};

export const formatPersianPrice = (price: string | number, currency = "ریال"): string => {
  return `${formatPrice(price)} ${currency}`;
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("fa-IR");
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString("fa-IR");
};

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};

export const truncateText = (text: string, length = 50): string => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export const formatProductStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    active: "فعال",
    inactive: "غیرفعال",
    draft: "پیش‌نویس",
    archived: "آرشیو",
  };
  return statuses[status] || status;
};

export const formatOrderStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    pending: "در انتظار",
    processing: "پردازش",
    shipped: "ارسال شده",
    delivered: "تحویل داده شده",
    cancelled: "لغو شده",
  };
  return statuses[status] || status;
};

export const formatPaymentStatus = (status: string): string => {
  const statuses: Record<string, string> = {
    pending: "در انتظار",
    paid: "پرداخت شده",
    failed: "ناموفق",
    refunded: "بازپرداخت شده",
  };
  return statuses[status] || status;
};

export const formatArticleStatus = (published: boolean | null): string => {
  return published ? "منتشر شده" : "پیش‌نویس";
};

export const formatPageStatus = (published: boolean | null): string => {
  return published ? "منتشر شده" : "پیش‌نویس";
};

export const formatNewsStatus = (published: boolean | null): string => {
  return published ? "منتشر شده" : "پیش‌نویس";
};
