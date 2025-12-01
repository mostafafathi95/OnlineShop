import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth, requireAdmin } from "../middleware";
import { insertAnswerSchema } from "@shared/schema";

export async function registerAnswerRoutes(app: Express): Promise<void> {
  app.get("/api/answers", async (req, res) => {
    try {
      const answers = await storage.getAllAnswers?.() || [];
      res.json(answers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch answers" });
    }
  });

  app.post("/api/answers", requireAuth, async (req, res) => {
    try {
      const data = insertAnswerSchema.parse(req.body);
      const answer = await storage.createAnswer?.(data);
      res.json(answer);
    } catch (error) {
      res.status(400).json({ error: "Invalid answer data" });
    }
  });

  app.patch("/api/answers/:id", requireAuth, async (req, res) => {
    try {
      const answer = await storage.updateAnswer?.(parseInt(req.params.id), req.body);
      res.json(answer);
    } catch (error) {
      res.status(500).json({ error: "Failed to update answer" });
    }
  });

  app.delete("/api/answers/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteAnswer?.(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete answer" });
    }
  });
}
