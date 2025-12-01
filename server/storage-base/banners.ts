import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { banners } from "@shared/schema";
import type { Banner, InsertBanner } from "@shared/schema";

export class Banners {
  async getAllBanners(): Promise<Banner[]> {
    return db.select().from(banners).orderBy(asc(banners.sortOrder));
  }

  async getBannerById(id: number): Promise<Banner | undefined> {
    const [banner] = await db.select().from(banners).where(eq(banners.id, id));
    return banner;
  }

  async createBanner(banner: InsertBanner): Promise<Banner> {
    const [newBanner] = await db.insert(banners).values(banner).returning();
    return newBanner;
  }

  async updateBanner(id: number, data: Partial<InsertBanner>): Promise<Banner | undefined> {
    const [updated] = await db.update(banners).set(data).where(eq(banners.id, id)).returning();
    return updated;
  }

  async deleteBanner(id: number): Promise<void> {
    await db.delete(banners).where(eq(banners.id, id));
  }

  async updateBannerSortOrder(id: number, sortOrder: number): Promise<Banner | undefined> {
    const [updated] = await db.update(banners).set({ sortOrder }).where(eq(banners.id, id)).returning();
    return updated;
  }
}
