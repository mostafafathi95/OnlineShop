import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import { PasswordStrengthIndicator } from "@/components/forms/PasswordStrengthIndicator";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const registerMutation = useMutation({
    mutationFn: async (data: { fullName: string; email: string; password: string }) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "خطا در ثبت‌نام");
      return responseData;
    },
    onSuccess: (data: any) => {
      localStorage.setItem("auth", JSON.stringify(data));
      setLocation("/");
    },
    onError: (err: any) => {
      setError(err.message || "خطا در ثبت‌نام. لطفا مجددا تلاش کنید.");
    },
  });

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    setPasswordStrength((strength / 4) * 100);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    calculatePasswordStrength(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("لطفا تمام فیلدها را پر کنید");
      return;
    }

    if (password !== confirmPassword) {
      setError("رمزهای عبور مطابقت ندارند");
      return;
    }

    if (password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }

    if (!agreeTerms) {
      setError("لطفا با شرایط و ضوابط موافقت کنید");
      return;
    }

    registerMutation.mutate({ fullName, email, password });
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[100vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-slide-up">
          <Card className="shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl">ثبت‌نام</CardTitle>
              <CardDescription>یک حساب جدید ایجاد کنید</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">نام کامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز قوی انتخاب کنید"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {password && <PasswordStrengthIndicator password={password} />}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأیید رمز عبور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز را مجدد وارد کنید"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10"
                    />
                    {confirmPassword && password === confirmPassword && (
                      <Check className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                    با شرایط و ضوابط و سیاست حریم خصوصی موافق‌ام
                  </label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-11 text-base"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "درحال ثبت‌نام..." : "ثبت‌نام"}
                </Button>
              </form>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  قبلاً ثبت‌نام کرده‌اید؟{" "}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    وارد شوید
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
