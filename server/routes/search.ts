import type { Express } from "express";
import { storage } from "../storage";

export async function registerSearchRoutes(app: Express): Promise<void> {
  app.get("/api/search", async (req, res) => {
    try {
      const { q, limit = 20 } = req.query;
      if (!q) {
        return res.status(400).json({ error: "Search query required" });
      }
      
      const products = await storage.getAllProducts({
        search: q as string,
        limit: parseInt(limit as string)
      });
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.get("/api/search/advanced", async (req, res) => {
    try {
      const { q, category, minPrice, maxPrice, limit = 50 } = req.query;
      
      const products = await storage.getAllProducts({
        search: q as string,
        category: category as string,
        limit: parseInt(limit as string)
      });
      
      const filtered = products.filter(p => {
        const price = Number(p.price);
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        return true;
      });
      
      res.json(filtered);
    } catch (error) {
      res.status(500).json({ error: "Advanced search failed" });
    }
  });
}
