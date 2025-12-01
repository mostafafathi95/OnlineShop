import { index, pgTable, timestamp, varchar, text, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { products } from "./products";

// Reviews & Ratings table
export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  content: text("content"),
  helpful: integer("helpful").default(0),
  unhelpful: integer("unhelpful").default(0),
  isApproved: boolean("is_approved").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_product_reviews").on(table.productId), index("idx_user_reviews").on(table.userId)]);

// Wishlist table
export const wishlist = pgTable("wishlist", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_user_wishlist").on(table.userId), index("idx_product_wishlist").on(table.productId)]);

// Coupons table
export const coupons = pgTable("coupons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: varchar("discount_type", { length: 20 }).notNull(),
  discountValue: decimal("discount_value", { precision: 12, scale: 2 }).notNull(),
  minOrderValue: decimal("min_order_value", { precision: 12, scale: 0 }),
  maxUses: integer("max_uses"),
  currentUses: integer("current_uses").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_active_coupons").on(table.isActive)]);

// Product comparisons table
export const productComparisons = pgTable("product_comparisons", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar("session_id").notNull(),
  product1Id: integer("product1_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  product2Id: integer("product2_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_comparison_session").on(table.sessionId)]);
