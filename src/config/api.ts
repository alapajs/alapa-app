import { APIConfiguration } from "alapa";

export const apiConfig: APIConfiguration = {
  docs: {
    schemasDir: process.env.DOCS_SCHEMAS_DIR || "docs/schemas",
    path: process.env.DOC_PATH || "/docs",
    sync: process.env.SYNC_DOCS === "true",
    openapiDefinitionFile: "openapi.json",
    openApiDefinitions: {
      openapi: "3.0.1",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation for Alapa Project.",
      },
      components: {
        securitySchemes: {
          BasicAuth: {
            type: "http",
            scheme: "basic",
          },
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
          ApiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "X-API-KEY",
          },
        },
      },
    },
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per window
    headers: true, // Include rate limit headers in responses
  },
  cors: {
    origin: ["https://example.com", "https://anotherdomain.com"], // Allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials
  },
  versioning: {
    enabled: true, // Enable API versioning
    defaultVersion: "v1", // Default API version
    parameter: "header", // Check for version in headers
  },
};
