import type { Product, ProductWithCategory, Review } from "@shared/schema";

export interface ProductDetailState {
  quantity: number;
  selectedImage: number;
  reviewTitle: string;
  reviewContent: string;
  reviewRating: number;
  isWishlisted: boolean;
}

export interface ProductDetailActions {
  setQuantity: (qty: number) => void;
  setSelectedImage: (idx: number) => void;
  setReviewTitle: (title: string) => void;
  setReviewContent: (content: string) => void;
  setReviewRating: (rating: number) => void;
  setIsWishlisted: (val: boolean) => void;
}

export interface ProductDetailProps {
  product: ProductWithCategory;
  relatedProducts?: Product[];
  reviews?: Review[];
  isLoading: boolean;
}
