import { MiddlewareConfiguration } from "alapa";

// Middleware configuration
export const middlewareConfig: MiddlewareConfiguration = {
  global: [], // Global middleware to apply on every request

  routeSpecific: {
    "/admin": [], // Middleware specific to admin routes
    "/api/*": [], // Middleware for all API routes
  },

  csrfProtection: true, // Enable CSRF protection globally
};
