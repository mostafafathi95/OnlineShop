import type { Express } from "express";
import { storage } from "../storage";
import { insertProductSchema } from "@shared/schema";
import { requireAdmin } from "./middleware";

export async function setupProductRoutes(app: Express) {
  // Get all products (public)
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts({
        limit: 1000,
        category: req.query.category as string,
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product (public)
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get related products (public)
  app.get("/api/related-products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) return res.status(404).json({ error: "Product not found" });
      const related = await storage.getAllProducts({
        category: product.categoryId?.toString(),
        limit: 8,
      });
      res.json(related.filter((p) => p.id !== product.id).slice(0, 4));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch related products" });
    }
  });

  // Create product (admin)
  app.post("/api/products", requireAdmin, async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  // Update product (admin)
  app.patch("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(parseInt(req.params.id), data);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  // Delete product (admin)
  app.delete("/api/products/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProduct(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
}
