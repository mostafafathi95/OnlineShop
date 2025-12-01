import { logger } from "../logger";

const activeTokens = new Map<string, any>();

export function storeToken(token: string, data: any) {
  activeTokens.set(token, data);
  logger.info("TOKEN", "Token stored", { userId: data.userId });
}

export function validateToken(token: string | undefined) {
  if (!token) return null;
  
  const data = activeTokens.get(token);
  if (!data) {
    logger.warn("TOKEN", "Token not found or expired", { token: token?.substring(0, 20) });
    return null;
  }
  
  return data;
}

export function clearToken(token: string) {
  activeTokens.delete(token);
}
