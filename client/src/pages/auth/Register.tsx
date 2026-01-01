import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldWithValidation } from "@/components/forms/FormFieldWithValidation";
import { PasswordStrengthIndicator } from "@/components/forms/PasswordStrengthIndicator";
import { t } from "@/lib/i18n";

// Zod schema for the registration form
const registerSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const registerMutation = useMutation({
    mutationFn: async (data: Omit<RegisterFormData, "confirmPassword" | "agreeTerms">) => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error || "Registration failed");
      return responseData;
    },
    onSuccess: (data: any) => {
      localStorage.setItem("auth", JSON.stringify(data));
      setLocation("/");
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    registerMutation.mutate({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
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
              {registerMutation.error && (
                <Alert variant="destructive" className="animate-shake">
                  <AlertDescription>{registerMutation.error.message}</AlertDescription>
                </Alert>
              )}
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormFieldWithValidation<RegisterFormData>
                    name="fullName"
                    label="نام کامل"
                    placeholder="نام و نام خانوادگی"
                  />
                  <FormFieldWithValidation<RegisterFormData>
                    name="email"
                    label="ایمیل"
                    type="email"
                    placeholder="your@email.com"
                    dir="ltr"
                  />
                  <div>
                    <FormFieldWithValidation<RegisterFormData>
                      name="password"
                      label="رمز عبور"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز قوی انتخاب کنید"
                    />
                    <PasswordStrengthIndicator<RegisterFormData> name="password" />
                  </div>
                  <FormFieldWithValidation<RegisterFormData>
                    name="confirmPassword"
                    label="تأیید رمز عبور"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز را مجدد وارد کنید"
                  />
                  <div className="flex items-start gap-2">
                    <Controller
                      name="agreeTerms"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      )}
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                      با شرایط و ضوابط و سیاست حریم خصوصی موافق‌ام
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-destructive">{errors.agreeTerms.message}</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 text-base"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "درحال ثبت‌نام..." : "ثبت‌نام"}
                  </Button>
                </form>
              </FormProvider>
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
