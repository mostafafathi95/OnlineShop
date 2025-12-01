import type { Express, Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: { count: number; reset: number };
}

const store: RateLimitStore = {};
const CLEANUP_INTERVAL = 60000; // 1 minute

// Cleanup old entries
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].reset < now) {
      delete store[key];
    }
  });
}, CLEANUP_INTERVAL);

export function rateLimitMiddleware(
  limit: number = 100,
  windowMs: number = 60000
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
               req.socket.remoteAddress ||
               "unknown";
    
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    if (!store[key] || store[key].reset < now) {
      store[key] = { count: 1, reset: now + windowMs };
      return next();
    }

    store[key].count++;

    if (store[key].count > limit) {
      res.set("Retry-After", Math.ceil((store[key].reset - now) / 1000).toString());
      return res.status(429).json({
        error: "Too many requests",
        retryAfter: store[key].reset - now,
      });
    }

    next();
  };
}

export function setupRateLimiting(app: Express): void {
  // Strict limits for sensitive endpoints
  app.post("/api/login", rateLimitMiddleware(5, 15 * 60 * 1000)); // 5 attempts per 15 mins
  app.post("/api/register", rateLimitMiddleware(3, 60 * 60 * 1000)); // 3 per hour
  app.post("/api/checkout", rateLimitMiddleware(10, 60 * 1000)); // 10 per minute
  
  // Standard rate limiting for other endpoints
  app.use(rateLimitMiddleware(100, 60 * 1000)); // 100 per minute globally
}
