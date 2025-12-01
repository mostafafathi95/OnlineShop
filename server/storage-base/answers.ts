import { db } from "../db";
import { eq, asc } from "drizzle-orm";
import { answers } from "@shared/schema";
import type { Answer, InsertAnswer } from "@shared/schema";

export class Answers {
  async getQuestionAnswers(questionId: number): Promise<Answer[]> {
    return db.select().from(answers).where(eq(answers.questionId, questionId)).orderBy(asc(answers.createdAt));
  }

  async getAnswerById(id: number): Promise<Answer | undefined> {
    const [answer] = await db.select().from(answers).where(eq(answers.id, id));
    return answer;
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    const [newAnswer] = await db.insert(answers).values(answer).returning();
    return newAnswer;
  }

  async updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined> {
    const [updated] = await db.update(answers).set(data).where(eq(answers.id, id)).returning();
    return updated;
  }

  async deleteAnswer(id: number): Promise<void> {
    await db.delete(answers).where(eq(answers.id, id));
  }
}
