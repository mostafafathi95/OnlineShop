import { db } from "../db";
import { eq, desc, asc, ilike, and, lte } from "drizzle-orm";
import { products } from "@shared/schema";
import type { Product, InsertProduct } from "@shared/schema";

export class Products {
  async getAllProducts(options?: {
    search?: string;
    category?: string;
    featured?: boolean;
    lowStock?: boolean;
    limit?: number;
    sort?: string;
  }): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (options?.search) {
      conditions.push(ilike(products.name, `%${options.search}%`));
    }

    if (options?.featured) {
      conditions.push(eq(products.isFeatured, true));
    }

    if (options?.lowStock) {
      conditions.push(lte(products.stock, 10));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    let orderBy;
    switch (options?.sort) {
      case "price-asc":
        orderBy = asc(products.price);
        break;
      case "price-desc":
        orderBy = desc(products.price);
        break;
      case "popular":
      case "newest":
      default:
        orderBy = desc(products.createdAt);
    }

    query = query.orderBy(orderBy) as any;

    if (options?.limit) {
      query = query.limit(options.limit) as any;
    }

    return query;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
}
