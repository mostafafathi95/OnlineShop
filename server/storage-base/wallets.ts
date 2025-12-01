import { db } from "../db";
import { eq } from "drizzle-orm";
import { userWallets } from "@shared/schema";
import type { UserWallet, InsertUserWallet } from "@shared/schema";

export class Wallets {
  async getUserWallet(userId: string): Promise<UserWallet | undefined> {
    const [wallet] = await db.select().from(userWallets).where(eq(userWallets.userId, userId));
    return wallet;
  }

  async createUserWallet(wallet: InsertUserWallet): Promise<UserWallet> {
    const [newWallet] = await db.insert(userWallets).values(wallet).returning();
    return newWallet;
  }

  async updateWalletBalance(userId: string, balance: string): Promise<UserWallet | undefined> {
    const [updated] = await db.update(userWallets).set({ balance, updatedAt: new Date() }).where(eq(userWallets.userId, userId)).returning();
    return updated;
  }
}
