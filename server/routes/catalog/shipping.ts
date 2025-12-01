import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertShippingMethodSchema } from "@shared/schema";

export async function registerShippingRoutes(app: Express): Promise<void> {
  app.get("/api/shipping-methods", async (req, res) => {
    try {
      const methods = await storage.getAllShippingMethods?.() || [];
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
      const method = await storage.updateShippingMethod(parseInt(req.params.id), req.body);
      res.json(method);
    } catch (error) {
      res.status(500).json({ error: "Failed to update shipping method" });
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
}
