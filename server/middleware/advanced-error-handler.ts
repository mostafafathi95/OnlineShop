import type { Express, Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function setupErrorHandling(app: Express): void {
  // Request validation middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Sanitize input
    if (req.body && typeof req.body === "object") {
      Object.keys(req.body).forEach((key) => {
        const value = req.body[key];
        if (typeof value === "string") {
          req.body[key] = value.trim().slice(0, 5000); // Prevent injection/overflow
        }
      });
    }

    res.on("finish", () => {
      const statusCode = res.statusCode;
      const level = statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
      logger.log({
        level,
        endpoint: req.path,
        method: req.method,
        status: statusCode,
        duration: Date.now() - (req.startTime as number || Date.now()),
      });
    });

    next();
  });

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const errorId = Math.random().toString(36).substr(2, 9);
    
    logger.log({
      level: "error",
      errorId,
      endpoint: req.path,
      message: err.message,
      stack: err.stack,
    });

    if (res.headersSent) {
      return next(err);
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: err.message || "Internal Server Error",
      errorId,
      timestamp: new Date().toISOString(),
    });
  });
}

export function setupRequestLogging(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    (req as any).startTime = Date.now();
    next();
  });
}
