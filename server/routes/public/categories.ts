/**
 * Public Category Routes
 * 
 * Endpoints:
 * - GET /api/categories - Get all active categories
 * 
 * No authentication required
 */

import type { Express } from "express";
import { storage } from "../../storage";

export async function registerPublicCategoryRoutes(app: Express): Promise<void> {
  // GET /api/categories - List all active categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories.filter(c => c.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
}
