import { MiddlewareConfiguration } from "alapa";

// Middleware configuration
export const middlewareConfig: MiddlewareConfiguration = {
  global: ["CorsMiddleware", "LoggerMiddleware", "ErrorHandlerMiddleware"], // Global middleware to apply on every request

  routeSpecific: {
    "/admin": ["AuthMiddleware", "AdminMiddleware"], // Middleware specific to admin routes
    "/api/*": ["ApiRateLimitMiddleware"], // Middleware for all API routes
  },

  csrfProtection: true, // Enable CSRF protection globally
};
