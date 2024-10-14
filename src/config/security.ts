import { SecurityConfiguration } from "alapa";

// Security configuration
export const securityConfig: SecurityConfiguration = {
  csrfTokenName: "X-CSRF-Token",
  xssProtection: true,
  frameOptions: "DENY",
  contentSecurityPolicy: "default-src 'self';",
  hsts: true,
  rateLimit: {
    windowMs: 60000, // 1 minute
    max: 100, // 100 requests per minute
    whitelist: ["127.0.0.1"],
  },
};
