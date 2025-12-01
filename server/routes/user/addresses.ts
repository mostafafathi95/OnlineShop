import type { Express } from "express";
import { storage } from "../../storage";
import { requireAuth } from "../middleware";
import { insertAddressSchema } from "@shared/schema";

export async function registerUserAddressRoutes(app: Express): Promise<void> {
  app.get("/api/addresses", requireAuth, async (req, res) => {
    try {
      const addresses = await storage.getUserAddresses((req as any).userId);
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  app.post("/api/addresses", requireAuth, async (req, res) => {
    try {
      const validated = insertAddressSchema.parse(req.body);
      const address = await storage.createAddress((req as any).userId, validated);
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: "Invalid address data" });
    }
  });

  app.patch("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.updateAddress(parseInt(req.params.id), req.body);
      if (address.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: "Failed to update address" });
    }
  });

  app.delete("/api/addresses/:id", requireAuth, async (req, res) => {
    try {
      const address = await storage.getAddress(parseInt(req.params.id));
      if (!address || address.userId !== (req as any).userId) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await storage.deleteAddress(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete address" });
    }
  });
}
