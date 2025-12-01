import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useCartStore } from "@/stores/cartStore";

export function useHeaderData() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  return {
    user,
    isAuthenticated,
    isAdmin,
    theme,
    toggleTheme,
    openCart,
    itemCount,
  };
}
