import type { Express } from "express";
import { storage } from "../../storage";

export async function registerComparisonRoutes(app: Express): Promise<void> {
  app.get("/api/compare", async (req, res) => {
    try {
      const sessionId = req.sessionID || "anonymous";
      const items = await storage.getComparison(sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comparison" });
    }
  });

  app.post("/api/compare", async (req, res) => {
    try {
      const { product1Id, product2Id } = req.body;
      const sessionId = req.sessionID || "anonymous";
      const result = await storage.addToComparison(sessionId, product1Id, product2Id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to add to comparison" });
    }
  });

  app.delete("/api/compare/:id", async (req, res) => {
    try {
      const sessionId = req.sessionID || "anonymous";
      await storage.removeFromComparison(sessionId, parseInt(req.params.id), 0);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove from comparison" });
    }
  });
}
