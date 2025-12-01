import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth, requireAdmin } from "../middleware";
import { insertCreditPointSchema } from "@shared/schema";

export async function registerCreditPointRoutes(app: Express): Promise<void> {
  app.get("/api/credit-points", requireAuth, async (req, res) => {
    try {
      const points = await storage.getUserCreditPoints?.((req as any).userId) || 0;
      res.json({ creditPoints: points });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch credit points" });
    }
  });

  app.post("/api/credit-points", requireAdmin, async (req, res) => {
    try {
      const data = insertCreditPointSchema.parse(req.body);
      const result = await storage.createCreditPoint?.(data);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid credit point data" });
    }
  });
}
