import type { Express } from "express";
import { storage } from "../storage";
import { insertCouponSchema } from "@shared/schema";
import { requireAdmin } from "./middleware";

export async function setupCouponRoutes(app: Express) {
  app.get("/api/coupons", async (req, res) => {
    try {
      const coupons = await storage.getAllCoupons({ limit: 1000 });
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupons" });
    }
  });

  app.get("/api/coupons/:id", async (req, res) => {
    try {
      const coupon = await storage.getCouponById(parseInt(req.params.id));
      if (!coupon) return res.status(404).json({ error: "Coupon not found" });
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch coupon" });
    }
  });

  app.post("/api/coupons", requireAdmin, async (req, res) => {
    try {
      const data = insertCouponSchema.parse(req.body);
      const coupon = await storage.createCoupon(data);
      res.json(coupon);
    } catch (error) {
      res.status(400).json({ error: "Invalid coupon data" });
    }
  });

  app.patch("/api/coupons/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertCouponSchema.partial().parse(req.body);
      const coupon = await storage.updateCoupon(parseInt(req.params.id), data);
      res.json(coupon);
    } catch (error) {
      res.status(400).json({ error: "Invalid coupon data" });
    }
  });

  app.delete("/api/coupons/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCoupon(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete coupon" });
    }
  });
}
