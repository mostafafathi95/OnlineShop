/**
 * Generic admin data hook - eliminates duplicate admin query hooks
 * Replaces: useAdminOrders, useAdminProducts, useAdminUsers, useAdminStats, etc.
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CACHE_TIME, STALE_TIME } from "@/lib/admin-constants";

interface UseAdminDataOptions {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

/**
 * Generic hook for any admin data endpoint
 * @param endpoint - API endpoint (e.g., '/api/admin/products')
 * @param options - Query options
 */
export function useAdminData<T>(
  endpoint: string,
  options?: UseAdminDataOptions
) {
  return useQuery<T[]>({
    queryKey: [endpoint],
    queryFn: async () => apiRequest("GET", endpoint),
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? STALE_TIME,
    gcTime: options?.gcTime ?? CACHE_TIME,
    retry: 2,
  });
}

/**
 * Generic hook for admin mutations
 * @param method - HTTP method (POST, PATCH, DELETE)
 * @param endpoint - API endpoint
 * @param invalidateKeys - Query keys to invalidate after mutation
 */
export function useAdminMutation(
  method: "POST" | "PATCH" | "DELETE",
  endpoint: string,
  invalidateKeys: string[] = []
) {
  return useMutation({
    mutationFn: async (data: any) =>
      apiRequest(method, endpoint, data),
    onSuccess: () => {
      invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    },
  });
}

// Convenience hooks - for backward compatibility
export const useAdminStats = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/stats", options);

export const useAdminOrders = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/orders", options);

export const useAdminProducts = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/products", options);

export const useAdminUsers = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/users", options);

export const useAdminCategories = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/categories", options);

export const useAdminCoupons = (options?: UseAdminDataOptions) =>
  useAdminData("/api/admin/coupons", options);
