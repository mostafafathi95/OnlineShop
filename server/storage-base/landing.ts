import { db } from "../db";
import { eq } from "drizzle-orm";
import { landingPageSections } from "@shared/schema";
import type { LandingPageSection, InsertLandingPageSection } from "@shared/schema";

export class LandingPageSections {
  async getLandingPageSections(): Promise<LandingPageSection[]> {
    return db.select().from(landingPageSections);
  }

  async getLandingPageSectionById(id: number): Promise<LandingPageSection | undefined> {
    const [section] = await db.select().from(landingPageSections).where(eq(landingPageSections.id, id));
    return section;
  }

  async createLandingPageSection(section: InsertLandingPageSection): Promise<LandingPageSection> {
    const [newSection] = await db.insert(landingPageSections).values(section).returning();
    return newSection;
  }

  async updateLandingPageSection(id: number, data: Partial<InsertLandingPageSection>): Promise<LandingPageSection | undefined> {
    const [updated] = await db.update(landingPageSections).set(data).where(eq(landingPageSections.id, id)).returning();
    return updated;
  }

  async deleteLandingPageSection(id: number): Promise<void> {
    await db.delete(landingPageSections).where(eq(landingPageSections.id, id));
  }
}
