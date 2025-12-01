import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { setupAllRoutes, requireAuth, requireAdmin } from "./routes/index";
import { setupArticleRoutes } from "./routes/articles";
import { setupNewsRoutes } from "./routes/news";
import { setupPageRoutes } from "./routes/pages";
import { setupProductRoutes } from "./routes/products";

export { requireAuth, requireAdmin };

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup all core modular routes
  await setupAllRoutes(app);

  // Setup additional content routes
  await setupArticleRoutes(app);
  await setupNewsRoutes(app);
  await setupPageRoutes(app);
  await setupProductRoutes(app);

  return httpServer;
}
