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

  // ==================== Addresses Routes ====================
  
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
      const data = insertAddressSchema.parse({
        ...req.body,
        userId: (req.user as any).id,
      });
      const address = await storage.createAddress(data);
      res.json(address);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create address" });
    }
  });

  app.patch("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const address = await storage.getAddressById(id);
      
      if (!address || address.userId !== (req.user as any).id) {
        return res.status(404).json({ error: "Address not found" });
      }
      
      const updated = await storage.updateAddress(id, req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update address" });
    }
  });

  app.patch("/api/addresses/:id/default", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.setDefaultAddress((req.user as any).id, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to set default address" });
    }
  });

  app.delete("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const address = await storage.getAddressById(id);
      
      if (!address || address.userId !== (req.user as any).id) {
        return res.status(404).json({ error: "Address not found" });
      }
      
      await storage.deleteAddress(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete address" });
    }
  });

  // ==================== Cart Routes ====================
  
  app.get("/api/cart", requireAuth, async (req, res) => {
    try {
      const cart = await storage.getUserCart((req.user as any).id);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", requireAuth, async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const item = await storage.addToCart({
        userId: (req.user as any).id,
        productId,
        quantity: quantity || 1,
      });
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartItem(parseInt(req.params.id), quantity);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      await storage.removeFromCart(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", requireAuth, async (req, res) => {
    try {
      await storage.clearCart((req.user as any).id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // ==================== Orders Routes ====================
  
  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const { limit } = req.query;
      const orders = await storage.getUserOrders((req.user as any).id);
      if (limit) {
        res.json(orders.slice(0, parseInt(limit as string)));
      } else {
        res.json(orders);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrderWithItems(parseInt(req.params.id));
      
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
      const { addressId, paymentMethod, notes, items } = req.body;
      const userId = (req.user as any).id;
      
      // Get address
      const address = await storage.getAddressById(addressId);
      if (!address) {
        return res.status(400).json({ error: "Invalid address" });
      }

      // Calculate totals
      let subtotal = 0;
      const orderItems = [];
      
      for (const item of items) {
        const product = await storage.getProductById(item.productId);
        if (!product) {
          return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        
        const itemTotal = Number(product.price) * item.quantity;
        subtotal += itemTotal;
        
        orderItems.push({
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal.toString(),
        });
      }

      const shippingCost = subtotal > 500000 ? 0 : 50000;
      const total = subtotal + shippingCost;

      const order = await storage.createOrder(
        {
          orderNumber: generateOrderNumber(),
          userId,
          status: "pending",
          subtotal: subtotal.toString(),
          shippingCost: shippingCost.toString(),
          discount: "0",
          total: total.toString(),
          addressId,
          shippingAddress: address,
          notes,
        },
        orderItems
      );

      // Clear cart after order
      await storage.clearCart(userId);

      res.json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // ==================== Admin Routes ====================
  
  // Admin Stats
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Admin Categories
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
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create category" });
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

  // Admin Products
  app.get("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const { search, lowStock, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        lowStock: lowStock === "true",
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/admin/products/:id", requireAdmin, async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/admin/products", requireAdmin, async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create product" });
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

  // Admin Orders
  app.get("/api/admin/orders", requireAdmin, async (req, res) => {
    try {
      const { status, search, limit } = req.query;
      const orders = await storage.getAllOrders({
        status: status as string,
        search: search as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/admin/orders/:id", requireAdmin, async (req, res) => {
    try {
      const order = await storage.getOrderWithItems(parseInt(req.params.id));
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.patch("/api/admin/orders/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(parseInt(req.params.id), status);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });

  // Admin Users
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.patch("/api/admin/users/:id/role", requireAdmin, async (req, res) => {
    try {
      const { role } = req.body;
      const user = await storage.updateUser(req.params.id, { role });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // ==================== Reviews Routes ====================
  
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(parseInt(req.params.productId));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", requireAuth, async (req, res) => {
    try {
      const data = insertReviewSchema.parse({
        ...req.body,
        userId: (req.user as any).id,
      });
      const review = await storage.createReview(data);
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  app.patch("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const review = await storage.updateReview(parseInt(req.params.id), req.body);
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });

  app.post("/api/reviews/:id/helpful", async (req, res) => {
    try {
      const { helpful, unhelpful } = req.body;
      await storage.updateReviewHelpfulness(parseInt(req.params.id), helpful, unhelpful);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update helpfulness" });
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
      const item = await storage.addToWishlist((req.user as any).id, productId);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req, res) => {
    try {
      await storage.removeFromWishlist((req.user as any).id, parseInt(req.params.productId));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });

  // ==================== Coupons Routes ====================
  
  app.get("/api/coupons/validate/:code", async (req, res) => {
    try {
      const coupon = await storage.getCouponByCode(req.params.code);
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found or expired" });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate coupon" });
    }
  });

  app.get("/api/admin/coupons", requireAdmin, async (req, res) => {
    try {
      const coupons = await storage.getAllCoupons({ active: true });
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupons" });
    }
  });

  app.post("/api/admin/coupons", requireAdmin, async (req, res) => {
    try {
      const data = insertCouponSchema.parse(req.body);
      const coupon = await storage.createCoupon(data);
      res.json(coupon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create coupon" });
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

  return httpServer;
}

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
      
      // Mock payment initiation - redirect to payment gateway
      const paymentData = {
        merchant_id: "MOCK_MERCHANT",
        amount: Math.round(order.totalAmount * 100),
        description: `سفارش #${order.id}`,
        callback_url: callbackUrl,
        metadata: { orderId: order.id.toString() }
      };
      
      // In production, integrate with actual gateway APIs
      // For now, create mock payment record and redirect to success
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
      res.redirect(`/account/orders/${orderId}`);
    } catch (error) {
      res.status(500).json({ error: "Failed" });
    }
  });

  return httpServer;
}
