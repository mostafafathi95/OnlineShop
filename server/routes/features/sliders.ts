import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertSliderSchema } from "@shared/schema";

export async function registerSliderRoutes(app: Express): Promise<void> {
  app.get("/api/sliders", async (req, res) => {
    try {
      const sliders = await storage.getAllSliders?.() || [];
      res.json(sliders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sliders" });
    }
  });

  app.post("/api/sliders", requireAdmin, async (req, res) => {
    try {
      const data = insertSliderSchema.parse(req.body);
      const slider = await storage.createSlider?.(data);
      res.json(slider);
    } catch (error) {
      res.status(400).json({ error: "Invalid slider data" });
    }
  });

  app.patch("/api/sliders/:id", requireAdmin, async (req, res) => {
    try {
      const slider = await storage.updateSlider?.(parseInt(req.params.id), req.body);
      res.json(slider);
    } catch (error) {
      res.status(500).json({ error: "Failed to update slider" });
    }
  });

  app.delete("/api/sliders/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteSlider?.(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete slider" });
    }
  });
}
