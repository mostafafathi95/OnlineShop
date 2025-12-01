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
  
  // Admin routes
  await registerAdminDashboardRoutes(app);
  await registerAdminProductRoutes(app);
  await registerAdminCategoryRoutes(app);
  await registerAdminOrderRoutes(app);
  await registerAdminUserRoutes(app);
  await registerAdminCouponRoutes(app);
  await registerAdminReviewRoutes(app);
  
  // Features
  await registerComparisonRoutes(app);
  
  // Payment
  await registerPaymentRoutes(app);
}
