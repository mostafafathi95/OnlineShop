import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { productAttributes } from "@shared/schema";
import type { ProductAttribute, InsertProductAttribute } from "@shared/schema";

export class ProductAttributes {
  async getProductAttributes(productId: number): Promise<ProductAttribute[]> {
    return db.select().from(productAttributes).where(eq(productAttributes.productId, productId)).orderBy(asc(productAttributes.sortOrder));
  }

  async createProductAttribute(attr: InsertProductAttribute): Promise<ProductAttribute> {
    const [newAttr] = await db.insert(productAttributes).values(attr).returning();
    return newAttr;
  }

  async updateProductAttribute(id: number, data: Partial<InsertProductAttribute>): Promise<ProductAttribute | undefined> {
    const [updated] = await db.update(productAttributes).set(data).where(eq(productAttributes.id, id)).returning();
    return updated;
  }

  async deleteProductAttribute(id: number): Promise<void> {
    await db.delete(productAttributes).where(eq(productAttributes.id, id));
  }
}
