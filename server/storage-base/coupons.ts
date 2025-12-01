import { db } from "../db";
import { eq, desc, and, sql } from "drizzle-orm";
import { coupons } from "@shared/schema";
import type { Coupon, InsertCoupon } from "@shared/schema";

export class Coupons {
  async getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]> {
    let query = db.select().from(coupons);
    if (options?.active) {
      query = query.where(eq(coupons.isActive, true)) as any;
    }
    return query.orderBy(desc(coupons.createdAt)) as any;
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    const [coupon] = await db
      .select()
      .from(coupons)
      .where(and(eq(coupons.code, code), eq(coupons.isActive, true)));

    if (!coupon) return undefined;

    const now = new Date();
    if (coupon.startDate && coupon.startDate > now) return undefined;
    if (coupon.endDate && coupon.endDate < now) return undefined;
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) return undefined;

    return coupon;
  }

  async createCoupon(coupon: InsertCoupon): Promise<Coupon> {
    const [newCoupon] = await db.insert(coupons).values(coupon).returning();
    return newCoupon;
  }

  async updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined> {
    const [coupon] = await db
      .update(coupons)
      .set(data)
      .where(eq(coupons.id, id))
      .returning();
    return coupon;
  }

  async deleteCoupon(id: number): Promise<void> {
    await db.delete(coupons).where(eq(coupons.id, id));
  }

  async incrementCouponUses(code: string): Promise<void> {
    await db
      .update(coupons)
      .set({ currentUses: sql`${coupons.currentUses} + 1` })
      .where(eq(coupons.code, code));
  }
}
