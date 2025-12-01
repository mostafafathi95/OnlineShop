import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";

export async function registerAdminUserRoutes(app: Express): Promise<void> {
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers?.() || [];
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
}
