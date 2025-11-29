import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { logger } from "./utils/logger";
import { authManager } from "./utils/advanced-auth";
import path from "path";

const app = express();
const httpServer = createServer(app);

// Serve uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'dist', 'uploads')));

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
    userId?: number;
    sessionId?: string;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Legacy log function (for compatibility)
export function log(message: string, source = "express") {
  logger.info(source, message);
}

// Professional request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const userId = (req as any).userId;
      
      logger.api("HTTP", `${req.method} ${path}`, {
        statusCode: res.statusCode,
        duration,
        userId,
        ip,
        path,
      });
    }
  });

  next();
});

// Auth middleware with advanced tracking
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const decoded = authManager.verifyToken(token);
    if (decoded) {
      (req as any).userId = decoded.userId;
      (req as any).sessionId = decoded.sessionId;
    }
  }
  next();
});

// Periodic session cleanup
setInterval(() => {
  authManager.cleanupInactiveSessions(30);
}, 5 * 60 * 1000); // Every 5 minutes

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
