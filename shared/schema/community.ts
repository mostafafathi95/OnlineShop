import { index, pgTable, timestamp, varchar, text, integer } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { products } from "./products";
import { questionStatusEnum } from "./auth";

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
