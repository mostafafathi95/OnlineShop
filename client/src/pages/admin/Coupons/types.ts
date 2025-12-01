import type { Coupon } from "@shared/schema";

export interface CouponFormData {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  minOrderValue: string;
  maxUses: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CouponState {
  isDialogOpen: boolean;
  editingCoupon: Coupon | null;
  deleteId: number | null;
  formData: CouponFormData;
}
