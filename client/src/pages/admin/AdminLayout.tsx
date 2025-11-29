import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FolderTree,
  ArrowRight,
  Menu,
  LogOut,
  Sun,
  Moon,
  Ticket,
  MessageSquare,
  Newspaper,
  FileText,
  Tag,
  TrendingUp,
  Zap,
  Wallet,
  HelpCircle,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/layout/ThemeProvider";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "داشبورد", href: "/admin", icon: LayoutDashboard },
  { name: "محصولات", href: "/admin/products", icon: Package },
  { name: "دسته‌بندی‌ها", href: "/admin/categories", icon: FolderTree },
  { name: "سفارشات", href: "/admin/orders", icon: ShoppingCart },
  { name: "کاربران", href: "/admin/users", icon: Users },
  { name: "کوپن‌ها", href: "/admin/coupons", icon: Ticket },
  { name: "نظرات", href: "/admin/reviews", icon: MessageSquare },
  { name: "مقالات", href: "/admin/articles", icon: FileText },
  { name: "اخبار", href: "/admin/news", icon: Newspaper },
  { name: "صفحات", href: "/admin/pages", icon: FileText },
  { name: "برندها", href: "/admin/brands", icon: Tag },
  { name: "ویژگی‌های محصول", href: "/admin/product-attributes", icon: Zap },
  { name: "روش‌های ارسال", href: "/admin/shipping-methods", icon: TrendingUp },
  { name: "نقاط اعتباری", href: "/admin/credit-points", icon: Zap },
  { name: "کیف‌پول", href: "/admin/wallet", icon: Wallet },
  { name: "پرسش‌ها", href: "/admin/questions", icon: HelpCircle },
  { name: "پاسخ‌ها", href: "/admin/answers", icon: MessageSquare },
  { name: "کیف‌پول کاربران", href: "/admin/user-wallets", icon: Wallet },
  { name: "اسلایدرها", href: "/admin/sliders", icon: Image },
  { name: "گزارشات", href: "/admin/reports", icon: TrendingUp },
  { name: "تنظیمات", href: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [location] = useLocation();
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      toast({
        title: "دسترسی غیرمجاز",
        description: "شما دسترسی به پنل مدیریت ندارید.",
        variant: "destructive",
      });
      window.location.href = "/";
    }
  }, [isLoading, isAuthenticated, isAdmin, toast]);

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full ${mobile ? "" : "w-64"}`}>
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">S</span>
          </div>
          <div>
            <span className="font-bold text-lg">Shop</span>
            <span className="text-xs text-muted-foreground block">پنل مدیریت</span>
          </div>
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              (item.href === "/admin" && location === "/admin") ||
              (item.href !== "/admin" && location.startsWith(item.href))
                ? "bg-primary text-primary-foreground"
                : "hover-elevate text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <Separator />

      <div className="p-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-muted-foreground hover-elevate"
        >
          <ArrowRight className="h-5 w-5" />
          بازگشت به سایت
        </Link>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profileImageUrl || undefined} className="object-cover" />
            <AvatarFallback>
              {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">
              {user?.firstName || "ادمین"}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <a href="/api/logout" title="خروج">
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-l bg-card">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 h-16 border-b bg-background flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-64">
                <Sidebar mobile />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
