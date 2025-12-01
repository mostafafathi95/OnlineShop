import { index, pgTable, timestamp, varchar, text, integer, decimal, boolean } from "drizzle-orm/pg-core";

// Categories table
export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  image: varchar("image"),
  parentId: integer("parent_id"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products table
export const products = pgTable("products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 200 }).notNull(),
  nameEn: varchar("name_en", { length: 200 }),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  comparePrice: decimal("compare_price", { precision: 12, scale: 0 }),
  sku: varchar("sku", { length: 50 }),
  stock: integer("stock").default(0).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  image: varchar("image"),
  videoUrl: varchar("video_url"),
  isActive: boolean("is_active").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product images table
export const productImages = pgTable("product_images", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  url: varchar("url").notNull(),
  alt: varchar("alt"),
  sortOrder: integer("sort_order").default(0),
});
