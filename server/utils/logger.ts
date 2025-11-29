import fs from "fs";
import path from "path";
import { createWriteStream } from "fs";

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "AUTH" | "API";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
  data?: any;
  duration?: number;
  userId?: number;
  ip?: string;
  statusCode?: number;
  path?: string;
}

class ProfessionalLogger {
  private logDir = path.join(process.cwd(), "server/logs");
  private streams: Map<LogLevel, NodeJS.WritableStream> = new Map();
  private maxFileSize = 10 * 1024 * 1024; // 10MB
  private maxFiles = 10;

  constructor() {
    this.ensureLogDirectory();
    this.initializeStreams();
  }

  private ensureLogDirectory() {
    const dirs = [
      this.logDir,
      path.join(this.logDir, "auth"),
      path.join(this.logDir, "api"),
      path.join(this.logDir, "errors"),
      path.join(this.logDir, "system"),
    ];

    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  private getLogFile(level: LogLevel): string {
    const date = new Date().toISOString().split("T")[0];
    const levelDirs: Record<LogLevel, string> = {
      AUTH: "auth",
      API: "api",
      ERROR: "errors",
      WARN: "errors",
      INFO: "system",
      DEBUG: "system",
    };

    const dir = levelDirs[level];
    return path.join(this.logDir, dir, `${level.toLowerCase()}-${date}.log`);
  }

  private initializeStreams() {
    const levels: LogLevel[] = ["INFO", "WARN", "ERROR", "DEBUG", "AUTH", "API"];
    levels.forEach((level) => {
      const logFile = this.getLogFile(level);
      const stream = createWriteStream(logFile, { flags: "a" });
      this.streams.set(level, stream);
    });
  }

  private rotateLogIfNeeded(logFile: string) {
    try {
      const stats = fs.statSync(logFile);
      if (stats.size > this.maxFileSize) {
        const dir = path.dirname(logFile);
        const base = path.basename(logFile, ".log");
        let rotatedFile = `${dir}/${base}.1.log`;
        let counter = 1;

        while (fs.existsSync(rotatedFile) && counter < this.maxFiles) {
          counter++;
          rotatedFile = `${dir}/${base}.${counter}.log`;
        }

        if (counter < this.maxFiles) {
          fs.renameSync(logFile, rotatedFile);
        } else {
          fs.unlinkSync(rotatedFile);
          fs.renameSync(logFile, rotatedFile);
        }
      }
    } catch (e) {
      // Ignore rotation errors
    }
  }

  private formatEntry(entry: LogEntry): string {
    return JSON.stringify(entry) + "\n";
  }

  private formatConsoleOutput(entry: LogEntry, level: LogLevel): string {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const colors: Record<LogLevel, string> = {
      INFO: "\x1b[36m", // Cyan
      WARN: "\x1b[33m", // Yellow
      ERROR: "\x1b[31m", // Red
      DEBUG: "\x1b[35m", // Magenta
      AUTH: "\x1b[32m", // Green
      API: "\x1b[34m", // Blue
    };

    const reset = "\x1b[0m";
    const color = colors[level];

    let output = `${color}${timestamp} [${level}]${reset} ${entry.source}: ${entry.message}`;

    if (entry.duration) output += ` (${entry.duration}ms)`;
    if (entry.statusCode) output += ` [${entry.statusCode}]`;
    if (entry.userId) output += ` (User: ${entry.userId})`;

    if (entry.data && Object.keys(entry.data).length > 0) {
      output += ` ${JSON.stringify(entry.data)}`;
    }

    return output;
  }

  log(
    level: LogLevel,
    source: string,
    message: string,
    options?: {
      data?: any;
      duration?: number;
      userId?: number;
      ip?: string;
      statusCode?: number;
      path?: string;
    }
  ) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      source,
      message,
      ...options,
    };

    // Console output
    console.log(this.formatConsoleOutput(entry, level));

    // File output
    const logFile = this.getLogFile(level);
    this.rotateLogIfNeeded(logFile);

    const stream = this.streams.get(level) || createWriteStream(logFile, { flags: "a" });
    stream.write(this.formatEntry(entry));

    if (!this.streams.has(level)) {
      this.streams.set(level, stream);
    }
  }

  // Convenience methods
  info(source: string, message: string, data?: any) {
    this.log("INFO", source, message, { data });
  }

  warn(source: string, message: string, data?: any) {
    this.log("WARN", source, message, { data });
  }

  error(source: string, message: string, data?: any) {
    this.log("ERROR", source, message, { data });
  }

  debug(source: string, message: string, data?: any) {
    this.log("DEBUG", source, message, { data });
  }

  auth(source: string, message: string, options?: any) {
    this.log("AUTH", source, message, options);
  }

  api(source: string, message: string, options?: any) {
    this.log("API", source, message, options);
  }

  // Deep debugging - activity tracking
  trackActivity(userId: number, action: string, details: any, ip?: string) {
    this.auth("ACTIVITY", `User ${userId}: ${action}`, {
      data: details,
      userId,
      ip,
    });
  }

  // Request tracking
  trackRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: number,
    ip?: string
  ) {
    this.api("HTTP", `${method} ${path}`, {
      statusCode,
      duration,
      userId,
      path,
      ip,
    });
  }

  // Get logs for dashboard
  getLogs(
    level?: LogLevel,
    limit: number = 100,
    userId?: number
  ): LogEntry[] {
    try {
      const levels = level ? [level] : (["AUTH", "API", "ERROR"] as LogLevel[]);
      const entries: LogEntry[] = [];

      levels.forEach((lvl) => {
        const logFile = this.getLogFile(lvl);
        if (fs.existsSync(logFile)) {
          const content = fs.readFileSync(logFile, "utf-8");
          const lines = content.split("\n").filter((l) => l.trim());

          lines.forEach((line) => {
            try {
              const entry: LogEntry = JSON.parse(line);
              if (!userId || entry.userId === userId) {
                entries.push(entry);
              }
            } catch (e) {
              // Skip malformed lines
            }
          });
        }
      });

      return entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
    } catch (e) {
      console.error("Error reading logs:", e);
      return [];
    }
  }

  // Clear old logs
  clearOldLogs(daysOld: number = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const walkDir = (dir: string) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (stat.isFile() && filePath.endsWith(".log")) {
          if (stat.mtime < cutoffDate) {
            fs.unlinkSync(filePath);
            this.info("LOGGER", `Deleted old log: ${file}`);
          }
        }
      });
    };

    walkDir(this.logDir);
  }
}

export const logger = new ProfessionalLogger();
