import { Questions, Answers } from "../storage-base/index";
import type { Question, InsertQuestion, Answer, InsertAnswer } from "@shared/schema";

export class QAStorageAdapter {
  private questions: Questions;
  private answers: Answers;

  constructor() {
    this.questions = new Questions();
    this.answers = new Answers();
  }

  // Questions
  async getProductQuestions(productId: number): Promise<Question[]> {
    return this.questions.getProductQuestions(productId);
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.getQuestionById(id);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    return this.questions.createQuestion(question);
  }

  async updateQuestion(id: number, data: Partial<InsertQuestion>): Promise<Question | undefined> {
    return this.questions.updateQuestion(id, data);
  }

  async deleteQuestion(id: number): Promise<void> {
    return this.questions.deleteQuestion(id);
  }

  // Answers
  async getQuestionAnswers(questionId: number): Promise<Answer[]> {
    return this.answers.getQuestionAnswers(questionId);
  }

  async getAnswerById(id: number): Promise<Answer | undefined> {
    return this.answers.getAnswerById(id);
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    return this.answers.createAnswer(answer);
  }

  async updateAnswer(id: number, data: Partial<InsertAnswer>): Promise<Answer | undefined> {
    return this.answers.updateAnswer(id, data);
  }

  async deleteAnswer(id: number): Promise<void> {
    return this.answers.deleteAnswer(id);
  }
}
