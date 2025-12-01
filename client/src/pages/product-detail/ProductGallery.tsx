import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/products/VideoPlayer";

interface ProductGalleryProps {
  images: string[];
  videoUrl?: string;
  productName: string;
  selectedImage: number;
  onImageSelect: (index: number) => void;
}

export default function ProductGallery({
  images,
  videoUrl,
  productName,
  selectedImage,
  onImageSelect,
}: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      {videoUrl && (
        <div className="mb-6">
          <VideoPlayer url={videoUrl} title={productName} />
        </div>
      )}
      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
          data-testid="img-product-main"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                selectedImage === index ? "border-primary" : "border-transparent"
              }`}
              data-testid={`button-image-${index}`}
            >
              <img
                src={image}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
