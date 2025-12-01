import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { upload, getImageUrl, deleteImage } from "./utils/upload";
import { 
  insertCategorySchema, insertProductSchema, insertAddressSchema, insertReviewSchema, insertCouponSchema,
  insertArticleSchema, insertNewsSchema, insertPageSchema, insertBrandSchema, insertProductAttributeSchema,
  insertShippingMethodSchema, insertCreditPointSchema, insertUserWalletSchema, insertUserRequestSchema,
  insertSettingSchema, insertQuestionSchema, insertAnswerSchema, insertSliderSchema, insertBannerSchema,
  insertCartItemSchema
} from "@shared/schema";
import type { Review } from "@shared/schema";
import { z } from "zod";
import { setupAllRoutes, requireAuth, requireAdmin } from "./routes/index";

// Re-export middleware for backward compatibility
export { requireAuth, requireAdmin };

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup all modular routes
  await setupAllRoutes(app);
  
  // Keep remaining routes that haven't been refactored yet
  // Articles Routes
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

  // News Routes
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

  // Pages Routes
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

  // Related Products
  app.get("/api/related-products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const related = await storage.getAllProducts({
        category: product.categoryId?.toString(),
        limit: 8,
      });
      
      res.json(related.filter(p => p.id !== product.id).slice(0, 4));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });

  // Seed data endpoint
  app.post("/api/seed", async (req, res) => {
    try {
      const adminUser = await storage.getUserByEmail("admin@example.com");
      if (!adminUser) {
        await storage.upsertUser({
          firstName: "مدیر",
          lastName: "سیستم",
          email: "admin@example.com",
          role: "admin"
        });
      }

      const testUser = await storage.getUserByEmail("test@example.com");
      if (!testUser) {
        await storage.upsertUser({
          firstName: "علی",
          lastName: "محمدی",
          email: "test@example.com",
          role: "user"
        });
      }

      res.json({ success: true, message: "Seed data processed successfully" });
    } catch (error) {
      res.json({ success: true, message: "Seed attempted" });
    }
  });

  return httpServer;
}
