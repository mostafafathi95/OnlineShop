import { db } from "../db";
import { eq } from "drizzle-orm";
import { settings } from "@shared/schema";
import type { Setting, InsertSetting } from "@shared/schema";

export class Settings {
  async getAllSettings(): Promise<Setting[]> {
    return db.select().from(settings);
  }

  async getSettingByKey(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async createSetting(setting: InsertSetting): Promise<Setting> {
    const [newSetting] = await db.insert(settings).values(setting).returning();
    return newSetting;
  }

  async updateSetting(key: string, value: string): Promise<Setting | undefined> {
    const [updated] = await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key)).returning();
    return updated;
  }
}
