import type { Express } from "express";
import { storage } from "../storage";
import { insertReviewSchema } from "@shared/schema";
import { requireAdmin } from "./middleware";

export async function setupReviewRoutes(app: Express) {
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getAllReviews({ limit: 1000 });
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.get("/api/reviews/:id", async (req, res) => {
    try {
      const review = await storage.getReviewById(parseInt(req.params.id));
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch review" });
    }
  });

  app.post("/api/reviews", requireAdmin, async (req, res) => {
    try {
      const data = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(data);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.patch("/api/reviews/:id", requireAdmin, async (req, res) => {
    try {
      const data = insertReviewSchema.partial().parse(req.body);
      const review = await storage.updateReview(parseInt(req.params.id), data);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: "Invalid review data" });
    }
  });

  app.delete("/api/reviews/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
}
