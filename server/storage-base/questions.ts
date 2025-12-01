import { db } from "../db";
import { eq, desc } from "drizzle-orm";
import { questions } from "@shared/schema";
import type { Question, InsertQuestion } from "@shared/schema";

export class Questions {
  async getProductQuestions(productId: number): Promise<Question[]> {
    return db.select().from(questions).where(eq(questions.productId, productId)).orderBy(desc(questions.createdAt));
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    return question;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined> {
    const [updated] = await db.update(questions).set(data).where(eq(questions.id, id)).returning();
    return updated;
  }

  async deleteQuestion(id: number): Promise<void> {
    await db.delete(questions).where(eq(questions.id, id));
  }
}
