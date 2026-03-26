import { ApplicationCongratulation } from "alapa";

export const appConfig: ApplicationCongratulation = {
  appUrl: process.env.APP_URL || "https://www.exampleapp.com",
  appName: process.env.APP_NAME || "ExampleApp",
  debugMode: process.env.DEBUG_MODE === "true", // Enable debug mode for development
  timezone: process.env.TIMEZONE || "Africa/Lagos", // Default timezone
  locale: process.env.LOCALE || "en-US", // Default locale/language
  fallbackLocale: process.env.FALLBACK_LOCALE || "en", // Fallback locale if the default locale is unavailable
  maintenanceMode: process.env.MAINTENANCE_MODE === "true", // Disable maintenance mode
  allowCors: process.env.ALLOW_CORS === "true", // Enable CORS globally
  description: process.env.DESCRIPTION || "This is a Alapa Project",
};
