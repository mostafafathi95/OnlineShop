import type { Express } from "express";
import { requireAdmin } from "./middleware";
import { generateComprehensiveSeedData } from "../utils/seed-data";

export async function registerSeedRoutes(app: Express): Promise<void> {
  app.post("/api/seed/comprehensive", requireAdmin, async (req, res) => {
    try {
      const result = await generateComprehensiveSeedData();
      res.json({
        success: true,
        message: "Comprehensive seed data created successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Seed data creation failed",
        details: (error as any).message
      });
    }
  });
}
