import { db } from "../db";
import { eq, desc, and } from "drizzle-orm";
import { reviews } from "@shared/schema";
import type { Review, InsertReview } from "@shared/schema";

export class Reviews {
  async getProductReviews(productId: number): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
      .orderBy(desc(reviews.createdAt));
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    const [review] = await db
      .update(reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
    return review;
  }

  async deleteReview(id: number): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  async updateReviewHelpfulness(id: number, helpful: number, unhelpful: number): Promise<void> {
    await db
      .update(reviews)
      .set({ helpful, unhelpful })
      .where(eq(reviews.id, id));
  }

  async getAllReviews(): Promise<Review[]> {
    return db.select().from(reviews).orderBy(desc(reviews.createdAt));
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }
}
