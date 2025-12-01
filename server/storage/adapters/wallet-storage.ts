import { CreditPoints, Wallets, Requests } from "../../storage-base";
import type {
  CreditPoint, InsertCreditPoint, UserWallet, InsertUserWallet,
  UserRequest, InsertUserRequest
} from "@shared/schema";

export class WalletStorageAdapter {
  private creditPoints: CreditPoints;
  private wallets: Wallets;
  private requests: Requests;

  constructor() {
    this.creditPoints = new CreditPoints();
    this.wallets = new Wallets();
    this.requests = new Requests();
  }

  // Credit Points
  async getUserCreditPoints(userId: string): Promise<CreditPoint[]> {
    return this.creditPoints.getUserCreditPoints(userId);
  }

  async getTotalCreditPoints(userId: string): Promise<number> {
    return this.creditPoints.getTotalCreditPoints(userId);
  }

  async addCreditPoints(creditPoint: InsertCreditPoint): Promise<CreditPoint> {
    return this.creditPoints.addCreditPoints(creditPoint);
  }

  async removeCreditPoints(id: number): Promise<void> {
    return this.creditPoints.removeCreditPoints(id);
  }

  // User Wallets
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    return this.wallets.getUserWallet(userId);
  }

  async createUserWallet(wallet: InsertUserWallet): Promise<UserWallet> {
    return this.wallets.createUserWallet(wallet);
  }

  async updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined> {
    return this.wallets.updateWalletBalance(userId, balance);
  }

  // User Requests
  async getUserRequests(userId: string): Promise<UserRequest[]> {
    return this.requests.getUserRequests(userId);
  }

  async getAllUserRequests(options?: { status?: string }): Promise<UserRequest[]> {
    return this.requests.getAllUserRequests(options);
  }

  async getUserRequestById(id: number): Promise<UserRequest | undefined> {
    return this.requests.getUserRequestById(id);
  }

  async createUserRequest(request: InsertUserRequest): Promise<UserRequest> {
    return this.requests.createUserRequest(request);
  }

  async updateUserRequest(id: number, data: Partial<InsertUserRequest>): Promise<UserRequest | undefined> {
    return this.requests.updateUserRequest(id, data);
  }

  async deleteUserRequest(id: number): Promise<void> {
    return this.requests.deleteUserRequest(id);
  }
}
