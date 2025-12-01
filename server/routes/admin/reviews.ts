import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";

export async function registerAdminReviewRoutes(app: Express): Promise<void> {
  app.get("/api/admin/reviews", requireAdmin, async (req, res) => {
    try {
      const reviews = await storage.getAllReviews?.() || [];
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.patch("/api/admin/reviews/:id/approve", requireAdmin, async (req, res) => {
    try {
      const review = await storage.updateReview(parseInt(req.params.id), { isApproved: true });
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to approve review" });
    }
  });

  app.delete("/api/admin/reviews/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
}
