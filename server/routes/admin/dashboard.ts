import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";

export async function registerAdminDashboardRoutes(app: Express): Promise<void> {
  app.get("/api/admin/dashboard", requireAdmin, async (req, res) => {
    try {
      const stats = {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getStats?.() || { totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0 };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
}
