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

export interface LoginAttempt {
  count: number;
  timestamp: number;
}
