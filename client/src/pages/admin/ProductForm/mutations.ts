import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ProductFormData } from "./types";

export function useCreateProductMutation(onSuccess?: () => void) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      return apiRequest("POST", "/api/admin/products", {
        ...data,
        price: data.price,
        comparePrice: data.comparePrice || null,
        stock: parseInt(data.stock) || 0,
        categoryId: data.categoryId ? parseInt(data.categoryId) : null,
        weight: data.weight || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول ایجاد شد" });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "خطا در ایجاد محصول",
        variant: "destructive",
      });
    },
  });
}

export function useUpdateProductMutation(productId: string, onSuccess?: () => void) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      return apiRequest("PATCH", `/api/admin/products/${productId}`, {
        ...data,
        price: data.price,
        comparePrice: data.comparePrice || null,
        stock: parseInt(data.stock) || 0,
        categoryId: data.categoryId ? parseInt(data.categoryId) : null,
        weight: data.weight || null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول بروزرسانی شد" });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "خطا در بروزرسانی",
        variant: "destructive",
      });
    },
  });
}
