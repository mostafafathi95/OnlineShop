import { logger } from "../logger";
import type { AdvancedAuthToken } from "./types";

export class TokenManager {
  private tokens: Map<string, AdvancedAuthToken> = new Map();

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

      return authToken;
    } catch (e) {
      logger.warn("TOKEN", "Token verification failed", { error: String(e) });
      return null;
    }
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
