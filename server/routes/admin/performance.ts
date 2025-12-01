import type { Express } from "express";
import { requireAdmin } from "../middleware";

interface PerformanceMetric {
  endpoint: string;
  method: string;
  avgTime: number;
  count: number;
  lastHit: Date;
}

const metrics = new Map<string, PerformanceMetric>();

export function trackPerformance(
  endpoint: string,
  method: string,
  duration: number
) {
  const key = `${method} ${endpoint}`;
  const existing = metrics.get(key);

  if (existing) {
    existing.avgTime = (existing.avgTime + duration) / 2;
    existing.count++;
    existing.lastHit = new Date();
  } else {
    metrics.set(key, {
      endpoint,
      method,
      avgTime: duration,
      count: 1,
      lastHit: new Date()
    });
  }
}

export async function registerPerformanceRoutes(app: Express): Promise<void> {
  app.get("/api/admin/performance", requireAdmin, (req, res) => {
    const sorted = Array.from(metrics.values())
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, 20);

    res.json({
      metrics: sorted,
      total: metrics.size,
      timestamp: new Date().toISOString()
    });
  });

  app.delete("/api/admin/performance", requireAdmin, (req, res) => {
    metrics.clear();
    res.json({ success: true, message: "Performance metrics cleared" });
  });
}
