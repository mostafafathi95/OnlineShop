import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminErrorBoundaryProps {
  error?: Error | null;
  isLoading?: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export function AdminErrorBoundary({
  error,
  isLoading,
  isEmpty,
  children,
}: AdminErrorBoundaryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>خطا</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "خطای نامشخص رخ داد"}
        </AlertDescription>
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">هیچ داده‌ای یافت نشد</p>
      </div>
    );
  }

  return <>{children}</>;
}
