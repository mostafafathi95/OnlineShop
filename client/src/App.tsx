import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import ProductsCompare from "@/pages/ProductsCompare";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";

import AccountDashboard from "@/pages/account/Dashboard";
import AccountOrders from "@/pages/account/Orders";
import AccountOrderDetail from "@/pages/account/OrderDetail";
import AccountAddresses from "@/pages/account/Addresses";
import AccountProfile from "@/pages/account/Profile";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminProductForm from "@/pages/admin/ProductForm";
import AdminCategories from "@/pages/admin/Categories";
import AdminOrders from "@/pages/admin/Orders";
import AdminUsers from "@/pages/admin/Users";
import AdminCoupons from "@/pages/admin/Coupons";
import AdminReviews from "@/pages/admin/Reviews";
import AdminArticles from "@/pages/admin/Articles";
import AdminArticleForm from "@/pages/admin/ArticleForm";
import AdminNews from "@/pages/admin/News";
import AdminNewsForm from "@/pages/admin/NewsForm";
import AdminPages from "@/pages/admin/Pages";
import AdminPageForm from "@/pages/admin/PageForm";
import AdminBrands from "@/pages/admin/Brands";
import AdminBrandForm from "@/pages/admin/BrandForm";
import AdminProductAttributes from "@/pages/admin/ProductAttributes";
import AdminShippingMethods from "@/pages/admin/ShippingMethods";
import AdminCreditPoints from "@/pages/admin/CreditPoints";
import AdminSettings from "@/pages/admin/Settings";
import AdminQuestions from "@/pages/admin/Questions";
import AdminAnswers from "@/pages/admin/Answers";
import AdminUserWallets from "@/pages/admin/UserWallets";
import ProductAttributesForm from "@/pages/admin/ProductAttributesForm";
import ShippingMethodsForm from "@/pages/admin/ShippingMethodsForm";

import AccountWishlist from "@/pages/account/Wishlist";
import AccountReviews from "@/pages/account/Reviews";

import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AdminAccess from "@/pages/AdminAccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/admin-access" component={AdminAccess} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/products/compare" component={ProductsCompare} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />

      <Route path="/account" component={AccountDashboard} />
      <Route path="/account/orders" component={AccountOrders} />
      <Route path="/account/orders/:id" component={AccountOrderDetail} />
      <Route path="/account/wishlist" component={AccountWishlist} />
      <Route path="/account/reviews" component={AccountReviews} />
      <Route path="/account/addresses" component={AccountAddresses} />
      <Route path="/account/profile" component={AccountProfile} />

      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/products/:id" component={AdminProductForm} />
      <Route path="/admin/categories" component={AdminCategories} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/coupons" component={AdminCoupons} />
      <Route path="/admin/reviews" component={AdminReviews} />
      <Route path="/admin/articles" component={AdminArticles} />
      <Route path="/admin/articles/:id" component={AdminArticleForm} />
      <Route path="/admin/news" component={AdminNews} />
      <Route path="/admin/news/:id" component={AdminNewsForm} />
      <Route path="/admin/pages" component={AdminPages} />
      <Route path="/admin/pages/:id" component={AdminPageForm} />
      <Route path="/admin/brands" component={AdminBrands} />
      <Route path="/admin/brands/:id" component={AdminBrandForm} />
      <Route path="/admin/product-attributes" component={AdminProductAttributes} />
      <Route path="/admin/shipping-methods" component={AdminShippingMethods} />
      <Route path="/admin/credit-points" component={AdminCreditPoints} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/admin/questions" component={AdminQuestions} />
      <Route path="/admin/answers" component={AdminAnswers} />
      <Route path="/admin/user-wallets" component={AdminUserWallets} />
      <Route path="/admin/product-attributes/new" component={ProductAttributesForm} />
      <Route path="/admin/product-attributes/:id" component={ProductAttributesForm} />
      <Route path="/admin/shipping-methods/new" component={ShippingMethodsForm} />
      <Route path="/admin/shipping-methods/:id" component={ShippingMethodsForm} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
