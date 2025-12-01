import {
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users, products, orderStatusEnum } from "./auth";

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

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  addressId: integer("address_id").references(() => addresses.id).notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
  paymentGateway: varchar("payment_gateway", { length: 50 }),
  totalAmount: decimal("total_amount", { precision: 12, scale: 0 }).notNull(),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 0 }).default(0),
  shippingCost: decimal("shipping_cost", { precision: 12, scale: 0 }).default(0),
  notes: text("notes"),
  trackingNumber: varchar("tracking_number"),
  couponCode: varchar("coupon_code"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_user_orders").on(table.userId), index("idx_order_status").on(table.status)]);

// Order Items table
export const orderItems = pgTable("order_items", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer("order_id").references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 12, scale: 0 }).notNull(),
  name: varchar("name", { length: 200 }),
}, (table) => [index("idx_order_items").on(table.orderId)]);

// Zod schemas
export const insertAddressSchema = createInsertSchema(addresses).omit({ id: true, createdAt: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof createInsertSchema(cartItems).omit({ id: true })>;
