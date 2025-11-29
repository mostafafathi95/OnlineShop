import React from "react";

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
  circle?: boolean;
}

export function SkeletonLoader({
  count = 3,
  height = "h-12",
  width = "w-full",
  circle = false,
}: SkeletonLoaderProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} ${
            circle ? "rounded-full" : "rounded-md"
          } bg-muted animate-pulse-slow`}
        />
      ))}
    </div>
  );
}
