import { db } from "../db";
import { searchAnalytics } from "@shared/schema";
import type { InsertSearchAnalytics } from "@shared/schema";

export class Analytics {
  async logSearchAnalytics(data: InsertSearchAnalytics): Promise<void> {
    await db.insert(searchAnalytics).values(data);
  }
}
