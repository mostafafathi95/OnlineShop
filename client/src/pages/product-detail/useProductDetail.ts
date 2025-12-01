import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { Product, ProductWithCategory } from "@shared/schema";

export const useProductDetail = (product: ProductWithCategory | undefined) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const reviewMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      return apiRequest("POST", "/api/reviews", {
        productId: product.id,
        title: reviewTitle,
        content: reviewContent,
        rating: reviewRating,
      });
    },
    onSuccess: () => {
      if (product?.id) {
        queryClient.invalidateQueries({ queryKey: ["/api/products", product.id, "reviews"] });
        setReviewTitle("");
        setReviewContent("");
        setReviewRating(5);
        toast({ title: "نظر شما ثبت شد" });
      }
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      if (isWishlisted) {
        return apiRequest("DELETE", `/api/wishlist/${product.id}`);
      } else {
        return apiRequest("POST", "/api/wishlist", { productId: product.id });
      }
    },
    onSuccess: () => {
      setIsWishlisted(!isWishlisted);
      toast({ title: isWishlisted ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد" });
    },
  });

  const handleReviewSubmit = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    if (!reviewTitle || !reviewContent) {
      toast({
        title: "خطا",
        description: "عنوان و متن نظر الزامی است",
        variant: "destructive",
      });
      return;
    }
    reviewMutation.mutate();
  };

  return {
    quantity,
    setQuantity,
    selectedImage,
    setSelectedImage,
    reviewTitle,
    setReviewTitle,
    reviewContent,
    setReviewContent,
    reviewRating,
    setReviewRating,
    isWishlisted,
    setIsWishlisted,
    reviewMutation,
    wishlistMutation,
    handleReviewSubmit,
  };
};
