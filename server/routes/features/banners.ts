import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertBannerSchema } from "@shared/schema";

export async function registerBannerRoutes(app: Express): Promise<void> {
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getAllBanners?.() || [];
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.post("/api/banners", requireAdmin, async (req, res) => {
    try {
      const data = insertBannerSchema.parse(req.body);
      const banner = await storage.createBanner?.(data);
      res.json(banner);
    } catch (error) {
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  app.patch("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      const banner = await storage.updateBanner?.(parseInt(req.params.id), req.body);
      res.json(banner);
    } catch (error) {
      res.status(500).json({ error: "Failed to update banner" });
    }
  });

  app.delete("/api/banners/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteBanner?.(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete banner" });
    }
  });
}
