import { index, pgTable, timestamp, varchar, text, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { products } from "./products";

// Brands table
export const brands = pgTable("brands", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  logo: varchar("logo"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_brand_slug").on(table.slug)]);

// Product attributes table
export const productAttributes = pgTable("product_attributes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  value: varchar("value", { length: 200 }).notNull(),
  sortOrder: integer("sort_order").default(0),
}, (table) => [index("idx_attr_product").on(table.productId)]);

// Shipping methods table
export const shippingMethods = pgTable("shipping_methods", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  estimatedDays: integer("estimated_days"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
