import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  // Check localStorage for auth data first
  const authData = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  const localUser = authData ? JSON.parse(authData).user : null;
  
  const { data: user = localUser, isLoading } = useQuery<User | undefined>({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: Infinity,
  });

  return {
    user: user || localUser,
    isLoading,
    isAuthenticated: !!(user || localUser),
    isAdmin: (user || localUser)?.role === "admin",
  };
}
