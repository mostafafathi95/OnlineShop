import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  decimal,
  boolean,
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

// Reviews & Ratings table
export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  rating: integer("rating").notNull(), // 1-5
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
  discountType: varchar("discount_type", { length: 20 }).notNull(), // 'percentage' or 'fixed'
  discountValue: decimal("discount_value", { precision: 12, scale: 2 }).notNull(),
  minOrderValue: decimal("min_order_value", { precision: 12, scale: 0 }),
  maxUses: integer("max_uses"), // null = unlimited
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

// Settings table
export const settings = pgTable("settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Questions & Answers table
export const questions = pgTable("questions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  productId: integer("product_id").references(() => products.id, { onDelete: 'cascade' }).notNull(),
  userId: varchar("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
  content: text("content").notNull(),
  status: questionStatusEnum("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_question_product").on(table.productId), index("idx_question_user").on(table.userId)]);

export const answers = pgTable("answers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  questionId: integer("question_id").references(() => questions.id, { onDelete: 'cascade' }).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [index("idx_answer_question").on(table.questionId)]);

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

// Orders table
export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),
  subtotal: decimal("subtotal", { precision: 12, scale: 0 }).notNull(),
  shippingCost: decimal("shipping_cost", { precision: 12, scale: 0 }).default("0"),
  discount: decimal("discount", { precision: 12, scale: 0 }).default("0"),
  total: decimal("total", { precision: 12, scale: 0 }).notNull(),
  addressId: integer("address_id").references(() => addresses.id),
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

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  cartItems: many(cartItems),
  orders: many(orders),
  reviews: many(reviews),
  wishlist: many(wishlist),
  creditPoints: many(creditPoints),
  articles: many(articles),
  questions: many(questions),
  answers: many(answers),
  userRequests: many(userRequests),
  userWallet: many(userWallets),
}));

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, {
    fields: [articles.authorId],
    references: [users.id],
  }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  product: one(products, {
    fields: [questions.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  user: one(users, {
    fields: [answers.userId],
    references: [users.id],
  }),
}));

export const productAttributesRelations = relations(productAttributes, ({ one }) => ({
  product: one(products, {
    fields: [productAttributes.productId],
    references: [products.id],
  }),
}));

export const creditPointsRelations = relations(creditPoints, ({ one }) => ({
  user: one(users, {
    fields: [creditPoints.userId],
    references: [users.id],
  }),
}));

export const userWalletsRelations = relations(userWallets, ({ one }) => ({
  user: one(users, {
    fields: [userWallets.userId],
    references: [users.id],
  }),
}));

export const userRequestsRelations = relations(userRequests, ({ one }) => ({
  user: one(users, {
    fields: [userRequests.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryParent',
  }),
  children: many(categories, { relationName: 'categoryParent' }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  reviews: many(reviews),
  wishlistItems: many(wishlist),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, {
    fields: [wishlist.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [wishlist.productId],
    references: [products.id],
  }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orderItems.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export const insertProductImageSchema = createInsertSchema(productImages).omit({ id: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true, updatedAt: true, helpful: true, unhelpful: true });
export const insertAddressSchema = createInsertSchema(addresses).omit({ id: true, createdAt: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, createdAt: true, updatedAt: true });
export const insertCouponSchema = createInsertSchema(coupons).omit({ id: true, createdAt: true, currentUses: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, updatedAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true, viewCount: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, createdAt: true, updatedAt: true, viewCount: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBrandSchema = createInsertSchema(brands).omit({ id: true, createdAt: true });
export const insertProductAttributeSchema = createInsertSchema(productAttributes).omit({ id: true });
export const insertShippingMethodSchema = createInsertSchema(shippingMethods).omit({ id: true, createdAt: true });
export const insertCreditPointSchema = createInsertSchema(creditPoints).omit({ id: true, createdAt: true });
export const insertUserWalletSchema = createInsertSchema(userWallets).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserRequestSchema = createInsertSchema(userRequests).omit({ id: true, createdAt: true, updatedAt: true });
export const insertSettingSchema = createInsertSchema(settings).omit({ id: true, createdAt: true, updatedAt: true });
export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true, createdAt: true });
export const insertAnswerSchema = createInsertSchema(answers).omit({ id: true, createdAt: true });

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProductImage = z.infer<typeof insertProductImageSchema>;
export type ProductImage = typeof productImages.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type Address = typeof addresses.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCoupon = z.infer<typeof insertCouponSchema>;
export type Coupon = typeof coupons.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type WishlistItem = typeof wishlist.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;
export type InsertProductAttribute = z.infer<typeof insertProductAttributeSchema>;
export type ProductAttribute = typeof productAttributes.$inferSelect;
export type InsertShippingMethod = z.infer<typeof insertShippingMethodSchema>;
export type ShippingMethod = typeof shippingMethods.$inferSelect;
export type InsertCreditPoint = z.infer<typeof insertCreditPointSchema>;
export type CreditPoint = typeof creditPoints.$inferSelect;
export type InsertUserWallet = z.infer<typeof insertUserWalletSchema>;
export type UserWallet = typeof userWallets.$inferSelect;
export type InsertUserRequest = z.infer<typeof insertUserRequestSchema>;
export type UserRequest = typeof userRequests.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;
export type InsertAnswer = z.infer<typeof insertAnswerSchema>;
export type Answer = typeof answers.$inferSelect;

// Extended types for frontend
export type ProductWithCategory = Product & {
  category: Category | null;
  images: ProductImage[];
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderWithItems = Order & {
  items: (OrderItem & { product?: Product })[];
  user?: User;
};
