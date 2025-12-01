import { Users } from "../../storage-base";
import type { User, UpsertUser } from "@shared/schema";

export class AuthStorageAdapter {
  private users: Users;
  private sessions: Map<string, any> = new Map();

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

  // Session Management
  async createSession(token: string, data: any): Promise<void> {
    this.sessions.set(token, { ...data, createdAt: Date.now() });
  }

  async getSession(token: string): Promise<any | null> {
    return this.sessions.get(token) || null;
  }

  async deleteSession(token: string): Promise<void> {
    this.sessions.delete(token);
  }
}
