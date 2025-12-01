import { db } from "../db";
import { eq, desc } from "drizzle-orm";
import { articles } from "@shared/schema";
import type { Article, InsertArticle } from "@shared/schema";

export class Articles {
  async getAllArticles(options?: { published?: boolean; limit?: number }): Promise<Article[]> {
    let query = db.select().from(articles);
    if (options?.published) {
      query = query.where(eq(articles.isPublished, true)) as any;
    }
    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }
    return query.orderBy(desc(articles.createdAt)) as any;
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article as any).returning();
    return newArticle;
  }

  async updateArticle(id: number, data: Partial<InsertArticle>): Promise<Article | undefined> {
    const [updated] = await db.update(articles).set({ ...data, updatedAt: new Date() }).where(eq(articles.id, id)).returning();
    return updated;
  }

  async deleteArticle(id: number): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }
}
