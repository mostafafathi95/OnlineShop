import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "@shared/schema";

import { StepProgressIndicator } from "@/components/checkout/StepProgressIndicator";
import { CheckoutStepContent } from "@/components/checkout/CheckoutStepContent";

import { CHECKOUT_STEPS } from "./constants";
import { useCheckoutState } from "./hooks/useCheckoutState";
import { useCheckoutMutations } from "./hooks/useCheckoutMutations";
import { useCheckoutLogic, calculatePrices, validateAddressSelection, validatePaymentSelection, buildOrderPayload } from "./hooks/useCheckoutLogic";

import { AddressStep } from "./components/AddressStep";
import { PaymentStep } from "./components/PaymentStep";
import { ReviewStep } from "./components/ReviewStep";
import { OrderSummary } from "./components/OrderSummary";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { items, getTotal, clearCart } = useCartStore();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const state = useCheckoutState();
  const mutations = useCheckoutMutations();

  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
    enabled: isAuthenticated,
  });

  useCheckoutLogic(addresses, state.selectedAddress, state.setSelectedAddress);

  useEffect(() => {
    document.title = "تسویه حساب | فروشگاه اینترنتی";
  }, []);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/api/login";
    }
  }, [authLoading, isAuthenticated]);

  const handleNextStep = () => {
    if (state.currentStep === 1 && !validateAddressSelection(state.selectedAddress, state.showNewAddress)) {
      toast({ title: "آدرس انتخاب نشده", variant: "destructive" });
      return;
    }
    if (state.currentStep < 3) {
      state.setCurrentStep(state.currentStep + 1);
    }
  };

  const handleSubmitOrder = () => {
    if (!state.selectedAddress) {
      toast({ title: "آدرس انتخاب نشده", variant: "destructive" });
      return;
    }

    if (!validatePaymentSelection(state.paymentMethod, state.paymentGateway)) {
      toast({ title: "درگاه پرداخت انتخاب نشده", variant: "destructive" });
      return;
    }

    mutations.createOrderMutation.mutate(buildOrderPayload(
      state.selectedAddress,
      state.paymentMethod,
      state.paymentGateway,
      state.notes,
      items,
      state.appliedCoupon
    ));
  };

  const handleAddAddress = () => {
    if (!state.newAddress.title || !state.newAddress.fullName || !state.newAddress.phone || !state.newAddress.address) {
      toast({ title: "اطلاعات ناقص", description: "لطفا همه فیلدهای الزامی را پر کنید.", variant: "destructive" });
      return;
    }
    mutations.createAddressMutation.mutate(state.newAddress);
  };

  const prices = calculatePrices(getTotal(), state.appliedCoupon);

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

  return (
    <Layout hideFooter>
      <div className="container mx-auto px-4 py-8">
        <StepProgressIndicator
          steps={CHECKOUT_STEPS}
          currentStep={state.currentStep}
          onStepClick={(step) => {
            if (step < state.currentStep) {
              state.setCurrentStep(step);
            }
          }}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutStepContent isActive={state.currentStep === 1}>
              <AddressStep
                addresses={addresses}
                selectedAddress={state.selectedAddress}
                onSelectAddress={state.setSelectedAddress}
                showNewAddress={state.showNewAddress}
                onShowNewAddress={state.setShowNewAddress}
                newAddress={state.newAddress}
                onNewAddressChange={state.setNewAddress}
                isLoading={mutations.createAddressMutation.isPending}
                onAddAddress={handleAddAddress}
              />
            </CheckoutStepContent>

            <CheckoutStepContent isActive={state.currentStep === 2}>
              <PaymentStep
                paymentMethod={state.paymentMethod}
                onPaymentMethodChange={state.setPaymentMethod}
                paymentGateway={state.paymentGateway}
                onPaymentGatewayChange={state.setPaymentGateway}
                notes={state.notes}
                onNotesChange={state.setNotes}
              />
            </CheckoutStepContent>

            <CheckoutStepContent isActive={state.currentStep === 3}>
              <ReviewStep
                addresses={addresses}
                selectedAddress={state.selectedAddress}
                paymentMethod={state.paymentMethod}
                items={items}
              />
            </CheckoutStepContent>

            <div className="flex justify-between mt-6">
              {state.currentStep > 1 ? (
                <Button variant="outline" onClick={() => state.setCurrentStep(state.currentStep - 1)}>
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  مرحله قبل
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link href="/cart">
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    بازگشت
                  </Link>
                </Button>
              )}

              {state.currentStep < 3 ? (
                <Button onClick={handleNextStep}>
                  مرحله بعد
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  disabled={mutations.createOrderMutation.isPending}
                  size="lg"
                >
                  {mutations.createOrderMutation.isPending ? "در حال ثبت..." : "ثبت سفارش"}
                </Button>
              )}
            </div>
          </div>

          <OrderSummary
            items={items}
            priceDetails={prices}
            appliedCoupon={state.appliedCoupon}
            couponCode={state.couponCode}
            onCouponCodeChange={state.setCouponCode}
            isLoadingCoupon={mutations.validateCouponMutation.isPending}
            onApplyCoupon={() => mutations.validateCouponMutation.mutate(state.couponCode)}
          />
        </div>
      </div>
    </Layout>
  );
}
