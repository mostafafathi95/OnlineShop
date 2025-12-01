import { db } from "../db";
import { eq, desc } from "drizzle-orm";
import { news } from "@shared/schema";
import type { News, InsertNews } from "@shared/schema";

export class NewsOps {
  async getAllNews(options?: { published?: boolean; limit?: number }): Promise<News[]> {
    let query = db.select().from(news);
    if (options?.published) {
      query = query.where(eq(news.isPublished, true)) as any;
    }
    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }
    return query.orderBy(desc(news.createdAt)) as any;
  }

  async getNewsById(id: number): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.id, id));
    return newsItem;
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    const [newsItem] = await db.select().from(news).where(eq(news.slug, slug));
    return newsItem;
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const [newNews] = await db.insert(news).values(newsItem).returning();
    return newNews;
  }

  async updateNews(id: number, data: Partial<InsertNews>): Promise<News | undefined> {
    const [updated] = await db.update(news).set({ ...data, updatedAt: new Date() }).where(eq(news.id, id)).returning();
    return updated;
  }

  async deleteNews(id: number): Promise<void> {
    await db.delete(news).where(eq(news.id, id));
  }
}
