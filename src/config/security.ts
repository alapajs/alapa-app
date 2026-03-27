import { SecurityConfiguration } from "alapa";

// Security configuration
export const securityConfig: SecurityConfiguration = {
  csrfTokenName: process.env.CSRF_TOKEN_NAME || "X-CSRF-Token",
  xssProtection: process.env.XSS_PROTECTION === "true",
  frameOptions: (process.env.FRAME_OPTIONS as "DENY" | "SAMEORIGIN") || "DENY",
  contentSecurityPolicy:
    process.env.CONTENT_SECURITY_POLICY || "default-src 'self';",
  hsts: process.env.HSTS === "true",
};
