import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CouponFormData } from "./types";

export function useCreateCouponMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CouponFormData) => {
      return apiRequest("POST", "/api/admin/coupons", {
        ...data,
        discountValue: parseFloat(data.discountValue),
        minOrderValue: data.minOrderValue ? parseFloat(data.minOrderValue) : null,
        maxUses: data.maxUses ? parseInt(data.maxUses) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      toast({ title: "کوپن ایجاد شد" });
    },
  });
}

export function useUpdateCouponMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CouponFormData }) => {
      return apiRequest("PATCH", `/api/admin/coupons/${id}`, {
        ...data,
        discountValue: parseFloat(data.discountValue),
        minOrderValue: data.minOrderValue ? parseFloat(data.minOrderValue) : null,
        maxUses: data.maxUses ? parseInt(data.maxUses) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      toast({ title: "کوپن بروزرسانی شد" });
    },
  });
}

export function useDeleteCouponMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/coupons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/coupons"] });
      toast({ title: "کوپن حذف شد" });
    },
  });
}
