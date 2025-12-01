import type { Express } from "express";
import { storage } from "../storage";

export async function setupAdminInitRoutes(app: Express): Promise<void> {
  // Initialize admin user (one-time setup)
  app.post("/api/admin/init", async (req, res) => {
    try {
      const { email, password, fullName } = req.body;
      
      if (!email || !password || !fullName) {
        return res.status(400).json({ error: "Email, password, and fullName are required" });
      }

      // Create or update admin user
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ");
      
      const user = await storage.upsertUser({
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        role: "admin" // Set role to admin
      });

      res.json({
        success: true,
        message: "Admin user created/updated",
        user: { id: user.id, email: user.email, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to initialize admin" });
    }
  });
}
