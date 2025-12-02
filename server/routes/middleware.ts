/**
 * Authentication and Authorization Middleware
 * 
 * Contains all authentication-related middleware functions
 * Used across all protected routes in the application
 */

import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { validateToken } from "../utils/auth/token-validator";
import { storage } from "../storage";

// In-memory fallback (for dev - persistence via storage.ts in production)
const tokenStore = new Map<string, any>();

export function setTokenData(token: string, data: any) {
  tokenStore.set(token, data);
  // Also store in database for persistence
  if (storage && typeof storage.createSession === "function") {
    storage.createSession(token, data).catch((e: any) => {
      logger.debug("AUTH", "Session storage failed (non-critical)", { error: e.message });
    });
  }
}

async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      logger.debug("AUTH", "No auth token provided");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    // Check memory first
    let tokenData = tokenStore.get(token);
    
    // If not in memory, try database
    if (!tokenData && storage && typeof storage.getSession === "function") {
      try {
        const session = await storage.getSession(token);
        if (session) {
          tokenData = session;
          tokenStore.set(token, session); // Cache in memory
        }
      } catch (e) {
        logger.debug("AUTH", "Database session lookup failed", { error: String(e) });
      }
    }

    if (!tokenData) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Set user data in request
    (req as any).userId = tokenData.userId;
    (req as any).email = tokenData.email;
    (req as any).role = tokenData.role;
    (req as any).token = token;

    next();
  } catch (error) {
    logger.error("AUTH", "Auth middleware error", { error: String(error) });
    return res.status(401).json({ error: "Unauthorized" });
  }
}

async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      logger.debug("AUTH", "No auth token for admin route");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    // Check memory first
    let tokenData = tokenStore.get(token);
    
    // If not in memory, try database
    if (!tokenData && storage && typeof storage.getSession === "function") {
      try {
        const session = await storage.getSession(token);
        if (session) {
          tokenData = session;
          tokenStore.set(token, session); // Cache in memory
        }
      } catch (e) {
        logger.debug("AUTH", "Database session lookup failed", { error: String(e) });
      }
    }

    if (!tokenData) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Check admin role
    if (tokenData.role !== "admin") {
      logger.warn("AUTH", "Non-admin access attempt", { userId: tokenData.userId, role: tokenData.role });
      return res.status(403).json({ error: "Forbidden - Admin access required" });
    }

    // Set user data in request
    (req as any).userId = tokenData.userId;
    (req as any).email = tokenData.email;
    (req as any).role = tokenData.role;
    (req as any).token = token;

    next();
  } catch (error) {
    logger.error("AUTH", "Admin middleware error", { error: String(error) });
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export { requireAuth, requireAdmin };
