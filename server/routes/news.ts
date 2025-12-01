import type { Express } from "express";
import { storage } from "../storage";
import { insertNewsSchema } from "@shared/schema";
import { requireAdmin } from "./index";

export async function setupNewsRoutes(app: Express) {
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getAllNews({ published: true, limit: 20 });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsById(parseInt(req.params.id));
      if (!newsItem) return res.status(404).json({ error: "News not found" });
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/news", requireAdmin, async (req, res) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(data);
      res.json(newsItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.patch("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertNewsSchema.partial().parse(req.body);
      const newsItem = await storage.updateNews(parseInt(req.params.id), data);
      res.json(newsItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  app.delete("/api/news/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteNews(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news" });
    }
  });
}
