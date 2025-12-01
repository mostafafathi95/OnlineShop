import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";
import { insertProductAttributeSchema } from "@shared/schema";

export async function registerAttributeRoutes(app: Express): Promise<void> {
  app.get("/api/product-attributes", async (req, res) => {
    try {
      const attributes = await storage.getAllProductAttributes?.() || [];
      res.json(attributes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch attributes" });
    }
  });

  app.post("/api/product-attributes", requireAdmin, async (req, res) => {
    try {
      const data = insertProductAttributeSchema.parse(req.body);
      const attribute = await storage.createProductAttribute(data);
      res.json(attribute);
    } catch (error) {
      res.status(400).json({ error: "Invalid attribute data" });
    }
  });

  app.patch("/api/product-attributes/:id", requireAdmin, async (req, res) => {
    try {
      const attribute = await storage.updateProductAttribute(parseInt(req.params.id), req.body);
      res.json(attribute);
    } catch (error) {
      res.status(500).json({ error: "Failed to update attribute" });
    }
  });

  app.delete("/api/product-attributes/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteProductAttribute(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete attribute" });
    }
  });
}
