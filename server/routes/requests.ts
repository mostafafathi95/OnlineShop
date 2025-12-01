import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth, requireAdmin } from "./middleware";
import { insertUserRequestSchema } from "@shared/schema";

export async function registerRequestRoutes(app: Express): Promise<void> {
  app.get("/api/requests", requireAuth, async (req, res) => {
    try {
      const requests = await storage.getUserRequests?.((req as any).userId) || [];
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch requests" });
    }
  });

  app.post("/api/requests", requireAuth, async (req, res) => {
    try {
      const data = insertUserRequestSchema.parse(req.body);
      const request = await storage.createUserRequest?.(data, (req as any).userId);
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/requests/:id", requireAdmin, async (req, res) => {
    try {
      const request = await storage.updateUserRequest?.(parseInt(req.params.id), req.body);
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: "Failed to update request" });
    }
  });

  app.delete("/api/requests/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteUserRequest?.(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete request" });
    }
  });
}
