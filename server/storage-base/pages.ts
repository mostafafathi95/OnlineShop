import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { pages } from "@shared/schema";
import type { Page, InsertPage } from "@shared/schema";

export class Pages {
  async getAllPages(options?: { published?: boolean }): Promise<Page[]> {
    let query = db.select().from(pages);
    if (options?.published) {
      query = query.where(eq(pages.isPublished, true)) as any;
    }
    return query.orderBy(asc(pages.title)) as any;
  }

  async getPageById(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: number, data: Partial<InsertPage>): Promise<Page | undefined> {
    const [updated] = await db.update(pages).set({ ...data, updatedAt: new Date() }).where(eq(pages.id, id)).returning();
    return updated;
  }

  async deletePage(id: number): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }
}
