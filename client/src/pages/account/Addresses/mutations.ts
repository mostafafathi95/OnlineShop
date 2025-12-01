import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AddressFormData } from "./types";

export function useCreateAddressMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: AddressFormData) => {
      return apiRequest("POST", "/api/addresses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
      toast({ title: "آدرس جدید اضافه شد" });
    },
  });
}

export function useUpdateAddressMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: AddressFormData }) => {
      return apiRequest("PATCH", `/api/addresses/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
      toast({ title: "آدرس بروزرسانی شد" });
    },
  });
}

export function useDeleteAddressMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/addresses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
      toast({ title: "آدرس حذف شد" });
    },
  });
}

export function useSetDefaultAddressMutation() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PATCH", `/api/addresses/${id}/default`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
      toast({ title: "آدرس پیش‌فرض تغییر کرد" });
    },
  });
}
