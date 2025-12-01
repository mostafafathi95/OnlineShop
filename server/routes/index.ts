/**
 * Central Route Registration System
 * Imports and registers all modular routes
 */

import type { Express } from "express";

// Import all route registration functions
import { registerPublicProductRoutes } from "./public/products";
import { registerPublicCategoryRoutes } from "./public/categories";
import { registerAuthRoutes } from "./auth";
import { registerUserAddressRoutes } from "./user/addresses";
import { registerUserOrderRoutes } from "./user/orders";
import { registerUserReviewRoutes } from "./user/reviews";
import { registerUserWishlistRoutes } from "./user/wishlist";
import { registerAdminDashboardRoutes } from "./admin/dashboard";
import { registerAdminProductRoutes } from "./admin/products";
import { registerAdminCategoryRoutes } from "./admin/categories";
import { registerAdminOrderRoutes } from "./admin/orders";
import { registerAdminUserRoutes } from "./admin/users";
import { registerAdminCouponRoutes } from "./admin/coupons";
import { registerAdminReviewRoutes } from "./admin/reviews";
import { registerComparisonRoutes } from "./features/comparisons";
import { registerPaymentRoutes } from "./payment";
import { registerArticleRoutes } from "./content/articles";
import { registerNewsRoutes } from "./content/news";
import { registerPageRoutes } from "./content/pages";
import { registerBrandRoutes } from "./catalog/brands";
import { registerAttributeRoutes } from "./catalog/attributes";
import { registerShippingRoutes } from "./catalog/shipping";
import { registerQuestionRoutes } from "./features/questions";
import { registerAnswerRoutes } from "./features/answers";
import { registerSliderRoutes } from "./features/sliders";
import { registerBannerRoutes } from "./features/banners";
import { registerCreditPointRoutes } from "./features/credit-points";
import { registerSearchRoutes } from "./search";
import { registerUploadRoutes } from "./upload";
import { registerSettingRoutes } from "./settings";
import { registerRequestRoutes } from "./requests";
import { registerWalletRoutes } from "./user/wallet";
import { registerCartRoutes } from "./user/cart";
import { registerSeedRoutes } from "./seed";
import { registerHealthRoutes } from "./admin/health";

export { requireAuth, requireAdmin } from "./middleware";
export { generateOrderNumber, handleError, formatResponse } from "./utils";

export async function setupAllRoutes(app: Express): Promise<void> {
  // Public routes
  await registerPublicProductRoutes(app);
  await registerPublicCategoryRoutes(app);
  
  // Auth routes
  await registerAuthRoutes(app);
  
  // User routes
  await registerUserAddressRoutes(app);
  await registerUserOrderRoutes(app);
  await registerUserReviewRoutes(app);
  await registerUserWishlistRoutes(app);
  await registerWalletRoutes(app);
  await registerCartRoutes(app);
  
  // Admin routes
  await registerAdminDashboardRoutes(app);
  await registerAdminProductRoutes(app);
  await registerAdminCategoryRoutes(app);
  await registerAdminOrderRoutes(app);
  await registerAdminUserRoutes(app);
  await registerAdminCouponRoutes(app);
  await registerAdminReviewRoutes(app);
  
  // Content routes
  await registerArticleRoutes(app);
  await registerNewsRoutes(app);
  await registerPageRoutes(app);
  
  // Catalog routes
  await registerBrandRoutes(app);
  await registerAttributeRoutes(app);
  await registerShippingRoutes(app);
  
  // Features
  await registerQuestionRoutes(app);
  await registerAnswerRoutes(app);
  await registerSliderRoutes(app);
  await registerBannerRoutes(app);
  await registerCreditPointRoutes(app);
  await registerComparisonRoutes(app);
  
  // Utilities
  await registerSearchRoutes(app);
  await registerUploadRoutes(app);
  await registerSettingRoutes(app);
  await registerRequestRoutes(app);
  await registerSeedRoutes(app);
  await registerHealthRoutes(app);
  
  // Payment
  await registerPaymentRoutes(app);
}
