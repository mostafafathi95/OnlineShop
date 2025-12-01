import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertSliderSchema, type Slider } from "@shared/schema";
import type { SliderFormData } from "./types";

export function useSliderForm() {
  const [, params] = useRoute("/admin/sliders/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = params?.id && params.id !== "new";

  const [formData, setFormData] = useState<SliderFormData>({
    title: "",
    slug: "",
    description: "",
    image: "",
    link: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    sortOrder: 0,
    isActive: true,
    type: "banner",
  });

  const { data: slider, isLoading } = useQuery<Slider>({
    queryKey: [`/api/admin/sliders/${params?.id}`],
    enabled: isEdit,
  });

  useEffect(() => {
    if (slider && isEdit) {
      setFormData({
        title: slider.title,
        slug: slider.slug,
        description: slider.description || "",
        image: slider.image,
        link: slider.link || "",
        startDate: slider.startDate?.toString().split("T")[0] || "",
        endDate: slider.endDate?.toString().split("T")[0] || "",
        sortOrder: slider.sortOrder,
        isActive: slider.isActive,
        type: slider.type,
      });
    }
  }, [slider, isEdit]);

  const saveMutation = useMutation({
    mutationFn: async (data: SliderFormData) => {
      const validated = insertSliderSchema.parse(data);
      if (isEdit) {
        return apiRequest("PATCH", `/api/admin/sliders/${params?.id}`, validated);
      } else {
        return apiRequest("POST", "/api/admin/sliders", validated);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sliders"] });
      toast({ title: isEdit ? "ویرایش موفق" : "ایجاد موفق" });
      setLocation("/admin/sliders");
    },
    onError: (error: any) => {
      toast({ title: "خطا", description: error.message, variant: "destructive" });
    },
  });

  return { formData, setFormData, isLoading, isEdit, saveMutation };
}
