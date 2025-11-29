import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Check, CreditCard, MapPin, Package, ArrowRight, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Address } from "@shared/schema";

const steps = [
  { id: 1, name: "آدرس", icon: MapPin },
  { id: 2, name: "پرداخت", icon: CreditCard },
  { id: 3, name: "تایید", icon: Check },
];

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [notes, setNotes] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    title: "",
    fullName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    enabled: isAuthenticated,
  });

  const createAddressMutation = useMutation({
    mutationFn: async (data: typeof newAddress) => {
      return apiRequest("POST", "/api/addresses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/addresses"] });
      setShowNewAddress(false);
      setNewAddress({
        title: "",
        fullName: "",
        phone: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
      });
      toast({ title: "آدرس جدید اضافه شد" });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: {
      addressId: number;
      paymentMethod: string;
      notes: string;
      items: { productId: number; quantity: number }[];
    }) => {
      return apiRequest("POST", "/api/orders", data);
    },
    onSuccess: (order: any) => {
      clearCart();
      toast({ title: "سفارش شما با موفقیت ثبت شد" });
      setLocation(`/account/orders/${order.id}`);
    },
    onError: () => {
      toast({
        title: "خطا در ثبت سفارش",
        description: "لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "نیاز به ورود",
        description: "برای ادامه خرید ابتدا وارد شوید.",
        variant: "destructive",
      });
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (addresses?.length && !selectedAddress) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddress(defaultAddr.id);
    }
  }, [addresses, selectedAddress]);

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const subtotal = getTotal();
  const shippingCost = subtotal > 500000 ? 0 : 50000;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">سبد خرید خالی است</h1>
          <Button asChild>
            <Link href="/products">مشاهده محصولات</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedAddress && !showNewAddress) {
      toast({
        title: "آدرس انتخاب نشده",
        description: "لطفا یک آدرس انتخاب کنید یا آدرس جدید اضافه کنید.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmitOrder = () => {
    if (!selectedAddress) {
      toast({
        title: "آدرس انتخاب نشده",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate({
      addressId: selectedAddress,
      paymentMethod,
      notes,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });
  };

  const handleAddAddress = () => {
    if (!newAddress.title || !newAddress.fullName || !newAddress.phone || !newAddress.address) {
      toast({
        title: "اطلاعات ناقص",
        description: "لطفا همه فیلدهای الزامی را پر کنید.",
        variant: "destructive",
      });
      return;
    }
    createAddressMutation.mutate(newAddress);
  };

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 ${
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="hidden sm:inline font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-4 w-4 mx-2 md:mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    انتخاب آدرس
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses && addresses.length > 0 && !showNewAddress && (
                    <RadioGroup
                      value={selectedAddress?.toString()}
                      onValueChange={(value) => setSelectedAddress(parseInt(value))}
                    >
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedAddress === address.id
                              ? "border-primary bg-primary/5"
                              : "border-transparent bg-muted/50"
                          }`}
                          onClick={() => setSelectedAddress(address.id)}
                        >
                          <RadioGroupItem value={address.id.toString()} id={`addr-${address.id}`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{address.title}</span>
                              {address.isDefault && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                  پیش‌فرض
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {address.fullName} - {address.phone}
                            </p>
                            <p className="text-sm mt-1">
                              {address.province}، {address.city}، {address.address}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              کد پستی: {address.postalCode}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {!showNewAddress && (
                    <Button
                      variant="outline"
                      onClick={() => setShowNewAddress(true)}
                      className="w-full"
                    >
                      <Plus className="ml-2 h-4 w-4" />
                      افزودن آدرس جدید
                    </Button>
                  )}

                  {showNewAddress && (
                    <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>عنوان آدرس *</Label>
                          <Input
                            placeholder="مثلا: خانه"
                            value={newAddress.title}
                            onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>نام و نام خانوادگی *</Label>
                          <Input
                            value={newAddress.fullName}
                            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>شماره تماس *</Label>
                          <Input
                            dir="ltr"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>کد پستی *</Label>
                          <Input
                            dir="ltr"
                            value={newAddress.postalCode}
                            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>استان *</Label>
                          <Input
                            value={newAddress.province}
                            onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>شهر *</Label>
                          <Input
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>آدرس کامل *</Label>
                        <Textarea
                          value={newAddress.address}
                          onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddAddress} disabled={createAddressMutation.isPending}>
                          {createAddressMutation.isPending ? "در حال ذخیره..." : "ذخیره آدرس"}
                        </Button>
                        <Button variant="outline" onClick={() => setShowNewAddress(false)}>
                          انصراف
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    روش پرداخت
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                        paymentMethod === "online"
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-muted/50"
                      }`}
                      onClick={() => setPaymentMethod("online")}
                    >
                      <RadioGroupItem value="online" id="online" />
                      <div className="flex-1">
                        <Label htmlFor="online" className="font-medium cursor-pointer">
                          پرداخت آنلاین
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          پرداخت امن از طریق درگاه بانکی
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer mt-3 ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-transparent bg-muted/50"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex-1">
                        <Label htmlFor="cod" className="font-medium cursor-pointer">
                          پرداخت در محل
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          پرداخت هنگام تحویل سفارش
                        </p>
                      </div>
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </RadioGroup>

                  <div className="mt-6">
                    <Label>یادداشت سفارش (اختیاری)</Label>
                    <Textarea
                      placeholder="توضیحات یا درخواست خاص..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    تایید نهایی
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">آدرس تحویل</h3>
                    {addresses && selectedAddress && (
                      <div className="p-4 rounded-lg bg-muted/50">
                        {(() => {
                          const addr = addresses.find((a) => a.id === selectedAddress);
                          return addr ? (
                            <>
                              <p className="font-medium">{addr.title}</p>
                              <p className="text-sm">
                                {addr.fullName} - {addr.phone}
                              </p>
                              <p className="text-sm">
                                {addr.province}، {addr.city}، {addr.address}
                              </p>
                            </>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">روش پرداخت</h3>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p>{paymentMethod === "online" ? "پرداخت آنلاین" : "پرداخت در محل"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">محصولات</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                          <img
                            src={item.image || "https://placehold.co/60x60"}
                            alt={item.name}
                            className="w-15 h-15 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.quantity} عدد × {formatPrice(Number(item.price))} تومان
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatPrice(Number(item.price) * item.quantity)} تومان
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  مرحله قبل
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/cart">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    بازگشت به سبد
                  </Link>
                </Button>
              )}

              {currentStep < 3 ? (
                <Button onClick={handleNextStep}>
                  مرحله بعد
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={createOrderMutation.isPending}
                  size="lg"
                >
                  {createOrderMutation.isPending ? "در حال ثبت..." : "ثبت سفارش"}
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[150px]">
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(Number(item.price) * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">جمع محصولات</span>
                  <span>{formatPrice(subtotal)} تومان</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">هزینه ارسال</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      `${formatPrice(shippingCost)} تومان`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع</span>
                  <span className="text-primary">{formatPrice(total)} تومان</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
