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
