import { Wishlist, Coupons } from "../../storage-base";
import type { WishlistItem, Product, Coupon, InsertCoupon } from "@shared/schema";

export class CommerceStorageAdapter {
  private wishlist: Wishlist;
  private coupons: Coupons;

  constructor() {
    this.wishlist = new Wishlist();
    this.coupons = new Coupons();
  }

  // Wishlist
  async getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    return this.wishlist.getUserWishlist(userId);
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    return this.wishlist.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    return this.wishlist.removeFromWishlist(userId, productId);
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    return this.wishlist.isInWishlist(userId, productId);
  }

  // Coupons
  async getAllCoupons(options?: { active?: boolean }): Promise<Coupon[]> {
    return this.coupons.getAllCoupons(options);
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    return this.coupons.getCouponByCode(code);
  }

  async createCoupon(coupon: InsertCoupon): Promise<Coupon> {
    return this.coupons.createCoupon(coupon);
  }

  async updateCoupon(id: number, data: Partial<InsertCoupon>): Promise<Coupon | undefined> {
    return this.coupons.updateCoupon(id, data);
  }

  async deleteCoupon(id: number): Promise<void> {
    return this.coupons.deleteCoupon(id);
  }

  async incrementCouponUses(code: string): Promise<void> {
    return this.coupons.incrementCouponUses(code);
  }
}
