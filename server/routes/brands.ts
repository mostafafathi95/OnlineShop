import type { Express } from "express";
import { storage } from "../storage";
import { insertBrandSchema } from "@shared/schema";
import { requireAdmin } from "./middleware";

export async function setupBrandRoutes(app: Express) {
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getAllBrands({ limit: 1000 });
      res.json(brands);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.get("/api/brands/:id", async (req, res) => {
    try {
      const brand = await storage.getBrandById(parseInt(req.params.id));
      if (!brand) return res.status(404).json({ error: "Brand not found" });
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brand" });
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
}
