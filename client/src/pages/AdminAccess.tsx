import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Lock, User, Key, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";

export default function AdminAccess() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    document.title = "دسترسی مدیریت | فروشگاه اینترنتی";
  }, []);

  const handleAdminAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple password check for demo
    if (password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("auth", JSON.stringify({
        token: `admin_${Date.now()}`,
        user: {
          id: 1,
          email: "admin@example.com",
          fullName: "مدیر سیستم",
          role: "admin"
        }
      }));
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } else {
      setError("رمز عبور اشتباه است");
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setError("");
        alert("تمام داده‌های نمونه با موفقیت ایجاد شدند!");
      }
    } catch (err) {
      setError("خطا در ایجاد داده‌ها");
    }
    setSeeding(false);
  };

  if (isAdmin) {
    return null;
  }

  return (
    <Layout hideFooter>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Lock className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl">دسترسی مدیریت</CardTitle>
              </div>
              <CardDescription>ورود به پنل کنترل سایت</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Admin Quick Access */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  ورود سریع مدیر
                </h3>
                
                <form onSubmit={handleAdminAccess} className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">رمز مدیریت</label>
                    <Input
                      type="password"
                      placeholder="رمز ورود مدیریت"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10"
                      data-testid="input-admin-password"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full h-10" data-testid="button-admin-access">
                    ورود به پنل مدیریت
                  </Button>
                </form>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background">یا</span>
                </div>
              </div>

              {/* Standard Login */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  ورود استاندارد
                </h3>
                
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <p className="text-sm text-muted-foreground">
                    از اطلاعات زیر برای ورود استفاده کنید:
                  </p>
                  <div className="space-y-2 bg-background p-3 rounded border border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ایمیل:</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">admin@example.com</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">رمز:</span>
                      <code className="bg-muted px-2 py-1 rounded text-xs">admin123</code>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/login">
                      رفتن به صفحه ورود
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Seed Data */}
              <div className="space-y-3 pt-4 border-t">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={handleSeed}
                  disabled={seeding}
                  data-testid="button-seed-data"
                >
                  {seeding ? "درحال ایجاد..." : "ایجاد داده‌های نمونه"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  برای ایجاد کاربران و محصولات نمونه کلیک کنید
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="mt-6 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-700 dark:text-green-400">
                  <p className="font-semibold mb-1">راهنمای ورود:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>رمز "admin123" را وارد کنید</li>
                    <li>یا از صفحه ورود استاندارد استفاده کنید</li>
                    <li>بعد از ورود، دکمه "پنل مدیریت" را کلیک کنید</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
