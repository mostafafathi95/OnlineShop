import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth } from "./middleware";

export async function registerPaymentRoutes(app: Express): Promise<void> {
  app.get("/api/payment/initiate", requireAuth, async (req, res) => {
    try {
      const { orderId, gateway } = req.query;
      if (!orderId || !gateway) {
        return res.status(400).json({ error: "Missing parameters" });
      }
      
      const order = await storage.getOrder(parseInt(orderId as string));
      if (!order || order.userId !== (req as any).userId) {
        return res.status(404).json({ error: "Order not found" });
      }
      
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
}
