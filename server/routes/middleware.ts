/**
 * Authentication and Authorization Middleware
 * 
 * Contains all authentication-related middleware functions
 * Used across all protected routes in the application
 */

import type { Request, Response, NextFunction } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!(req as any).role || (req as any).role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

export { requireAuth, requireAdmin };
