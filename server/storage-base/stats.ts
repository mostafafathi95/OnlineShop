import { db } from "../db";
import { eq, sql } from "drizzle-orm";
import { products, orders, users } from "@shared/schema";

export class Stats {
  async getStats(): Promise<{
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
  }> {
    const [productCount] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [orderCount] = await db.select({ count: sql<number>`count(*)` }).from(orders);
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [revenue] = await db
      .select({ total: sql<number>`coalesce(sum(${orders.total}::numeric), 0)` })
      .from(orders)
      .where(eq(orders.status, "delivered"));

    return {
      totalProducts: Number(productCount.count) || 0,
      totalOrders: Number(orderCount.count) || 0,
      totalUsers: Number(userCount.count) || 0,
      totalRevenue: Number(revenue.total) || 0,
    };
  }
}
