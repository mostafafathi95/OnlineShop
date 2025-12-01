import type { Express } from "express";
import { storage } from "../storage";
import { insertCategorySchema } from "@shared/schema";
import { requireAdmin } from "./middleware";

export async function setupCategoryRoutes(app: Express) {
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories({ limit: 1000 });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(parseInt(req.params.id));
      if (!category) return res.status(404).json({ error: "Category not found" });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", requireAdmin, async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.patch("/api/categories/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(parseInt(req.params.id), data);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.delete("/api/categories/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });
}
