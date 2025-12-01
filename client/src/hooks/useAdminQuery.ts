import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface UseAdminQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export function useAdminStats(options?: UseAdminQueryOptions) {
  return useQuery({
    queryKey: ['/api/admin/stats'],
    queryFn: async () => apiRequest("GET", "/api/admin/stats"),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    gcTime: options?.gcTime ?? 1000 * 60 * 30,
    retry: 2,
  });
}

export function useAdminOrders(options?: UseAdminQueryOptions) {
  return useQuery({
    queryKey: ['/api/admin/orders'],
    queryFn: async () => apiRequest("GET", "/api/admin/orders"),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    gcTime: options?.gcTime ?? 1000 * 60 * 30,
    retry: 2,
  });
}

export function useAdminProducts(options?: UseAdminQueryOptions) {
  return useQuery({
    queryKey: ['/api/admin/products'],
    queryFn: async () => apiRequest("GET", "/api/admin/products"),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    gcTime: options?.gcTime ?? 1000 * 60 * 30,
    retry: 2,
  });
}
