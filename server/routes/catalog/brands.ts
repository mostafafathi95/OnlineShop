import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertBrandSchema } from "@shared/schema";

export async function registerBrandRoutes(app: Express): Promise<void> {
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getAllBrands?.() || [];
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
      const brand = await storage.updateBrand(parseInt(req.params.id), req.body);
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to update brand" });
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
}
