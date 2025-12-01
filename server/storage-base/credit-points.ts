import { db } from "../db";
import { eq, desc, sql } from "drizzle-orm";
import { creditPoints } from "@shared/schema";
import type { CreditPoint, InsertCreditPoint } from "@shared/schema";

export class CreditPoints {
  async getUserCreditPoints(userId: string): Promise<CreditPoint[]> {
    return db.select().from(creditPoints).where(eq(creditPoints.userId, userId)).orderBy(desc(creditPoints.createdAt));
  }

  async getTotalCreditPoints(userId: string): Promise<number> {
    const [result] = await db.select({ total: sql<number>`coalesce(sum(${creditPoints.points}::numeric), 0)` }).from(creditPoints).where(eq(creditPoints.userId, userId));
    return Number(result?.total) || 0;
  }

  async addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint> {
    const [newPoint] = await db.insert(creditPoints).values(creditPoint).returning();
    return newPoint;
  }

  async removeCreditPoints(id: number): Promise<void> {
    await db.delete(creditPoints).where(eq(creditPoints.id, id));
  }
}
