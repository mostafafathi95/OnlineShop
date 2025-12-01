import type { Express } from "express";
import { storage } from "../storage";

export async function setupProductRoutes(app: Express) {
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

      res.json(related.filter((p) => p.id !== product.id).slice(0, 4));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });
}
