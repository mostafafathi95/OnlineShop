import { Comparisons } from "../../storage-base";

export class ComparisonStorageAdapter {
  private comparisons: Comparisons;

  constructor() {
    this.comparisons = new Comparisons();
  }

  async getComparison(sessionId: string): Promise<any[]> {
    return this.comparisons.getComparison(sessionId);
  }

  async addToComparison(sessionId: string, product1Id: number, product2Id: number): Promise<any> {
    return this.comparisons.addToComparison(sessionId, product1Id, product2Id);
  }

  async removeFromComparison(sessionId: string, product1Id: number, product2Id: number): Promise<void> {
    return this.comparisons.removeFromComparison(sessionId, product1Id, product2Id);
  }
}
