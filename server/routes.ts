import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCategorySchema, insertProductSchema, insertAddressSchema, insertReviewSchema, insertCouponSchema } from "@shared/schema";
import { z } from "zod";

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated?.() || !req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated?.() || !req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if ((req.user as any).role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

// Generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ==================== Public Routes ====================
  
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category, featured, sort, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        category: category as string,
        featured: featured === "true",
        sort: sort as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const images = await storage.getProductImages(product.id);
      const category = product.categoryId 
        ? await storage.getCategoryById(product.categoryId) 
        : null;
      
      res.json({ ...product, images, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // ==================== Auth Routes ====================
  
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "ایمیل و رمز عبور ضروری است" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "ایمیل یا رمز عبور اشتباه است" });
      }
      
      // Generate token
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const sessionId = `session_${Date.now()}`;
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });

  app.post("/api/register", async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ error: "تمام فیلدها ضروری هستند" });
      }
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "این ایمیل قبلاً ثبت شده است" });
      }
      
      const user = await storage.createUser({
        fullName,
        email,
        password,
        role: "customer"
      });
      
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });

  app.post("/api/logout", async (req, res) => {
    res.json({ success: true });
  });
  
  app.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser((req.user as any).id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.patch("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const user = await storage.updateUser((req.user as any).id, {
        firstName,
        lastName,
        phone,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // ==================== Address Routes ====================

  app.get("/api/addresses", requireAuth, async (req, res) => {
    try {
      const addresses = await storage.getUserAddresses((req.user as any).id);
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  app.post("/api/addresses", requireAuth, async (req, res) => {
    try {
      const validated = insertAddressSchema.parse(req.body);
      const address = await storage.createAddress((req.user as any).id, validated);
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: "Invalid address data" });
    }
  });

  app.patch("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.updateAddress(parseInt(req.params.id), req.body);
      if (address.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: "Failed to update address" });
    }
  });

  app.delete("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.getAddress(parseInt(req.params.id));
      if (!address || address.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await storage.deleteAddress(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete address" });
    }
  });

  // ==================== Orders Routes ====================

  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getUserOrders((req.user as any).id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrder(parseInt(req.params.id));
      if (!order || order.userId !== (req.user as any).id) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", requireAuth, async (req, res) => {
    try {
      const { addressId, paymentMethod, paymentGateway, notes, items, couponCode } = req.body;
      
      if (!addressId || !items || items.length === 0) {
        return res.status(400).json({ error: "Invalid order data" });
      }

      const address = await storage.getAddress(addressId);
      if (!address || address.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Invalid address" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `Not enough stock for ${product.name}. Available: ${product.stock}` });
        }
        totalAmount += Number(product.price) * item.quantity;
        orderItems.push({ productId: item.productId, quantity: item.quantity });
      }

      let discount = 0;
      if (couponCode) {
        const coupon = await storage.getCouponByCode(couponCode);
        if (coupon && coupon.isActive && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date())) {
          if (coupon.discountType === "percentage") {
            discount = Math.floor((totalAmount * Number(coupon.discountValue)) / 100);
          } else {
            discount = Number(coupon.discountValue);
          }
        }
      }

      totalAmount -= discount;
      
      const shippingCost = totalAmount > 500000 ? 0 : 50000;
      totalAmount += shippingCost;

      const order = await storage.createOrder((req.user as any).id, {
        addressId,
        paymentMethod,
        paymentGateway,
        notes,
        totalAmount,
        discount,
        shippingCost,
        items: orderItems,
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // ==================== Admin Routes ====================

  app.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
    try {
      const stats = {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getAllProducts({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.patch("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const product = await storage.updateProduct(parseInt(req.params.id), req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  app.get("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const validated = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validated);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.patch("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      const category = await storage.updateCategory(parseInt(req.params.id), req.body);
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to update category" });
    }
  });

  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders?.() || [];
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.patch("/api/admin/orders/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      if (!["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      const order = await storage.updateOrder(parseInt(req.params.id), { status });
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order" });
    }
  });

  app.patch("/api/orders/:id/cancel", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrder(parseInt(req.params.id));
      if (!order || order.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      if (order.status !== "pending" && order.status !== "processing") {
        return res.status(400).json({ error: "Cannot cancel order with status: " + order.status });
      }
      const updated = await storage.updateOrder(parseInt(req.params.id), { status: "cancelled" });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel order" });
    }
  });

  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers?.() || [];
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  // ==================== Reviews Routes ====================

  app.get("/api/reviews/product/:productId", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(parseInt(req.params.productId));
      res.json(reviews.filter(r => r.isApproved));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", requireAuth, async (req, res) => {
    try {
      const validated = insertReviewSchema.parse(req.body);
      const review = await storage.createReview((req.user as any).id, validated);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.get("/api/user/reviews", requireAuth, async (req, res) => {
    try {
      const reviews = await storage.getUserReviews((req.user as any).id);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user reviews" });
    }
  });

  app.patch("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const review = await storage.getReview(parseInt(req.params.id));
      if (!review || review.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      const updated = await storage.updateReview(parseInt(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const review = await storage.getReview(parseInt(req.params.id));
      if (!review || review.userId !== (req.user as any).id) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // ==================== Wishlist Routes ====================

  app.get("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const wishlist = await storage.getUserWishlist((req.user as any).id);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const { productId } = req.body;
      const wishlist = await storage.addToWishlist((req.user as any).id, productId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req, res) => {
    try {
      const wishlist = await storage.removeFromWishlist((req.user as any).id, parseInt(req.params.productId));
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  // ==================== Coupon Routes ====================

  app.get("/api/coupons/validate/:code", async (req, res) => {
    try {
      const coupon = await storage.getCouponByCode(req.params.code);
      if (!coupon || !coupon.isActive || (coupon.expiresAt && new Date(coupon.expiresAt) < new Date())) {
        return res.status(404).json({ error: "Invalid coupon" });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate coupon" });
    }
  });

  app.get("/api/admin/coupons", requireAdmin, async (req, res) => {
    try {
      const coupons = await storage.getAllCoupons?.() || [];
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupons" });
    }
  });

  app.post("/api/admin/coupons", requireAdmin, async (req, res) => {
    try {
      const validated = insertCouponSchema.parse(req.body);
      const coupon = await storage.createCoupon(validated);
      res.json(coupon);
    } catch (error) {
      res.status(400).json({ error: "Invalid coupon data" });
    }
  });

  app.patch("/api/admin/coupons/:id", requireAdmin, async (req, res) => {
    try {
      const coupon = await storage.updateCoupon(parseInt(req.params.id), req.body);
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to update coupon" });
    }
  });

  app.delete("/api/admin/coupons/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCoupon(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete coupon" });
    }
  });

  // ==================== Admin Review Management ====================
  
  app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
    try {
      const reviews = await storage.getAllReviews?.() || [];
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.patch("/api/admin/reviews/:id/approve", requireAdmin, async (req, res) => {
    try {
      const review = await storage.updateReview(parseInt(req.params.id), { isApproved: true });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to approve review" });
    }
  });

  app.delete("/api/admin/reviews/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  // ==================== Payment Routes ====================
  
  app.get("/api/payment/initiate", requireAuth, async (req, res) => {
    try {
      const { orderId, gateway } = req.query;
      if (!orderId || !gateway) {
        return res.status(400).json({ error: "Missing parameters" });
      }
      
      const order = await storage.getOrder(parseInt(orderId as string));
      if (!order || order.userId !== (req.user as any).id) {
        return res.status(404).json({ error: "Order not found" });
      }
      
      const callbackUrl = `${process.env.APP_URL || "http://localhost:5000"}/api/payment/callback`;
      
      res.redirect(`/api/payment/success?orderId=${orderId}&status=success`);
    } catch (error) {
      res.status(500).json({ error: "Payment initiation failed" });
    }
  });

  app.get("/api/payment/callback", async (req, res) => {
    try {
      const { orderId, status } = req.query;
      if (!orderId) {
        return res.status(400).json({ error: "Missing orderId" });
      }
      
      if (status === "success") {
        await storage.updateOrder(parseInt(orderId as string), {
          paymentStatus: "completed"
        });
        res.redirect(`/account/orders/${orderId}?payment=success`);
      } else {
        await storage.updateOrder(parseInt(orderId as string), {
          paymentStatus: "failed"
        });
        res.redirect(`/checkout?payment=failed&orderId=${orderId}`);
      }
    } catch (error) {
      res.status(500).json({ error: "Payment callback failed" });
    }
  });

  app.get("/api/payment/success", requireAuth, async (req, res) => {
    try {
      const { orderId } = req.query;
      if (orderId) {
        await storage.updateOrder(parseInt(orderId as string), {
          paymentStatus: "completed",
          status: "processing"
        });
      }
      res.redirect(`/account/orders/${orderId}`);
    } catch (error) {
      res.status(500).json({ error: "Failed" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getStats?.() || { totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0 };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Seed data endpoint
  app.post("/api/seed", async (req, res) => {
    try {
      await storage.createUser({
        fullName: "مدیر سیستم",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
      }).catch(() => {});

      await storage.createUser({
        fullName: "علی محمدی",
        email: "test@example.com",
        password: "test123",
        role: "customer"
      }).catch(() => {});

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Seed failed" });
    }
  });

  return httpServer;
}
