import { Analytics, Stats } from "../../storage-base";

export class AnalyticsStorageAdapter {
  private analytics: Analytics;
  private stats: Stats;

  constructor() {
    this.analytics = new Analytics();
    this.stats = new Stats();
  }

  async getStats(): Promise<{ totalProducts: number; totalOrders: number; totalUsers: number; totalRevenue: number }> {
    return this.stats.getStats();
  }
}
