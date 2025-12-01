import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";
import { insertUserWalletSchema } from "@shared/schema";

export async function registerWalletRoutes(app: Express): Promise<void> {
  app.get("/api/wallet", requireAuth, async (req, res) => {
    try {
      const wallet = await storage.getUserWallet?.((req as any).userId);
      res.json(wallet || { balance: 0 });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet" });
    }
  });

  app.post("/api/wallet/add", requireAuth, async (req, res) => {
    try {
      const { amount } = req.body;
      const wallet = await storage.addWalletBalance?.((req as any).userId, amount);
      res.json(wallet);
    } catch (error) {
      res.status(400).json({ error: "Failed to add balance" });
    }
  });

  app.get("/api/wallet/history", requireAuth, async (req, res) => {
    try {
      const history = await storage.getWalletHistory?.((req as any).userId) || [];
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet history" });
    }
  });
}
