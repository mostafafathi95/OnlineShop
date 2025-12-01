import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { NewAddressForm } from "../types";

export function useCheckoutMutations() {
  const createAddressMutation = useMutation({
    mutationFn: async (data: NewAddressForm) => {
      return apiRequest("POST", "/api/addresses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
    },
  });

  const validateCouponMutation = useMutation({
    mutationFn: async (code: string) => {
      return apiRequest("POST", "/api/coupons/validate", { code });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      addressId: number;
      paymentMethod: string;
      paymentGateway?: string;
      notes: string;
      items: { productId: number; quantity: number }[];
      couponCode?: string;
    }) => {
      return apiRequest("POST", "/api/orders", data);
    },
  });

  return {
    createAddressMutation,
    validateCouponMutation,
    createOrderMutation,
  };
}
