import type { Express } from "express";
import { storage } from "../storage";
import { requireAdmin } from "./middleware";
import { insertSettingSchema } from "@shared/schema";

export async function registerSettingRoutes(app: Express): Promise<void> {
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getAllSettings?.() || [];
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.post("/api/settings", requireAdmin, async (req, res) => {
    try {
      const data = insertSettingSchema.parse(req.body);
      const setting = await storage.createSetting?.(data);
      res.json(setting);
    } catch (error) {
      res.status(400).json({ error: "Invalid setting data" });
    }
  });

  app.patch("/api/settings/:key", requireAdmin, async (req, res) => {
    try {
      const setting = await storage.updateSetting?.(req.params.key, req.body);
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });
}
