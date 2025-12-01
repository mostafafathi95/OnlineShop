import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";

export async function registerCartRoutes(app: Express): Promise<void> {
  app.get("/api/cart", requireAuth, async (req, res) => {
    try {
      const cart = await storage.getUserCart?.((req as any).userId) || [];
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", requireAuth, async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await storage.addToCart?.((req as any).userId, productId, quantity);
      res.json(cart);
    } catch (error) {
      res.status(400).json({ error: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      const { quantity } = req.body;
      const cart = await storage.updateCartItem?.((req as any).userId, parseInt(req.params.id), quantity);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  app.delete("/api/cart/:id", requireAuth, async (req, res) => {
    try {
      const cart = await storage.removeFromCart?.((req as any).userId, parseInt(req.params.id));
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  app.post("/api/checkout", requireAuth, async (req, res) => {
    try {
      const cart = await storage.getUserCart?.((req as any).userId);
      res.json({ checkout: true, items: cart });
    } catch (error) {
      res.status(500).json({ error: "Checkout failed" });
    }
  });
}
