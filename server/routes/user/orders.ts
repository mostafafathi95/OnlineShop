import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";
import { generateOrderNumber } from "../utils";

export async function registerUserOrderRoutes(app: Express): Promise<void> {
  app.get("/api/orders", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getUserOrders((req as any).userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrderById(parseInt(req.params.id));
      if (!order || order.userId !== (req as any).userId) {
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
      if (!address || address.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Invalid address" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await storage.getProductById(item.productId);
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

      const order = await storage.createOrder((req as any).userId, {
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

  app.patch("/api/orders/:id/cancel", requireAuth, async (req, res) => {
    try {
      const order = await storage.getOrderById(parseInt(req.params.id));
      if (!order || order.userId !== (req as any).userId) {
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
}
