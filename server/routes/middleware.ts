/**
 * Authentication and Authorization Middleware
 * 
 * Contains all authentication-related middleware functions
 * Used across all protected routes in the application
 */

import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { validateToken } from "../utils/auth/token-validator";

// Token storage (should be replaced with session store in production)
const tokenStore = new Map<string, any>();

export function setTokenData(token: string, data: any) {
  tokenStore.set(token, data);
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      logger.debug("AUTH", "No auth token provided");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const tokenData = tokenStore.get(token);
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

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      logger.debug("AUTH", "No auth token for admin route");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const tokenData = tokenStore.get(token);
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
