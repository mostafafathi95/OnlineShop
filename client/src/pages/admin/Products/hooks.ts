import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export function useProductsData(searchQuery: string) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/admin/products", { search: searchQuery }],
  });
  return { products, isLoading };
}

export function useDeleteProduct() {
  const { toast } = useToast();
  
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/products"] });
      toast({ title: "محصول حذف شد" });
    },
    onError: () => {
      toast({
        title: "خطا در حذف محصول",
        variant: "destructive",
      });
    },
  });
  
  return deleteMutation;
}

export function useFormatPrice() {
  return (price: string | number) => Number(price).toLocaleString("fa-IR");
}
