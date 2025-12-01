/**
 * Public Product Routes
 * 
 * Endpoints:
 * - GET /api/products         - Get all products with filters
 * - GET /api/products/:slug   - Get single product by slug
 * 
 * No authentication required
 */

import type { Express } from "express";
import { storage } from "../../storage";

export async function registerPublicProductRoutes(app: Express): Promise<void> {
  // GET /api/products - List all active products
  app.get("/api/products", async (req, res) => {
    try {
      const { search, category, featured, sort, limit } = req.query;
      const products = await storage.getAllProducts({
        search: search as string,
        category: category as string,
        featured: featured === "true",
        sort: sort as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(products.filter(p => p.isActive));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:slug - Get product by slug
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const images = await storage.getProductImages(product.id);
      const category = product.categoryId 
        ? await storage.getCategoryById(product.categoryId) 
        : null;
      
      res.json({ ...product, images, category });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
}
