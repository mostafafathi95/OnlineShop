import { logger } from "../logger";
import type { LoginAttempt } from "./types";

export class LoginManager {
  private loginAttempts: Map<string, LoginAttempt> = new Map();
  private maxLoginAttempts = 5;
  private lockoutDuration = 15 * 60 * 1000;

  recordLoginAttempt(
    identifier: string,
    success: boolean,
    ip?: string
  ): { allowed: boolean; remainingAttempts: number } {
    const now = Date.now();
    const attempt = this.loginAttempts.get(identifier);

    if (attempt && now - attempt.timestamp > this.lockoutDuration) {
      this.loginAttempts.delete(identifier);
    }

    if (success) {
      this.loginAttempts.delete(identifier);
      logger.auth("LOGIN", `Successful login: ${identifier}`, { ip });
      return { allowed: true, remainingAttempts: this.maxLoginAttempts };
    }

    const current = this.loginAttempts.get(identifier) || { count: 0, timestamp: now };
    current.count++;
    current.timestamp = now;
    this.loginAttempts.set(identifier, current);

    const remaining = Math.max(0, this.maxLoginAttempts - current.count);
    const allowed = current.count < this.maxLoginAttempts;

    logger.warn("LOGIN", `Failed login attempt: ${identifier}`, {
      attempt: current.count,
      remaining,
      ip,
    });

    if (!allowed) {
      logger.error("LOGIN", `Account locked due to failed attempts: ${identifier}`, { ip });
    }

    return { allowed, remainingAttempts: remaining };
  }

  isLoginAllowed(identifier: string): boolean {
    const attempt = this.loginAttempts.get(identifier);
    if (!attempt) return true;

    const now = Date.now();
    if (now - attempt.timestamp > this.lockoutDuration) {
      this.loginAttempts.delete(identifier);
      return true;
    }

    return attempt.count < this.maxLoginAttempts;
  }

  getLoginAttemptsRemaining(identifier: string): number {
    const attempt = this.loginAttempts.get(identifier);
    if (!attempt) return this.maxLoginAttempts;

    const now = Date.now();
    if (now - attempt.timestamp > this.lockoutDuration) {
      this.loginAttempts.delete(identifier);
      return this.maxLoginAttempts;
    }

    return Math.max(0, this.maxLoginAttempts - attempt.count);
  }
}
