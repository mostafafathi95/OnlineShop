import type { Express } from "express";
import { storage } from "../../storage";
import { requireAdmin } from "../middleware";

export async function registerExportRoutes(app: Express): Promise<void> {
  // Export products as CSV
  app.get("/api/admin/export/products", requireAdmin, async (req, res) => {
    try {
      const products = await storage.getAllProducts({});
      
      const csv = [
        ["شناسه", "نام", "قیمت", "موجودی", "دسته‌بندی", "فعال"].join(","),
        ...(products as any[]).map((p: any) =>
          [p.id, p.name, p.price, p.stock, p.categoryId, p.isActive].join(",")
        )
      ].join("\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="products-${Date.now()}.csv"`
      );
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Export failed" });
    }
  });

  // Export orders as JSON
  app.get("/api/admin/export/orders", requireAdmin, async (req, res) => {
    try {
      const orders = await storage.getAllOrders?.();
      
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="orders-${Date.now()}.json"`
      );
      res.json({
        exportDate: new Date().toISOString(),
        totalOrders: (orders as any)?.length || 0,
        orders: orders || []
      });
    } catch (error) {
      res.status(500).json({ error: "Export failed" });
    }
  });

  // Export users as CSV
  app.get("/api/admin/export/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      
      const csv = [
        ["شناسه", "نام", "ایمیل", "نقش"].join(","),
        ...(users as any[]).map((u: any) =>
          [u.id, `${u.firstName} ${u.lastName}`, u.email, u.role].join(",")
        )
      ].join("\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="users-${Date.now()}.csv"`
      );
      res.send(csv);
    } catch (error) {
      res.status(500).json({ error: "Export failed" });
    }
  });

  // Export analytics report
  app.get("/api/admin/export/analytics", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getStats?.();
      
      const report = {
        exportDate: new Date().toISOString(),
        stats,
        metrics: {
          averageOrderValue: stats?.totalOrders ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0,
          productsPerUser: stats?.totalUsers ? (stats.totalProducts / Math.max(stats.totalUsers, 1)).toFixed(2) : 0
        }
      };

      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="analytics-${Date.now()}.json"`
      );
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: "Export failed" });
    }
  });
}
