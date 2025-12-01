import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAVIGATION } from "./constants";

interface HeaderMobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  location: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function HeaderMobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  location,
  isAuthenticated,
  isAdmin,
}: HeaderMobileMenuProps) {
  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav className="flex flex-col gap-4 mt-8">
          {NAVIGATION.map((item) => (
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
  );
}
