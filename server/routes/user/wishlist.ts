import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";

export async function registerUserWishlistRoutes(app: Express): Promise<void> {
  app.get("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const wishlist = await storage.getUserWishlist((req as any).userId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", requireAuth, async (req, res) => {
    try {
      const { productId } = req.body;
      const wishlist = await storage.addToWishlist((req as any).userId, productId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:productId", requireAuth, async (req, res) => {
    try {
      const wishlist = await storage.removeFromWishlist((req as any).userId, parseInt(req.params.productId));
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from wishlist" });
    }
  });
}
