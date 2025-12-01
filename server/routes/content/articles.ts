import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertArticleSchema } from "@shared/schema";

export async function registerArticleRoutes(app: Express): Promise<void> {
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getAllArticles({ published: true, limit: 50 });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticleById(parseInt(req.params.id));
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", requireAdmin, async (req, res) => {
    try {
      const data = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(data);
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.patch("/api/articles/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(parseInt(req.params.id), data);
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.delete("/api/articles/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteArticle(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });
}
