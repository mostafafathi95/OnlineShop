import type { Express } from "express";
import { requireAdmin } from "../middleware";
import { storage } from "../../storage";

export async function registerHealthRoutes(app: Express): Promise<void> {
  app.get("/api/health", async (req, res) => {
    try {
      const stats = await storage.getStats?.();
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        stats
      });
    } catch (error) {
      res.status(500).json({ status: "error" });
    }
  });

  app.get("/api/admin/health", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getStats?.();
      const users = await storage.getAllUsers();
      const products = await storage.getAllProducts({});
      
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: {
          users: users.length,
          products: (products as any).length
        },
        stats
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: (error as any).message
      });
    }
  });
}
