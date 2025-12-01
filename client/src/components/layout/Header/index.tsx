import { useState } from "react";
import { useLocation } from "wouter";
import CartDrawer from "@/components/cart/CartDrawer";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderMobileMenu } from "./HeaderMobileMenu";
import { HeaderDesktopNav } from "./HeaderDesktopNav";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { HeaderThemeToggle } from "./HeaderThemeToggle";
import { HeaderCartButton } from "./HeaderCartButton";
import { HeaderAuthActions } from "./HeaderAuthActions";
import { useHeaderData } from "./hooks";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, theme, toggleTheme, openCart, itemCount } = useHeaderData();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-8">
              <HeaderMobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                location={location}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              />
              <HeaderLogo />
              <HeaderDesktopNav location={location} />
            </div>

            <HeaderSearchBar />

            <div className="flex items-center gap-2">
              <HeaderThemeToggle theme={theme as "light" | "dark"} toggleTheme={toggleTheme} />
              <HeaderCartButton itemCount={itemCount} onCartClick={openCart} />
              <HeaderAuthActions
                user={user}
                isAuthenticated={isAuthenticated}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
