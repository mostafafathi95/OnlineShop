import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing', 
  'shipped',
  'delivered',
  'cancelled',
  'returned',
  'processing_return',
  'refunded',
  'on_hold'
]);

export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const questionStatusEnum = pgEnum('question_status', ['pending', 'answered', 'closed']);
export const userRequestStatusEnum = pgEnum('user_request_status', ['pending', 'processing', 'completed', 'rejected']);

// Session storage table - Required for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table - Required for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").default("user").notNull(),
  phone: varchar("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for users
export const insertUsersSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const selectUsersSchema = createInsertSchema(users);
export type User = typeof users.$inferSelect;
export type UpsertUser = z.infer<typeof insertUsersSchema>;
