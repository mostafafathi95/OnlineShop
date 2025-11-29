import React from "react";

interface CheckoutStepContentProps {
  isActive: boolean;
  children: React.ReactNode;
}

export function CheckoutStepContent({
  isActive,
  children,
}: CheckoutStepContentProps) {
  return (
    <div
      className={`transition-all duration-300 ${
        isActive
          ? "opacity-100 visible animate-slide-up"
          : "opacity-0 invisible absolute"
      }`}
    >
      {children}
    </div>
  );
}
