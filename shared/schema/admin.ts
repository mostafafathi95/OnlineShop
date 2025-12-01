import { index, pgTable, timestamp, varchar, text, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// Sliders table
export const sliders = pgTable("sliders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  description: text("description"),
  image: varchar("image").notNull(),
  link: varchar("link"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true).notNull(),
  type: varchar("type", { length: 50 }).default("banner"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_slider_slug").on(table.slug), index("idx_slider_active").on(table.isActive), index("idx_slider_dates").on(table.startDate), index("idx_slider_dates_end").on(table.endDate)]);

// Banners table
export const banners = pgTable("banners", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  badgeText: varchar("badge_text", { length: 100 }),
  description: text("description"),
  link: varchar("link"),
  backgroundColor: varchar("background_color").notNull(),
  textColor: varchar("text_color").default("#ffffff"),
  imageUrl: varchar("image_url"),
  icon: varchar("icon", { length: 50 }),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_banner_active").on(table.isActive)]);

// Landing Page Sections table
export const landingPageSections = pgTable("landing_page_sections", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 100 }).unique().notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  isVisible: boolean("is_visible").default(true).notNull(),
  sortOrder: integer("sort_order").default(0),
  config: jsonb("config"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [index("idx_landing_visible").on(table.isVisible)]);
