import { logger } from "./logger";

export interface AdvancedAuthToken {
  userId: number;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  sessionId: string;
}

export interface AuthSession {
  userId: number;
  sessionId: string;
  createdAt: Date;
  lastActivity: Date;
  ipAddress: string;
  userAgent: string;
  isActive: boolean;
}

class AdvancedAuthManager {
  private sessions: Map<string, AuthSession> = new Map();
  private tokens: Map<string, AdvancedAuthToken> = new Map();
  private loginAttempts: Map<string, { count: number; timestamp: number }> = new Map();
  private maxLoginAttempts = 5;
  private lockoutDuration = 15 * 60 * 1000;

  generateToken(
    userId: number,
    username: string,
    email: string,
    role: string = "user",
    sessionId: string = this.generateSessionId()
  ): string {
    try {
      const now = Math.floor(Date.now() / 1000);
      const token: AdvancedAuthToken = {
        userId,
        username,
        email,
        role,
        sessionId,
        iat: now,
        exp: now + 7 * 24 * 60 * 60,
      };

      const tokenId = this.generateTokenId();
      this.tokens.set(tokenId, token);

      logger.debug("TOKEN", "Generated token", {
        userId,
        username,
        sessionId,
      });

      return tokenId;
    } catch (e) {
      logger.error("TOKEN", "Failed to generate token", { error: String(e), userId });
      throw new Error("Token generation failed");
    }
  }

  verifyToken(token: string): AdvancedAuthToken | null {
    try {
      const authToken = this.tokens.get(token);

      if (!authToken) {
        logger.warn("TOKEN", "Token not found", { token });
        return null;
      }

      const now = Math.floor(Date.now() / 1000);
      if (authToken.exp < now) {
        logger.warn("TOKEN", "Token expired", { userId: authToken.userId });
        this.tokens.delete(token);
        return null;
      }

      const session = this.sessions.get(authToken.sessionId);
      if (!session || !session.isActive) {
        logger.warn("TOKEN", "Session inactive or not found", {
          sessionId: authToken.sessionId,
          userId: authToken.userId,
        });
        return null;
      }

      session.lastActivity = new Date();
      return authToken;
    } catch (e) {
      logger.warn("TOKEN", "Token verification failed", { error: String(e) });
      return null;
    }
  }

  createSession(
    userId: number,
    ipAddress: string,
    userAgent: string
  ): AuthSession {
    const sessionId = this.generateSessionId();
    const now = new Date();

    const session: AuthSession = {
      userId,
      sessionId,
      createdAt: now,
      lastActivity: now,
      ipAddress,
      userAgent,
      isActive: true,
    };

    this.sessions.set(sessionId, session);

    logger.auth("SESSION", `Session created for user ${userId}`, {
      sessionId,
      userId,
      ip: ipAddress,
    });

    return session;
  }

  endSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      logger.auth("SESSION", `Session ended: ${sessionId}`, {
        sessionId,
        userId: session.userId,
      });
      return true;
    }
    return false;
  }

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
      logger.error("LOGIN", `Account locked due to failed attempts: ${identifier}`, {
        ip,
      });
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

  getSession(sessionId: string): AuthSession | null {
    return this.sessions.get(sessionId) || null;
  }

  getAllSessions(userId: number): AuthSession[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.userId === userId && s.isActive
    );
  }

  getSessionStats(): {
    totalSessions: number;
    activeSessions: number;
    totalUsers: number;
  } {
    const totalSessions = this.sessions.size;
    const activeSessions = Array.from(this.sessions.values()).filter(
      (s) => s.isActive
    ).length;
    const totalUsers = new Set(
      Array.from(this.sessions.values()).map((s) => s.userId)
    ).size;

    return {
      totalSessions,
      activeSessions,
      totalUsers,
    };
  }

  auditTrail(userId: number, action: string, details: any, ip?: string) {
    logger.trackActivity(userId, action, details, ip);
  }

  cleanupInactiveSessions(maxInactiveMinutes: number = 30) {
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - maxInactiveMinutes * 60 * 1000);

    let cleanedCount = 0;
    const sessionsToDelete: string[] = [];

    this.sessions.forEach((session, sessionId) => {
      if (session.lastActivity < cutoffTime) {
        sessionsToDelete.push(sessionId);
        cleanedCount++;
      }
    });

    sessionsToDelete.forEach((sessionId) => {
      this.sessions.delete(sessionId);
    });

    if (cleanedCount > 0) {
      logger.info("SESSION", `Cleaned up ${cleanedCount} inactive sessions`);
    }

    return cleanedCount;
  }

  cleanupExpiredTokens() {
    const now = Math.floor(Date.now() / 1000);
    let cleanedCount = 0;
    const tokensToDelete: string[] = [];

    this.tokens.forEach((token, tokenId) => {
      if (token.exp < now) {
        tokensToDelete.push(tokenId);
        cleanedCount++;
      }
    });

    tokensToDelete.forEach((tokenId) => {
      this.tokens.delete(tokenId);
    });

    if (cleanedCount > 0) {
      logger.info("TOKEN", `Cleaned up ${cleanedCount} expired tokens`);
    }

    return cleanedCount;
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateTokenId(): string {
    return `tok_${Date.now()}_${Math.random().toString(36).substr(2, 15)}`;
  }
}

export const authManager = new AdvancedAuthManager();
