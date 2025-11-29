import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/cart/CartDrawer";

const navigation = [
  { name: "خانه", href: "/" },
  { name: "محصولات", href: "/products" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
  { name: "مدیریت", href: "/admin-access" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 lg:gap-8">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors hover-elevate rounded-md px-3 py-2 ${
                          location === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground"
                        }`}
                        data-testid={`link-mobile-${item.name}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <>
                        <div className="border-t my-2" />
                        <Link
                          href="/account"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg font-medium hover-elevate rounded-md px-3 py-2"
                          data-testid="link-mobile-account"
                        >
                          حساب کاربری
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-medium hover-elevate rounded-md px-3 py-2"
                            data-testid="link-mobile-admin"
                          >
                            پنل مدیریت
                          </Link>
                        )}
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <span className="text-xl font-bold text-primary-foreground">S</span>
                </div>
                <span className="hidden font-bold text-xl sm:inline-block">Shop</span>
              </Link>

              <nav className="hidden lg:flex lg:items-center lg:gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                      location === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                    data-testid={`link-nav-${item.name}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-4"
            >
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="جستجوی محصولات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 w-full"
                  data-testid="input-search"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                data-testid="button-cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl || undefined} className="object-cover" />
                        <AvatarFallback>
                          {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.firstName || "کاربر"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="w-full cursor-pointer" data-testid="link-account">
                        <User className="ml-2 h-4 w-4" />
                        حساب کاربری
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders" className="w-full cursor-pointer" data-testid="link-orders">
                        <ShoppingCart className="ml-2 h-4 w-4" />
                        سفارشات من
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="w-full cursor-pointer" data-testid="link-admin">
                            <ChevronDown className="ml-2 h-4 w-4" />
                            پنل مدیریت
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => {
                        localStorage.removeItem("auth");
                        window.location.href = "/";
                      }}
                      className="w-full cursor-pointer text-destructive" 
                      data-testid="link-logout"
                    >
                      <LogOut className="ml-2 h-4 w-4" />
                      خروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild data-testid="button-login">
                  <Link href="/login">ورود</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
