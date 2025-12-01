import { db } from "../db";
import { eq, desc } from "drizzle-orm";
import { userRequests } from "@shared/schema";
import type { UserRequest, InsertUserRequest } from "@shared/schema";

export class Requests {
  async getUserRequests(userId: string): Promise<UserRequest[]> {
    return db.select().from(userRequests).where(eq(userRequests.userId, userId)).orderBy(desc(userRequests.createdAt));
  }

  async getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]> {
    let query = db.select().from(userRequests);
    if (options?.status) {
      query = query.where(eq(userRequests.status, options.status as any)) as any;
    }
    return query.orderBy(desc(userRequests.createdAt)) as any;
  }

  async getUserRequestById(id: number): Promise<UserRequest | undefined> {
    const [request] = await db.select().from(userRequests).where(eq(userRequests.id, id));
    return request;
  }

  async createUserRequest(request: InsertUserRequest): Promise<UserRequest> {
    const [newRequest] = await db.insert(userRequests).values(request).returning();
    return newRequest;
  }

  async updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined> {
    const [updated] = await db.update(userRequests).set({ ...data, updatedAt: new Date() }).where(eq(userRequests.id, id)).returning();
    return updated;
  }

  async deleteUserRequest(id: number): Promise<void> {
    await db.delete(userRequests).where(eq(userRequests.id, id));
  }
}
