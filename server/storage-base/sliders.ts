import { db } from "../db";
import { eq, asc, and, sql } from "drizzle-orm";
import { sliders } from "@shared/schema";
import type { Slider, InsertSlider } from "@shared/schema";

export class Sliders {
  async getAllSliders(): Promise<Slider[]> {
    return db.select().from(sliders).orderBy(asc(sliders.sortOrder));
  }

  async getSliderById(id: number): Promise<Slider | undefined> {
    const [slider] = await db.select().from(sliders).where(eq(sliders.id, id));
    return slider;
  }

  async getSliderBySlug(slug: string): Promise<Slider | undefined> {
    const [slider] = await db.select().from(sliders).where(eq(sliders.slug, slug));
    return slider;
  }

  async getActiveSliders(): Promise<Slider[]> {
    const now = new Date();
    return db.select().from(sliders).where(
      and(
        eq(sliders.isActive, true),
        sql`${sliders.startDate} <= ${now}`,
        sql`${sliders.endDate} >= ${now}`
      )
    ).orderBy(asc(sliders.sortOrder));
  }

  async createSlider(slider: InsertSlider): Promise<Slider> {
    const [newSlider] = await db.insert(sliders).values(slider).returning();
    return newSlider;
  }

  async updateSlider(id: number, data: Partial<InsertSlider>): Promise<Slider | undefined> {
    const [updated] = await db.update(sliders).set({ ...data, updatedAt: new Date() }).where(eq(sliders.id, id)).returning();
    return updated;
  }

  async deleteSlider(id: number): Promise<void> {
    await db.delete(sliders).where(eq(sliders.id, id));
  }
}
