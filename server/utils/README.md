# 🛠️ Server Utils - Backend Utilities Documentation

**Location:** `/server/utils`  
**Purpose:** Shared backend utilities and helpers  
**Language:** TypeScript

---

## 📂 Files Overview

### logger.ts (284 lines)

**Professional Logging System**

Comprehensive logging framework for monitoring and debugging:

#### Log Levels
- **INFO** - Information messages
- **WARN** - Warning messages
- **ERROR** - Error messages
- **DEBUG** - Debug information

#### Log Categories
- **HTTP** - HTTP requests/responses
- **API** - API endpoint logs
- **AUTH** - Authentication logs
- **DATABASE** - Database operations
- **ERROR** - Errors
- **SYSTEM** - System events

#### Usage Examples

```typescript
import { logger } from './logger';

// Info log
logger.info('auth', 'User logged in', { userId: '123' });

// API request log
logger.api('HTTP', 'GET /api/products', {
  statusCode: 200,
  duration: 45,
  userId: '123'
});

// Error log
logger.error('database', 'Query failed', { 
  error: new Error('Connection timeout'),
  query: 'SELECT * FROM products'
});

// System event
logger.system('startup', 'Server started on port 5000');
```

#### Log Structure

```json
{
  "timestamp": "2025-12-01T10:30:00.123Z",
  "level": "INFO",
  "category": "auth",
  "message": "User logged in",
  "metadata": {
    "userId": "123",
    "ip": "192.168.1.1"
  }
}
```

#### Log Files

Logs stored in `/server/logs/`:

```
logs/
├── api/              API request logs
├── auth/             Authentication logs
├── errors/           Error logs
└── system/           System event logs
```

#### Features

1. **Structured Logging** - JSON format for easy parsing
2. **Performance Tracking** - Request duration measurement
3. **Error Tracking** - Stack traces and context
4. **Categorization** - Group logs by type
5. **Timestamp** - UTC timezone
6. **Async Logging** - Non-blocking writes
7. **Log Rotation** - Automatic file rotation
8. **Filtering** - Query by level, category, time

#### Configuration

```typescript
// Customize log level
logger.setLevel('DEBUG'); // More verbose

// Change log directory
logger.setLogPath('/custom/path');

// Enable/disable categories
logger.enableCategory('HTTP');
logger.disableCategory('SYSTEM');
```

---

### advanced-auth.ts (298 lines)

**Advanced Authentication Manager**

Token-based authentication with session management:

#### Key Features

1. **Token Generation**
   - JWT-like tokens
   - User ID encoding
   - Role information
   - Session ID tracking
   - Expiration handling

2. **Token Verification**
   - Validate token signature
   - Check expiration
   - Extract user data
   - Role verification

3. **Session Management**
   - Create sessions
   - Track session activity
   - Automatic cleanup
   - Multi-device support

4. **Security**
   - Token signing
   - Secure storage
   - Session isolation
   - Automatic cleanup

#### Usage

```typescript
import { authManager } from './advanced-auth';

// Generate token on login
const token = authManager.generateToken({
  userId: user.id,
  sessionId: session.id,
  role: user.role
});

// Return token to client
res.json({ token });

// Verify token (middleware)
const decoded = authManager.verifyToken(token);
if (decoded) {
  req.userId = decoded.userId;
  req.role = decoded.role;
}

// Create session
const session = authManager.createSession(user.id, {
  ipAddress: req.ip,
  userAgent: req.get('user-agent')
});

// Get session
const session = authManager.getSession(sessionId);

// Destroy session
authManager.destroySession(sessionId);

// Cleanup old sessions (automatic, every 5 min)
authManager.cleanupInactiveSessions(30); // 30 min timeout
```

#### Token Structure

```typescript
{
  userId: string;        // User ID
  sessionId: string;     // Session ID
  role: 'user' | 'admin'; // User role
  issuedAt: number;      // Issued timestamp
  expiresAt: number;     // Expiration timestamp
}
```

#### Session Data

```typescript
{
  id: string;           // Session ID
  userId: string;       // User ID
  role: string;         // User role
  createdAt: number;    // Creation timestamp
  lastActivity: number; // Last activity timestamp
  ipAddress: string;    // Client IP
  userAgent: string;    // Browser info
}
```

#### Session Lifecycle

1. **Creation** - User logs in
2. **Activity** - Updated on each request
3. **Monitoring** - Log important activities
4. **Cleanup** - Remove after inactivity
5. **Destruction** - User logs out

#### Security Measures

1. **Token Signing** - Secure signature
2. **Expiration** - Time-based validity
3. **Session Isolation** - Per-user sessions
4. **Activity Tracking** - Detect anomalies
5. **Automatic Cleanup** - Remove old sessions
6. **Role-Based Access** - Authorization checks

#### Configuration

```typescript
// Token expiration (default: 24 hours)
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000;

// Session timeout (default: 30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

// Cleanup interval (default: 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000;
```

---

## 🔒 Security Best Practices

### 1. Token Handling
```typescript
// Good - Secure token storage
const token = authManager.generateToken(data);
res.setHeader('Authorization', `Bearer ${token}`);

// Bad - Insecure
localStorage.setItem('token', token); // XSS vulnerable
```

### 2. Session Management
```typescript
// Good - Automatic cleanup
authManager.cleanupInactiveSessions(30);

// Bad - No cleanup
// Session accumulates, memory leak
```

### 3. Role Verification
```typescript
// Good - Always check role
if (req.role !== 'admin') {
  return res.status(403).json({ message: 'Forbidden' });
}

// Bad - No verification
// Anyone could access admin routes
```

---

## 🧪 Testing Utilities

### Mock Token Generation

```typescript
const mockToken = authManager.generateToken({
  userId: 'test-user-123',
  sessionId: 'test-session-456',
  role: 'user'
});
```

### Mock Session Creation

```typescript
const mockSession = authManager.createSession('test-user-123', {
  ipAddress: '127.0.0.1',
  userAgent: 'Test Agent'
});
```

---

## 📊 Performance

### Logging Performance
- Async writes - Non-blocking
- Minimal overhead - ~1-2ms per log
- Batch writes - Group small logs
- Log rotation - Prevent disk bloat

### Auth Performance
- Token generation - ~5ms
- Token verification - ~2ms
- Session lookup - ~1ms (cached)
- Session cleanup - Runs every 5 minutes

---

## 🐛 Common Issues

### Issue: Token Expired
```
Error: Token verification failed
Solution: Regenerate token on login
```

### Issue: Session Not Found
```
Error: Session ID not found
Solution: Create new session or login again
```

### Issue: Log File Growing Too Large
```
Error: Disk space issue
Solution: Configure log rotation
```

---

## 📚 Integration Points

### Server Entry Point
- Initializes logger
- Sets up auth manager
- Starts cleanup interval

### Middleware Stack
- Logging middleware logs all requests
- Auth middleware verifies tokens
- Error middleware logs errors

### Route Handlers
- Use logger for audit trail
- Use authManager for role checks
- Log all important operations

---

**Utils Documentation Version:** 1.0  
**Last Updated:** December 1, 2025
