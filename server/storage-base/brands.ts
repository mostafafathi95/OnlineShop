import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { brands } from "@shared/schema";
import type { Brand, InsertBrand } from "@shared/schema";

export class Brands {
  async getAllBrands(options?: { active?: boolean }): Promise<Brand[]> {
    let query = db.select().from(brands);
    if (options?.active) {
      query = query.where(eq(brands.isActive, true)) as any;
    }
    return query.orderBy(asc(brands.name)) as any;
  }

  async getBrandById(id: number): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand;
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const [newBrand] = await db.insert(brands).values(brand as any).returning();
    return newBrand;
  }

  async updateBrand(id: number, data: Partial<InsertBrand>): Promise<Brand | undefined> {
    const [updated] = await db.update(brands).set(data).where(eq(brands.id, id)).returning();
    return updated;
  }

  async deleteBrand(id: number): Promise<void> {
    await db.delete(brands).where(eq(brands.id, id));
  }
}
