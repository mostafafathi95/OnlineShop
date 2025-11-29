import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { useCartStore } from "@/stores/cartStore";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const subtotal = getTotal();
  const shippingCost = subtotal > 500000 ? 0 : 50000;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">سبد خرید خالی است</h1>
            <p className="text-muted-foreground mb-6">
              محصولات مورد علاقه خود را به سبد خرید اضافه کنید.
            </p>
            <Button asChild size="lg">
              <Link href="/products" data-testid="link-browse-products">
                مشاهده محصولات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} data-testid={`cart-item-${item.id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image || "https://placehold.co/128x128/e2e8f0/64748b?text=No+Image"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-medium hover:text-primary line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-primary font-semibold mt-2">
                        {formatPrice(Number(item.price))} تومان
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            {formatPrice(Number(item.price) * item.quantity)} تومان
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removeItem(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={clearCart}
                data-testid="button-clear-cart"
              >
                <Trash2 className="ml-2 h-4 w-4" />
                خالی کردن سبد
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                {shippingCost > 0 && (
                  <p className="text-xs text-muted-foreground">
                    برای خرید بالای ۵۰۰,۰۰۰ تومان ارسال رایگان است.
                  </p>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع</span>
                  <span className="text-primary" data-testid="text-cart-total">
                    {formatPrice(total)} تومان
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout" data-testid="link-checkout">
                    ادامه خرید
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/products" data-testid="link-continue-shopping">
                    ادامه خرید از فروشگاه
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
