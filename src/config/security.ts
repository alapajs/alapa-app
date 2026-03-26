import { SecurityConfiguration } from "alapa";

// Security configuration
export const securityConfig: SecurityConfiguration = {
  csrfTokenName: process.env.CSRF_TOKEN_NAME || "X-CSRF-Token",
  xssProtection: process.env.XSS_PROTECTION === "true",
  frameOptions: (process.env.FRAME_OPTIONS as "DENY" | "SAMEORIGIN") || "DENY",
  contentSecurityPolicy:
    process.env.CONTENT_SECURITY_POLICY || "default-src 'self';",
  hsts: process.env.HSTS === "true",
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
    max: Number(process.env.RATE_LIMIT_MAX) || 100, // 100 requests per minute
    whitelist: process.env.RATE_LIMIT_WHITELIST?.split(",") || ["127.0.0.1"],
  },
};
