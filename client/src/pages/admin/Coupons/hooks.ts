import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Coupon } from "@shared/schema";
import type { CouponFormData } from "./types";

const initialFormData: CouponFormData = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minOrderValue: "",
  maxUses: "",
  startDate: "",
  endDate: "",
  isActive: true,
};

export function useCouponForm() {
  const [formData, setFormData] = useState<CouponFormData>(initialFormData);

  const resetForm = () => setFormData(initialFormData);

  return { formData, setFormData, resetForm };
}

export function useCoupons() {
  return useQuery<Coupon[]>({
    queryKey: ["/api/admin/coupons"],
  });
}

export function formatPrice(price: string | number) {
  return Number(price).toLocaleString("fa-IR");
}

export function parseCouponForEdit(coupon: Coupon): CouponFormData {
  return {
    code: coupon.code,
    description: coupon.description || "",
    discountType: coupon.discountType as "percentage" | "fixed",
    discountValue: coupon.discountValue.toString(),
    minOrderValue: coupon.minOrderValue?.toString() || "",
    maxUses: coupon.maxUses?.toString() || "",
    startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().split("T")[0] : "",
    endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split("T")[0] : "",
    isActive: coupon.isActive,
  };
}
