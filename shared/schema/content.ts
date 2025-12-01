import { index, pgTable, timestamp, varchar, text, integer, boolean } from "drizzle-orm/pg-core";
import { users } from "./auth";

// Articles table
export const articles = pgTable("articles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  image: varchar("image"),
  category: varchar("category", { length: 50 }),
  authorId: varchar("author_id").references(() => users.id),
  isPublished: boolean("is_published").default(false),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_article_slug").on(table.slug), index("idx_article_published").on(table.isPublished)]);

// News table
export const news = pgTable("news", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  image: varchar("image"),
  isPublished: boolean("is_published").default(false),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_news_slug").on(table.slug), index("idx_news_published").on(table.isPublished)]);

// Pages table
export const pages = pgTable("pages", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  content: text("content").notNull(),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_page_slug").on(table.slug)]);
