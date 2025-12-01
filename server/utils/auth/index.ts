import { TokenManager } from "./token-manager";
import { SessionManager } from "./session-manager";
import { LoginManager } from "./login-manager";
import type { AdvancedAuthToken, AuthSession } from "./types";

class AdvancedAuthManager {
  private tokenManager: TokenManager;
  private sessionManager: SessionManager;
  private loginManager: LoginManager;

  constructor() {
    this.tokenManager = new TokenManager();
    this.sessionManager = new SessionManager();
    this.loginManager = new LoginManager();
  }

  generateToken(userId: number, username: string, email: string, role: string = "user", sessionId?: string) {
    return this.tokenManager.generateToken(userId, username, email, role, sessionId);
  }

  verifyToken(token: string): AdvancedAuthToken | null {
    return this.tokenManager.verifyToken(token);
  }

  createSession(userId: number, ipAddress: string, userAgent: string): AuthSession {
    return this.sessionManager.createSession(userId, ipAddress, userAgent);
  }

  endSession(sessionId: string): boolean {
    return this.sessionManager.endSession(sessionId);
  }

  recordLoginAttempt(identifier: string, success: boolean, ip?: string) {
    return this.loginManager.recordLoginAttempt(identifier, success, ip);
  }

  isLoginAllowed(identifier: string): boolean {
    return this.loginManager.isLoginAllowed(identifier);
  }

  getLoginAttemptsRemaining(identifier: string): number {
    return this.loginManager.getLoginAttemptsRemaining(identifier);
  }

  getSession(sessionId: string): AuthSession | null {
    return this.sessionManager.getSession(sessionId);
  }

  getAllSessions(userId: number): AuthSession[] {
    return this.sessionManager.getAllSessions(userId);
  }

  getSessionStats() {
    const activeSessions = this.sessionManager.getAllSessions(0).length;
    return {
      totalSessions: activeSessions,
      activeSessions,
      totalUsers: new Set(
        this.sessionManager
          .getAllSessions(0)
          .map((s) => s.userId)
      ).size,
    };
  }

  auditTrail(userId: number, action: string, details: any, ip?: string) {
    console.log(`[AUDIT] User ${userId}: ${action}`, details, ip);
  }

  cleanupInactiveSessions(maxInactiveMinutes: number = 30) {
    return this.sessionManager.cleanupInactiveSessions(maxInactiveMinutes);
  }

  cleanupExpiredTokens() {
    return this.tokenManager.cleanupExpiredTokens();
  }
}

export const authManager = new AdvancedAuthManager();
export type { AdvancedAuthToken, AuthSession };
