import { index, pgTable, timestamp, varchar, text, integer, decimal } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { userRequestStatusEnum } from "./auth";

// Credit points table
export const creditPoints = pgTable("credit_points", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  points: decimal("points", { precision: 12, scale: 0 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_points_user").on(table.userId)]);

// User wallets table
export const userWallets = pgTable("user_wallets", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull().unique(),
  balance: decimal("balance", { precision: 12, scale: 0 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User requests table
export const userRequests = pgTable("user_requests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  status: userRequestStatusEnum("status").default("pending"),
  response: text("response"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_request_user").on(table.userId), index("idx_request_status").on(table.status)]);
