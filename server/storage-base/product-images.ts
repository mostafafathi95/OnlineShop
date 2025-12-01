import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { productImages } from "@shared/schema";
import type { ProductImage, InsertProductImage } from "@shared/schema";

export class ProductImages {
  async getProductImages(productId: number): Promise<ProductImage[]> {
    return db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .orderBy(asc(productImages.sortOrder));
  }

  async addProductImage(image: InsertProductImage): Promise<ProductImage> {
    const [newImage] = await db.insert(productImages).values(image).returning();
    return newImage;
  }

  async deleteProductImage(id: number): Promise<void> {
    await db.delete(productImages).where(eq(productImages.id, id));
  }
}
