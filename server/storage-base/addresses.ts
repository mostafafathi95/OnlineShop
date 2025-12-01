import { db } from "../db";
import { eq, desc } from "drizzle-orm";
import { addresses } from "@shared/schema";
import type { Address, InsertAddress } from "@shared/schema";

export class Addresses {
  async getUserAddresses(userId: string): Promise<Address[]> {
    return db
      .select()
      .from(addresses)
      .where(eq(addresses.userId, userId))
      .orderBy(desc(addresses.isDefault));
  }

  async getAddressById(id: number): Promise<Address | undefined> {
    const [address] = await db.select().from(addresses).where(eq(addresses.id, id));
    return address;
  }

  async createAddress(address: InsertAddress): Promise<Address> {
    const [newAddress] = await db.insert(addresses).values(address).returning();
    return newAddress;
  }

  async updateAddress(id: number, data: Partial<InsertAddress>): Promise<Address | undefined> {
    const [address] = await db
      .update(addresses)
      .set(data)
      .where(eq(addresses.id, id))
      .returning();
    return address;
  }

  async deleteAddress(id: number): Promise<void> {
    await db.delete(addresses).where(eq(addresses.id, id));
  }

  async setDefaultAddress(userId: string, addressId: number): Promise<void> {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
    await db
      .update(addresses)
      .set({ isDefault: true })
      .where(eq(addresses.id, addressId));
  }
}
