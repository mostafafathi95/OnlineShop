import { Suspense, lazy, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import NotFound from "@/pages/not-found";
import { Skeleton } from "@/components/ui/skeleton";
import { initPerformanceMonitoring } from "@/utils/performanceMonitoring";
import { AdminRoute } from "@/components/AdminRoute";

// Lazy load pages
const Landing = lazy(() => import("@/pages/Landing"));
const Products = lazy(() => import("@/pages/Products"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const ProductsCompare = lazy(() => import("@/pages/ProductsCompare"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/checkout/Checkout"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Terms = lazy(() => import("@/pages/Terms"));
const Articles = lazy(() => import("@/pages/Articles"));
const ArticleDetail = lazy(() => import("@/pages/ArticleDetail"));
const News = lazy(() => import("@/pages/News"));
const NewsDetail = lazy(() => import("@/pages/NewsDetail"));
const StaticPage = lazy(() => import("@/pages/StaticPage"));

// Lazy load account pages
const AccountDashboard = lazy(() => import("@/pages/account/Dashboard"));
const AccountOrders = lazy(() => import("@/pages/account/Orders"));
const AccountOrderDetail = lazy(() => import("@/pages/account/OrderDetail"));
const AccountAddresses = lazy(() => import("@/pages/account/Addresses"));
const AccountProfile = lazy(() => import("@/pages/account/Profile"));
const AccountWishlist = lazy(() => import("@/pages/account/Wishlist"));
const AccountReviews = lazy(() => import("@/pages/account/Reviews"));

// Lazy load admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/Products"));
const AdminProductForm = lazy(() => import("@/pages/admin/ProductForm"));
const AdminCategories = lazy(() => import("@/pages/admin/Categories"));
const AdminOrders = lazy(() => import("@/pages/admin/Orders"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminCoupons = lazy(() => import("@/pages/admin/Coupons"));
const AdminReviews = lazy(() => import("@/pages/admin/Reviews"));
const AdminArticles = lazy(() => import("@/pages/admin/Articles"));
const AdminArticleForm = lazy(() => import("@/pages/admin/ArticleForm"));
const AdminNews = lazy(() => import("@/pages/admin/News"));
const AdminNewsForm = lazy(() => import("@/pages/admin/NewsForm"));
const AdminPages = lazy(() => import("@/pages/admin/Pages"));
const AdminPageForm = lazy(() => import("@/pages/admin/PageForm"));
const AdminBrands = lazy(() => import("@/pages/admin/Brands"));
const AdminBrandForm = lazy(() => import("@/pages/admin/BrandForm"));
const AdminProductAttributes = lazy(() => import("@/pages/admin/ProductAttributes"));
const AdminShippingMethods = lazy(() => import("@/pages/admin/ShippingMethods"));
const AdminCreditPoints = lazy(() => import("@/pages/admin/CreditPoints"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminQuestions = lazy(() => import("@/pages/admin/Questions"));
const AdminAnswers = lazy(() => import("@/pages/admin/Answers"));
const AdminUserWallets = lazy(() => import("@/pages/admin/UserWallets"));
const ProductAttributesForm = lazy(() => import("@/pages/admin/ProductAttributesForm"));
const ShippingMethodsForm = lazy(() => import("@/pages/admin/ShippingMethodsForm"));
const AdminReports = lazy(() => import("@/pages/admin/Reports"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const AdminAccess = lazy(() => import("@/pages/AdminAccess"));
const AdminSliders = lazy(() => import("@/pages/admin/Sliders"));
const AdminSliderForm = lazy(() => import("@/pages/admin/SliderForm"));
const AdminLanding = lazy(() => import("@/pages/admin/AdminLanding"));
const AdminBanners = lazy(() => import("@/pages/admin/AdminBanners"));
const AdminRequests = lazy(() => import("@/pages/admin/Requests"));
const AdminAnalytics = lazy(() => import("@/pages/admin/Analytics"));
const AdminExport = lazy(() => import("@/pages/admin/Export"));
const SearchResults = lazy(() => import("@/pages/SearchResults"));
const FormDemo = lazy(() => import("@/pages/FormDemo"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/products" component={Products} />
      <Route path="/products/:slug" component={ProductDetail} />
      <Route path="/products/compare" component={ProductsCompare} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:slug" component={ArticleDetail} />
      <Route path="/news" component={News} />
      <Route path="/news/:slug" component={NewsDetail} />
      <Route path="/page/:slug" component={StaticPage} />
      <Route path="/search" component={SearchResults} />
      <Route path="/form-demo" component={FormDemo} />

      {/* Auth routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin-access" component={AdminAccess} />

      {/* Account routes */}
      <Route path="/account" component={AccountDashboard} />
      <Route path="/account/orders" component={AccountOrders} />
      <Route path="/account/orders/:id" component={AccountOrderDetail} />
      <Route path="/account/addresses" component={AccountAddresses} />
      <Route path="/account/profile" component={AccountProfile} />
      <Route path="/account/wishlist" component={AccountWishlist} />
      <Route path="/account/reviews" component={AccountReviews} />

      {/* Admin routes - Protected with auth guard */}
      <Route path="/admin" component={(props) => <AdminRoute component={AdminDashboard} {...props} />} />
      <Route path="/admin/products" component={(props) => <AdminRoute component={AdminProducts} {...props} />} />
      <Route path="/admin/products/:id" component={(props) => <AdminRoute component={AdminProductForm} {...props} />} />
      <Route path="/admin/categories" component={(props) => <AdminRoute component={AdminCategories} {...props} />} />
      <Route path="/admin/orders" component={(props) => <AdminRoute component={AdminOrders} {...props} />} />
      <Route path="/admin/users" component={(props) => <AdminRoute component={AdminUsers} {...props} />} />
      <Route path="/admin/coupons" component={(props) => <AdminRoute component={AdminCoupons} {...props} />} />
      <Route path="/admin/reviews" component={(props) => <AdminRoute component={AdminReviews} {...props} />} />
      <Route path="/admin/articles" component={(props) => <AdminRoute component={AdminArticles} {...props} />} />
      <Route path="/admin/articles/:id" component={(props) => <AdminRoute component={AdminArticleForm} {...props} />} />
      <Route path="/admin/news" component={(props) => <AdminRoute component={AdminNews} {...props} />} />
      <Route path="/admin/news/:id" component={(props) => <AdminRoute component={AdminNewsForm} {...props} />} />
      <Route path="/admin/pages" component={(props) => <AdminRoute component={AdminPages} {...props} />} />
      <Route path="/admin/pages/:id" component={(props) => <AdminRoute component={AdminPageForm} {...props} />} />
      <Route path="/admin/brands" component={(props) => <AdminRoute component={AdminBrands} {...props} />} />
      <Route path="/admin/brands/:id" component={(props) => <AdminRoute component={AdminBrandForm} {...props} />} />
      <Route path="/admin/attributes" component={(props) => <AdminRoute component={AdminProductAttributes} {...props} />} />
      <Route path="/admin/attributes/:id" component={(props) => <AdminRoute component={ProductAttributesForm} {...props} />} />
      <Route path="/admin/shipping" component={(props) => <AdminRoute component={AdminShippingMethods} {...props} />} />
      <Route path="/admin/shipping/:id" component={(props) => <AdminRoute component={ShippingMethodsForm} {...props} />} />
      <Route path="/admin/credits" component={(props) => <AdminRoute component={AdminCreditPoints} {...props} />} />
      <Route path="/admin/settings" component={(props) => <AdminRoute component={AdminSettings} {...props} />} />
      <Route path="/admin/questions" component={(props) => <AdminRoute component={AdminQuestions} {...props} />} />
      <Route path="/admin/answers" component={(props) => <AdminRoute component={AdminAnswers} {...props} />} />
      <Route path="/admin/wallets" component={(props) => <AdminRoute component={AdminUserWallets} {...props} />} />
      <Route path="/admin/reports" component={(props) => <AdminRoute component={AdminReports} {...props} />} />
      <Route path="/admin/sliders" component={(props) => <AdminRoute component={AdminSliders} {...props} />} />
      <Route path="/admin/sliders/:id" component={(props) => <AdminRoute component={AdminSliderForm} {...props} />} />
      <Route path="/admin/landing" component={(props) => <AdminRoute component={AdminLanding} {...props} />} />
      <Route path="/admin/banners" component={(props) => <AdminRoute component={AdminBanners} {...props} />} />
      <Route path="/admin/requests" component={(props) => <AdminRoute component={AdminRequests} {...props} />} />
      <Route path="/admin/analytics" component={(props) => <AdminRoute component={AdminAnalytics} {...props} />} />
      <Route path="/admin/export" component={(props) => <AdminRoute component={AdminExport} {...props} />} />

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    initPerformanceMonitoring();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Router />
          </Suspense>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
