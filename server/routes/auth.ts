/**
 * Authentication Routes
 * 
 * Endpoints:
 * - POST /api/login        - User login
 * - POST /api/register     - User registration
 * - POST /api/logout       - User logout
 * - GET /api/auth/user     - Get current user (protected)
 * - PATCH /api/auth/user   - Update user profile (protected)
 */

import type { Express } from "express";
import { storage } from "../storage";
import { requireAuth } from "./middleware";

export async function registerAuthRoutes(app: Express): Promise<void> {
  // POST /api/logout - User logout
  app.post("/api/logout", async (req, res) => {
    res.json({ success: true });
  });

  // POST /api/login - User login with email and password
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "ایمیل و رمز عبور ضروری است" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "ایمیل یا رمز عبور اشتباه است" });
      }
      
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });

  // POST /api/register - User registration
  app.post("/api/register", async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.status(400).json({ error: "تمام فیلدها ضروری هستند" });
      }
      
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "این ایمیل قبلاً ثبت شده است" });
      }
      
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.join(" ");
      
      const user = await storage.upsertUser({
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        role: "user"
      });
      
      const token = `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userFullName = `${user.firstName} ${user.lastName}`.trim();
      
      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, fullName: userFullName, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ error: "خطای سرور" });
    }
  });
  
  // GET /api/auth/user - Get current authenticated user
  app.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUser((req as any).userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // PATCH /api/auth/user - Update user profile
  app.patch("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;
      const user = await storage.updateUser((req as any).userId, {
        firstName,
        lastName,
        phone,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });
}
