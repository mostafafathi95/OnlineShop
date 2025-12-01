import { db } from "../db";
import { eq, and } from "drizzle-orm";
import { wishlist, products } from "@shared/schema";
import type { WishlistItem, Product } from "@shared/schema";

export class Wishlist {
  async getUserWishlist(userId: string): Promise<(WishlistItem & { product: Product })[]> {
    const items = await db
      .select({
        wishlistItem: wishlist,
        product: products,
      })
      .from(wishlist)
      .innerJoin(products, eq(wishlist.productId, products.id))
      .where(eq(wishlist.userId, userId));

    return items.map((item) => ({
      ...item.wishlistItem,
      product: item.product,
    }));
  }

  async addToWishlist(userId: string, productId: number): Promise<WishlistItem> {
    const [item] = await db
      .insert(wishlist)
      .values({ userId, productId })
      .returning();
    return item;
  }

  async removeFromWishlist(userId: string, productId: number): Promise<void> {
    await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)));
  }

  async isInWishlist(userId: string, productId: number): Promise<boolean> {
    const [item] = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.productId, productId)))
      .limit(1);
    return !!item;
  }
}
