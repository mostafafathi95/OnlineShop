import { index, pgTable, timestamp, varchar, integer } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { products } from "./products";

// Search Analytics table
export const searchAnalytics = pgTable("search_analytics", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  query: varchar("query", { length: 500 }).notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }),
  resultsCount: integer("results_count").default(0),
  clickedProductId: integer("clicked_product_id").references(() => products.id, { onDelete: 'set null' }),
  isZeroResult: boolean("is_zero_result").default(false),
  sessionId: varchar("session_id"),
  userAgent: varchar("user_agent"),
  ipAddress: varchar("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_search_query").on(table.query), index("idx_search_user").on(table.userId), index("idx_search_zero_result").on(table.isZeroResult)]);
