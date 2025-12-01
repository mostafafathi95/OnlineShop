import { db } from "../db";
import { eq } from "drizzle-orm";
import { shippingMethods } from "@shared/schema";
import type { ShippingMethod, InsertShippingMethod } from "@shared/schema";

export class ShippingMethods {
  async getAllShippingMethods(options?: { active?: boolean }): Promise<ShippingMethod[]> {
    let query = db.select().from(shippingMethods);
    if (options?.active) {
      query = query.where(eq(shippingMethods.isActive, true)) as any;
    }
    return query as any;
  }

  async getShippingMethodById(id: number): Promise<ShippingMethod | undefined> {
    const [method] = await db.select().from(shippingMethods).where(eq(shippingMethods.id, id));
    return method;
  }

  async createShippingMethod(method: InsertShippingMethod): Promise<ShippingMethod> {
    const [newMethod] = await db.insert(shippingMethods).values(method).returning();
    return newMethod;
  }

  async updateShippingMethod(id: number, data: Partial<InsertShippingMethod>): Promise<ShippingMethod | undefined> {
    const [updated] = await db.update(shippingMethods).set(data).where(eq(shippingMethods.id, id)).returning();
    return updated;
  }

  async deleteShippingMethod(id: number): Promise<void> {
    await db.delete(shippingMethods).where(eq(shippingMethods.id, id));
  }
}
