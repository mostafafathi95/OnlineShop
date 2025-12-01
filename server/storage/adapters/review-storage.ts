import { Reviews } from "../../storage-base";
import type { Review, InsertReview } from "@shared/schema";

export class ReviewStorageAdapter {
  private reviews: Reviews;

  constructor() {
    this.reviews = new Reviews();
  }

  async getProductReviews(productId: number): Promise<Review[]> {
    return this.reviews.getProductReviews(productId);
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    return this.reviews.getUserReviews(userId);
  }

  async getReviewById(id: number): Promise<Review | undefined> {
    return this.reviews.getReviewById(id);
  }

  async getAllReviews(): Promise<Review[]> {
    return this.reviews.getAllReviews();
  }

  async createReview(review: InsertReview): Promise<Review> {
    return this.reviews.createReview(review);
  }

  async updateReview(id: number, data: Partial<InsertReview>): Promise<Review | undefined> {
    return this.reviews.updateReview(id, data);
  }

  async deleteReview(id: number): Promise<void> {
    return this.reviews.deleteReview(id);
  }

  async updateReviewHelpfulness(id: number, helpful: number, unhelpful: number): Promise<void> {
    return this.reviews.updateReviewHelpfulness(id, helpful, unhelpful);
  }
}
