import { logger } from "../logger";
import type { AuthSession } from "./types";

export class SessionManager {
  private sessions: Map<string, AuthSession> = new Map();

  createSession(userId: number, ipAddress: string, userAgent: string): AuthSession {
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

  getSession(sessionId: string): AuthSession | null {
    return this.sessions.get(sessionId) || null;
  }

  getAllSessions(userId: number): AuthSession[] {
    return Array.from(this.sessions.values()).filter(
      (s) => s.userId === userId && s.isActive
    );
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

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
