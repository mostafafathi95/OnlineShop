import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";
import { insertReviewSchema } from "@shared/schema";

export async function registerUserReviewRoutes(app: Express): Promise<void> {
  app.get("/api/reviews/product/:productId", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(parseInt(req.params.productId));
      res.json(reviews.filter(r => r.isApproved));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", requireAuth, async (req, res) => {
    try {
      const validated = insertReviewSchema.parse(req.body);
      const review = await storage.createReview((req as any).userId, validated);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.get("/api/user/reviews", requireAuth, async (req, res) => {
    try {
      const reviews = await storage.getUserReviews((req as any).userId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user reviews" });
    }
  });

  app.patch("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const review = await storage.getReviewById(parseInt(req.params.id));
      if (!review || review.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      const updated = await storage.updateReview(parseInt(req.params.id), req.body);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update review" });
    }
  });

  app.delete("/api/reviews/:id", requireAuth, async (req, res) => {
    try {
      const review = await storage.getReviewById(parseInt(req.params.id));
      if (!review || review.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
}
