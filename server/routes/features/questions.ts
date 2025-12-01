import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth, requireAdmin } from "../middleware";
import { insertQuestionSchema } from "@shared/schema";

export async function registerQuestionRoutes(app: Express): Promise<void> {
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions?.() || [];
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const question = await storage.getQuestionById?.(parseInt(req.params.id));
      if (!question) return res.status(404).json({ error: "Question not found" });
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch question" });
    }
  });

  app.post("/api/questions", requireAuth, async (req, res) => {
    try {
      const data = insertQuestionSchema.parse(req.body);
      const question = await storage.createQuestion?.(data);
      res.json(question);
    } catch (error) {
      res.status(400).json({ error: "Invalid question data" });
    }
  });

  app.patch("/api/questions/:id", requireAdmin, async (req, res) => {
    try {
      const question = await storage.updateQuestion?.(parseInt(req.params.id), req.body);
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: "Failed to update question" });
    }
  });

  app.delete("/api/questions/:id", requireAdmin, async (req, res) => {
    try {
      await storage.deleteQuestion?.(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete question" });
    }
  });
}
