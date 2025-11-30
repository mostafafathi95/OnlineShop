import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload, getImageUrl, deleteImage } from "./utils/upload";
import { 
  insertCategorySchema, insertProductSchema, insertAddressSchema, insertReviewSchema, insertCouponSchema,
  insertArticleSchema, insertNewsSchema, insertPageSchema, insertBrandSchema, insertProductAttributeSchema,
  insertShippingMethodSchema, insertCreditPointSchema, insertUserWalletSchema, insertUserRequestSchema,
  insertSettingSchema, insertQuestionSchema, insertAnswerSchema, insertSliderSchema, insertBannerSchema
} from "@shared/schema";
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
  
  app.post("/api/logout", async (req, res) => {
    res.json({ success: true });
  });

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

  // ==================== Comparison Routes ====================
  
  app.get("/api/compare", async (req, res) => {
    try {
      const sessionId = req.sessionID || "anonymous";
      const items = await storage.getComparison(sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comparison" });
    }
  });

  app.post("/api/compare", async (req, res) => {
    try {
      const { product1Id, product2Id } = req.body;
      const sessionId = req.sessionID || "anonymous";
      const result = await storage.addToComparison(sessionId, product1Id, product2Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to comparison" });
    }
  });

  app.delete("/api/compare/:id", async (req, res) => {
    try {
      const sessionId = req.sessionID || "anonymous";
      await storage.removeFromComparison(sessionId, parseInt(req.params.id), 0);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from comparison" });
    }
  });

  // ==================== Related Products ====================
  
  app.get("/api/related-products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const related = await storage.getAllProducts({
        category: product.categoryId?.toString(),
        limit: 8,
      });
      
      res.json(related.filter(p => p.id !== product.id).slice(0, 4));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });

  // Seed data endpoint
  app.post("/api/seed", async (req, res) => {
    try {
      // Create users
      try {
        const adminUser = await storage.getUserByEmail("admin@example.com");
        if (!adminUser) {
          await storage.createUser({
            fullName: "مدیر سیستم",
            email: "admin@example.com",
            password: "admin123",
            role: "admin"
          });
        }
      } catch (e) {}

      try {
        const testUser = await storage.getUserByEmail("test@example.com");
        if (!testUser) {
          await storage.createUser({
            fullName: "علی محمدی",
            email: "test@example.com",
            password: "test123",
            role: "customer"
          });
        }
      } catch (e) {}

      // Create categories
      const categories = [
        { name: "الکترونیکی", nameEn: "Electronics", slug: "electronics", description: "محصولات الکترونیکی و تکنولوژی" },
        { name: "پوشاک", nameEn: "Fashion", slug: "fashion", description: "لباس و پوشاک برای تمام فصول" },
        { name: "خانه و آشپزخانه", nameEn: "Home", slug: "home", description: "محصولات خانگی و آشپزخانه" },
        { name: "کتاب", nameEn: "Books", slug: "books", description: "کتاب‌های الکترونیکی و فیزیکی" },
        { name: "ورزش", nameEn: "Sports", slug: "sports", description: "تجهیزات و لوازم ورزشی" }
      ];

      const createdCategories: any[] = [];
      for (const cat of categories) {
        try {
          const existing = await storage.getCategoryBySlug(cat.slug);
          if (!existing) {
            const created = await storage.createCategory(cat);
            createdCategories.push(created);
          } else {
            createdCategories.push(existing);
          }
        } catch (e) {}
      }

      // Create products
      if (createdCategories.length > 0) {
        const products = [
          {
            name: "لپ‌تاپ اچ‌پی",
            nameEn: "HP Laptop",
            slug: "hp-laptop",
            description: "لپ‌تاپ قدرتمند HP با پروسسور نسل جدید",
            shortDescription: "لپ‌تاپ با قابلیت‌های عالی",
            price: "25000000",
            comparePrice: "28000000",
            sku: "HP-001",
            stock: 15,
            categoryId: createdCategories[0]?.id || 1,
            image: "https://via.placeholder.com/500x500?text=HP+Laptop",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            isFeatured: true
          },
          {
            name: "تیشرت فشن",
            nameEn: "Fashion T-Shirt",
            slug: "fashion-tshirt",
            description: "تیشرت کتان راحت و شیک برای تمام سنین",
            shortDescription: "تیشرت مریلی و شیک",
            price: "350000",
            comparePrice: "500000",
            sku: "TSHIRT-001",
            stock: 50,
            categoryId: createdCategories[1]?.id || 2,
            image: "https://via.placeholder.com/500x500?text=T-Shirt",
            videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            isFeatured: true
          },
          {
            name: "قابلمه استیل",
            nameEn: "Stainless Steel Pot",
            slug: "steel-pot",
            description: "قابلمه با کیفیت بالا از جنس استیل ضدزنگ",
            shortDescription: "قابلمه استیل دوبلکس",
            price: "450000",
            comparePrice: "600000",
            sku: "POT-001",
            stock: 30,
            categoryId: createdCategories[2]?.id || 3,
            image: "https://via.placeholder.com/500x500?text=Steel+Pot",
            isFeatured: false
          },
          {
            name: "کتاب مثیر",
            nameEn: "Inspiring Book",
            slug: "inspiring-book",
            description: "کتاب تاثیرگذار درباره موفقیت و رشد شخصی",
            shortDescription: "کتاب الهام بخش برای زندگی بهتر",
            price: "75000",
            comparePrice: "95000",
            sku: "BOOK-001",
            stock: 100,
            categoryId: createdCategories[3]?.id || 4,
            image: "https://via.placeholder.com/500x500?text=Inspiring+Book",
            isFeatured: false
          },
          {
            name: "دمبل 10 کیلویی",
            nameEn: "10kg Dumbbell",
            slug: "dumbbell-10kg",
            description: "دمبل با وزن 10 کیلوگرم برای تمرینات قدرتی",
            shortDescription: "دمبل فولادی 10 کیلو",
            price: "1200000",
            comparePrice: "1500000",
            sku: "DUMBBELL-001",
            stock: 25,
            categoryId: createdCategories[4]?.id || 5,
            image: "https://via.placeholder.com/500x500?text=Dumbbell",
            isFeatured: false
          },
          {
            name: "هدفون بلوتوث",
            nameEn: "Bluetooth Headphone",
            slug: "bluetooth-headphone",
            description: "هدفون بی‌سیم با صدای بالا و باتری دوام",
            shortDescription: "هدفون بلوتوث مدرن",
            price: "2500000",
            comparePrice: "3200000",
            sku: "HEADPHONE-001",
            stock: 40,
            categoryId: createdCategories[0]?.id || 1,
            image: "https://via.placeholder.com/500x500?text=Headphones",
            videoUrl: "https://www.youtube.com/watch?v=3e7hIw5ZGlQ",
            isFeatured: true
          }
        ];

        for (const prod of products) {
          try {
            const existing = await storage.getProductBySlug(prod.slug);
            if (!existing) {
              await storage.createProduct(prod);
            }
          } catch (e) {}
        }
      }

      res.json({ success: true, message: "Seed data processed successfully" });
    } catch (error) {
      res.json({ success: true, message: "Seed attempted" });
    }
  });

  // ==================== Articles Routes ====================
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles({ published: true, limit: 50 });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticleById(parseInt(req.params.id));
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", requireAdmin, async (req, res) => {
    try {
      const data = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(data);
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.patch("/api/articles/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(parseInt(req.params.id), data);
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.delete("/api/articles/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteArticle(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // ==================== News Routes ====================
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews({ published: true, limit: 20 });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsById(parseInt(req.params.id));
      if (!newsItem) return res.status(404).json({ error: "News not found" });
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/news", requireAdmin, async (req, res) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(data);
      res.json(newsItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.patch("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertNewsSchema.partial().parse(req.body);
      const newsItem = await storage.updateNews(parseInt(req.params.id), data);
      res.json(newsItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.delete("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteNews(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news" });
    }
  });

  // ==================== Pages Routes ====================
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getAllPages({ published: true });
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page) return res.status(404).json({ error: "Page not found" });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", requireAdmin, async (req, res) => {
    try {
      const data = insertPageSchema.parse(req.body);
      const page = await storage.createPage(data);
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: "Invalid page data" });
    }
  });

  app.patch("/api/pages/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(parseInt(req.params.id), data);
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: "Invalid page data" });
    }
  });

  app.delete("/api/pages/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePage(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete page" });
    }
  });

  // ==================== Brands Routes ====================
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getAllBrands({ active: true });
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.post("/api/brands", requireAdmin, async (req, res) => {
    try {
      const data = insertBrandSchema.parse(req.body);
      const brand = await storage.createBrand(data);
      res.json(brand);
    } catch (error) {
      res.status(400).json({ error: "Invalid brand data" });
    }
  });

  app.patch("/api/brands/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertBrandSchema.partial().parse(req.body);
      const brand = await storage.updateBrand(parseInt(req.params.id), data);
      res.json(brand);
    } catch (error) {
      res.status(400).json({ error: "Invalid brand data" });
    }
  });

  app.delete("/api/brands/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBrand(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete brand" });
    }
  });

  // ==================== Product Attributes Routes ====================
  app.get("/api/products/:productId/attributes", async (req, res) => {
    try {
      const attrs = await storage.getProductAttributes(parseInt(req.params.productId));
      res.json(attrs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attributes" });
    }
  });

  app.post("/api/product-attributes", requireAdmin, async (req, res) => {
    try {
      const data = insertProductAttributeSchema.parse(req.body);
      const attr = await storage.createProductAttribute(data);
      res.json(attr);
    } catch (error) {
      res.status(400).json({ error: "Invalid attribute data" });
    }
  });

  app.patch("/api/product-attributes/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertProductAttributeSchema.partial().parse(req.body);
      const attr = await storage.updateProductAttribute(parseInt(req.params.id), data);
      res.json(attr);
    } catch (error) {
      res.status(400).json({ error: "Invalid attribute data" });
    }
  });

  app.delete("/api/product-attributes/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProductAttribute(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete attribute" });
    }
  });

  // ==================== Shipping Methods Routes ====================
  app.get("/api/shipping-methods", async (req, res) => {
    try {
      const methods = await storage.getAllShippingMethods({ active: true });
      res.json(methods);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shipping methods" });
    }
  });

  app.post("/api/shipping-methods", requireAdmin, async (req, res) => {
    try {
      const data = insertShippingMethodSchema.parse(req.body);
      const method = await storage.createShippingMethod(data);
      res.json(method);
    } catch (error) {
      res.status(400).json({ error: "Invalid shipping method data" });
    }
  });

  app.patch("/api/shipping-methods/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertShippingMethodSchema.partial().parse(req.body);
      const method = await storage.updateShippingMethod(parseInt(req.params.id), data);
      res.json(method);
    } catch (error) {
      res.status(400).json({ error: "Invalid shipping method data" });
    }
  });

  app.delete("/api/shipping-methods/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteShippingMethod(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete shipping method" });
    }
  });

  // ==================== Credit Points Routes ====================
  app.get("/api/credit-points", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const points = await storage.getUserCreditPoints(userId);
      const total = await storage.getTotalCreditPoints(userId);
      res.json({ points, total });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch credit points" });
    }
  });

  app.post("/api/credit-points", requireAdmin, async (req, res) => {
    try {
      const data = insertCreditPointSchema.parse(req.body);
      const point = await storage.addCreditPoints(data);
      res.json(point);
    } catch (error) {
      res.status(400).json({ error: "Invalid credit point data" });
    }
  });

  // ==================== User Wallets Routes ====================
  app.get("/api/wallet", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      let wallet = await storage.getUserWallet(userId);
      if (!wallet) {
        wallet = await storage.createUserWallet({ userId, balance: "0" });
      }
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet" });
    }
  });

  app.post("/api/wallet", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertUserWalletSchema.parse({ ...req.body, userId });
      const wallet = await storage.createUserWallet(data);
      res.json(wallet);
    } catch (error) {
      res.status(400).json({ error: "Invalid wallet data" });
    }
  });

  app.patch("/api/wallet/balance", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { balance } = req.body;
      const wallet = await storage.updateWalletBalance(userId, balance);
      res.json(wallet);
    } catch (error) {
      res.status(400).json({ error: "Failed to update wallet balance" });
    }
  });

  // ==================== User Requests Routes ====================
  app.get("/api/user-requests", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const requests = await storage.getUserRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user requests" });
    }
  });

  app.get("/api/user-requests/admin/all", requireAdmin, async (req, res) => {
    try {
      const requests = await storage.getAllUserRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user requests" });
    }
  });

  app.post("/api/user-requests", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertUserRequestSchema.parse({ ...req.body, userId });
      const request = await storage.createUserRequest(data);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/user-requests/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertUserRequestSchema.partial().parse(req.body);
      const request = await storage.updateUserRequest(parseInt(req.params.id), data);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/user-requests/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteUserRequest(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete request" });
    }
  });

  // ==================== Settings Routes ====================
  app.get("/api/settings", requireAdmin, async (req, res) => {
    try {
      const settings = await storage.getAllSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", requireAdmin, async (req, res) => {
    try {
      const data = insertSettingSchema.parse(req.body);
      const setting = await storage.createSetting(data);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Invalid setting data" });
    }
  });

  app.patch("/api/settings/:key", requireAdmin, async (req, res) => {
    try {
      const { value } = req.body;
      const setting = await storage.updateSetting(req.params.key, value);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Invalid setting data" });
    }
  });

  // ==================== Questions Routes ====================
  app.get("/api/products/:productId/questions", async (req, res) => {
    try {
      const questions = await storage.getProductQuestions(parseInt(req.params.productId));
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/questions", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertQuestionSchema.parse({ ...req.body, userId });
      const question = await storage.createQuestion(data);
      res.json(question);
    } catch (error) {
      res.status(400).json({ error: "Invalid question data" });
    }
  });

  app.patch("/api/questions/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertQuestionSchema.partial().parse(req.body);
      const question = await storage.updateQuestion(parseInt(req.params.id), data);
      res.json(question);
    } catch (error) {
      res.status(400).json({ error: "Invalid question data" });
    }
  });

  app.delete("/api/questions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteQuestion(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  });

  // ==================== Answers Routes ====================
  app.get("/api/questions/:questionId/answers", async (req, res) => {
    try {
      const answers = await storage.getQuestionAnswers(parseInt(req.params.questionId));
      res.json(answers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch answers" });
    }
  });

  app.post("/api/answers", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const data = insertAnswerSchema.parse({ ...req.body, userId });
      const answer = await storage.createAnswer(data);
      res.json(answer);
    } catch (error) {
      res.status(400).json({ error: "Invalid answer data" });
    }
  });

  app.patch("/api/answers/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertAnswerSchema.partial().parse(req.body);
      const answer = await storage.updateAnswer(parseInt(req.params.id), data);
      res.json(answer);
    } catch (error) {
      res.status(400).json({ error: "Invalid answer data" });
    }
  });

  app.delete("/api/answers/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteAnswer(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete answer" });
    }
  });

  // ==================== Sliders ====================
  // Public Routes
  app.get("/api/sliders", async (req, res) => {
    try {
      const sliders = await storage.getAllSliders();
      res.json(sliders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sliders" });
    }
  });

  app.get("/api/sliders/active", async (req, res) => {
    try {
      const sliders = await storage.getActiveSliders();
      res.json(sliders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active sliders" });
    }
  });

  // Admin Routes
  app.get("/api/admin/sliders", requireAdmin, async (req, res) => {
    try {
      const sliders = await storage.getAllSliders();
      res.json(sliders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sliders" });
    }
  });

  app.post("/api/admin/sliders", requireAdmin, async (req, res) => {
    try {
      const data = insertSliderSchema.parse(req.body);
      const slider = await storage.createSlider(data);
      res.json(slider);
    } catch (error) {
      res.status(400).json({ error: "Invalid slider data" });
    }
  });

  app.patch("/api/admin/sliders/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertSliderSchema.partial().parse(req.body);
      const slider = await storage.updateSlider(parseInt(req.params.id), data);
      res.json(slider);
    } catch (error) {
      res.status(400).json({ error: "Invalid slider data" });
    }
  });

  app.delete("/api/admin/sliders/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteSlider(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete slider" });
    }
  });

  // ==================== BANNERS ROUTES ====================
  
  // Public - Get all active banners
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getAllBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  // Admin - Get all banners
  app.get("/api/banners/admin", requireAdmin, async (req, res) => {
    try {
      const banners = await storage.getAllBannersAdmin();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  // Admin - Create banner
  app.post("/api/banners", requireAdmin, async (req, res) => {
    try {
      const data = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner(data);
      res.json(banner);
    } catch (error) {
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  // Admin - Update banner
  app.put("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertBannerSchema.partial().parse(req.body);
      const banner = await storage.updateBanner(parseInt(req.params.id), data);
      res.json(banner);
    } catch (error) {
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  // Admin - Delete banner
  app.delete("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      const banner = await storage.getBannerById(parseInt(req.params.id));
      if (banner?.imageUrl) {
        const filename = banner.imageUrl.split('/').pop();
        if (filename) deleteImage(filename);
      }
      await storage.deleteBanner(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete banner" });
    }
  });

  // Image Upload
  app.post("/api/upload", requireAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const imageUrl = getImageUrl(req.file.filename);
      res.json({ 
        success: true, 
        imageUrl,
        filename: req.file.filename
      });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // ==================== SEARCH ROUTES ====================

  // Advanced Search - Full-text search with fuzzy matching
  app.get("/api/search", async (req, res) => {
    try {
      const { q, category } = req.query;
      if (!q) {
        return res.status(400).json({ error: "Search query required" });
      }

      const searchQuery = (q as string).toLowerCase();
      const products = await storage.searchProducts(searchQuery);
      
      // Fuzzy match scoring
      const scored = products.map(p => {
        const nameMatch = p.name?.toLowerCase().includes(searchQuery) ? 100 : 
                         calculateSimilarity(searchQuery, p.name || '') * 50;
        const descMatch = (p.description || '').toLowerCase().includes(searchQuery) ? 50 :
                         calculateSimilarity(searchQuery, p.description || '') * 25;
        const score = nameMatch + descMatch;
        return { ...p, score };
      }).filter(p => p.score > 0).sort((a, b) => b.score - a.score);
      
      // Track search analytics
      if (req.user) {
        await storage.trackSearch({
          query: searchQuery,
          userId: (req.user as any).id,
          resultsCount: scored.length,
          isZeroResult: scored.length === 0,
          sessionId: req.sessionID,
        });
      }

      res.json({ 
        query: searchQuery, 
        resultsCount: scored.length, 
        results: scored.filter(p => p.isActive).map(({ score, ...p }) => p) 
      });
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Similarity calculation function (Levenshtein distance)
  function calculateSimilarity(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];

    for (let i = 0; i <= len2; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= len1; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len2; i++) {
      for (let j = 1; j <= len1; j++) {
        if (str2[i - 1] === str1[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const distance = matrix[len2][len1];
    const maxLen = Math.max(len1, len2);
    return Math.max(0, (maxLen - distance) / maxLen);
  }

  // Autocomplete Suggestions
  app.get("/api/search/autocomplete", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || q.length < 2) {
        return res.json({ suggestions: [] });
      }

      const query = (q as string).toLowerCase();
      const products = await storage.searchProducts(query);
      
      // Build suggestions from products + categories
      const categories = await storage.getAllCategories();
      
      const productSuggestions = products.slice(0, 5).map(p => ({
        type: "product",
        id: p.id,
        title: p.name,
        icon: "🛍️"
      }));

      const categorySuggestions = categories
        .filter(c => c.name?.toLowerCase().includes(query))
        .slice(0, 3)
        .map(c => ({
          type: "category",
          id: c.id,
          title: c.name,
          icon: "📁"
        }));

      const suggestions = [...categorySuggestions, ...productSuggestions];

      res.json({ suggestions: suggestions.slice(0, 8) });
    } catch (error) {
      res.status(500).json({ error: "Autocomplete failed" });
    }
  });

  // Dynamic Filters
  app.get("/api/search/filters", async (req, res) => {
    try {
      const { categoryId } = req.query;
      const filters = await storage.getProductFilters(
        categoryId ? parseInt(categoryId as string) : undefined
      );
      res.json(filters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch filters" });
    }
  });

  // Popular Searches
  app.get("/api/search/popular", async (req, res) => {
    try {
      const popular = await storage.getPopularSearches(10);
      res.json({ queries: popular });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular searches" });
    }
  });

  // Zero-result Searches (admin only)
  app.get("/api/search/zero-results", requireAdmin, async (req, res) => {
    try {
      const zeroResults = await storage.getZeroResultSearches(10);
      res.json({ queries: zeroResults });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch zero-result searches" });
    }
  });

  // ==================== ADMIN ROUTES ====================
  
  // Admin: Get all products
  app.get("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getAllProducts({ limit: 1000 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Admin: Create product
  app.post("/api/admin/products", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      const validated = insertProductSchema.parse({
        ...req.body,
        price: parseInt(req.body.price),
        comparePrice: req.body.comparePrice ? parseInt(req.body.comparePrice) : undefined,
        categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : undefined,
        stock: parseInt(req.body.stock) || 0,
        image: req.file ? getImageUrl(req.file.filename) : req.body.image,
      });
      const product = await storage.createProduct(validated);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create product" });
    }
  });

  // Admin: Update product
  app.put("/api/admin/products/:id", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertProductSchema.partial().parse({
        ...req.body,
        price: req.body.price ? parseInt(req.body.price) : undefined,
        comparePrice: req.body.comparePrice ? parseInt(req.body.comparePrice) : undefined,
        categoryId: req.body.categoryId ? parseInt(req.body.categoryId) : undefined,
        stock: req.body.stock ? parseInt(req.body.stock) : undefined,
        image: req.file ? getImageUrl(req.file.filename) : req.body.image,
      });
      const product = await storage.updateProduct(id, validated);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update product" });
    }
  });

  // Admin: Delete product
  app.delete("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Admin: Get all categories
  app.get("/api/admin/categories", requireAdmin, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Admin: Create category
  app.post("/api/admin/categories", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      const validated = insertCategorySchema.parse({
        ...req.body,
        image: req.file ? getImageUrl(req.file.filename) : req.body.image,
      });
      const category = await storage.createCategory(validated);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to create category" });
    }
  });

  // Admin: Update category
  app.put("/api/admin/categories/:id", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validated = insertCategorySchema.partial().parse({
        ...req.body,
        image: req.file ? getImageUrl(req.file.filename) : req.body.image,
      });
      const category = await storage.updateCategory(id, validated);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Failed to update category" });
    }
  });

  // Admin: Delete category
  app.delete("/api/admin/categories/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  return httpServer;
}
