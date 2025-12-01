import { db } from "../db";
import { eq, and } from "drizzle-orm";
import { wishlist } from "@shared/schema";

export class Comparisons {
  async getComparison(sessionId: string): Promise<any[]> {
    return db.select().from(wishlist).where(eq(wishlist.userId, sessionId)).limit(4);
  }

  async addToComparison(sessionId: string, product1Id: number, product2Id: number): Promise<any> {
    const [result] = await db.insert(wishlist).values({
      userId: sessionId,
      productId: product1Id,
    }).returning();
    return result;
  }

  async removeFromComparison(sessionId: string, product1Id: number, product2Id: number): Promise<void> {
    await db.delete(wishlist).where(and(eq(wishlist.userId, sessionId), eq(wishlist.productId, product1Id)));
  }
}
