import type { Express } from "express";
import { upload, getImageUrl, deleteImage } from "../utils/upload";
import { requireAdmin } from "./middleware";

export async function registerUploadRoutes(app: Express): Promise<void> {
  app.post("/api/upload/image", requireAdmin, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      
      const url = getImageUrl(req.file.filename);
      res.json({ url, filename: req.file.filename });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  });

  app.delete("/api/upload/:filename", requireAdmin, async (req, res) => {
    try {
      deleteImage(req.params.filename);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Delete failed" });
    }
  });
}
