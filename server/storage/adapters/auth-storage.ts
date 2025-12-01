import { Users } from "../storage-base/index";
import type { User, UpsertUser } from "@shared/schema";

export class AuthStorageAdapter {
  private users: Users;

  constructor() {
    this.users = new Users();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.getUserByEmail(email);
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    return this.users.upsertUser(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    return this.users.updateUser(id, data);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users.getAllUsers();
  }
}
