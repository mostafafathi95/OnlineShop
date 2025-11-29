import React from "react";
import { Loader2, Check } from "lucide-react";

interface LoadingSpinnerProps {
  loading?: boolean;
  success?: boolean;
  successDuration?: number;
  children?: React.ReactNode;
}

export function LoadingSpinner({
  loading = false,
  success = false,
  successDuration = 3000,
  children,
}: LoadingSpinnerProps) {
  const [showSuccess, setShowSuccess] = React.useState(false);

  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), successDuration);
      return () => clearTimeout(timer);
    }
  }, [success, successDuration]);

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin-fast" />
        <span className="text-sm">{children || "در حال بارگذاری..."}</span>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="flex items-center gap-2 text-green-600 animate-fade-scale">
        <Check className="h-4 w-4 animate-checkmark" />
        <span className="text-sm">{children || "با موفقیت انجام شد"}</span>
      </div>
    );
  }

  return null;
}
