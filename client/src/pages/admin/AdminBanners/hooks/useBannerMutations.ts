import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Banner, InsertBanner } from "@shared/schema";

export const useBannerMutations = () => {
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async (data: InsertBanner) =>
      apiRequest("POST", "/api/banners", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر ایجاد شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertBanner & { id: number }) =>
      apiRequest("PUT", `/api/banners/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر به‌روز شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) =>
      apiRequest("DELETE", `/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners"] });
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
      toast({ title: "بنر حذف شد" });
    },
    onError: () => toast({ title: "خرابی", variant: "destructive" }),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, sortOrder }: { id: number; sortOrder: number }) =>
      apiRequest("PUT", `/api/banners/${id}`, { sortOrder }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/banners/admin"] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    moveMutation,
  };
};
