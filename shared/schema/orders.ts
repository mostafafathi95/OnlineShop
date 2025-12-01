import { pgTable, timestamp, varchar, text, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { products } from "./products";

// Addresses table
export const addresses = pgTable("addresses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  province: varchar("province", { length: 50 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  address: text("address").notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Orders table - declared before orderItems since it's referenced
export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  status: varchar("status").default("pending").notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 0 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 12, scale: 0 }).default("0"),
  discount: decimal("discount", { precision: 12, scale: 0 }).default("0"),
  total: decimal("total", { precision: 12, scale: 0 }).notNull(),
  addressId: integer("address_id"),
  shippingAddress: jsonb("shipping_address"),
  couponCode: varchar("coupon_code", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  productName: varchar("product_name", { length: 200 }).notNull(),
  productImage: varchar("product_image"),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  quantity: integer("quantity").notNull(),
  total: decimal("total", { precision: 12, scale: 0 }).notNull(),
});
