import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertPageSchema } from "@shared/schema";

export async function registerPageRoutes(app: Express): Promise<void> {
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getAllPages({ published: true });
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page) return res.status(404).json({ error: "Page not found" });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", requireAdmin, async (req, res) => {
    try {
      const data = insertPageSchema.parse(req.body);
      const page = await storage.createPage(data);
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: "Invalid page data" });
    }
  });

  app.patch("/api/pages/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertPageSchema.partial().parse(req.body);
      const page = await storage.updatePage(parseInt(req.params.id), data);
      res.json(page);
    } catch (error) {
      res.status(400).json({ error: "Invalid page data" });
    }
  });

  app.delete("/api/pages/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deletePage(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete page" });
    }
  });
}
