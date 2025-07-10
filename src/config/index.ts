import { serverConfig } from "./server";
import { database } from "./database";
import { loggerConfig } from "./logger";
import { emailConfig } from "./email";
import { jwtConfig } from "./jwt";
import { sessionConfig } from "./session";
import { securityConfig } from "./security";
import { cacheConfig } from "./cache";
import { middlewareConfig } from "./middleware"; // Import middleware configuration
import { Configuration } from "alapa";
import { authConfig } from "./auth";
import { apiConfig } from "./api";
import { appConfig } from "./application";
import { encryptionConfig } from "./encryption";
import { templateEngineConfig } from "./template-engine";
import { storage } from "./storage";

export const config: Configuration = {
  server: serverConfig,
  templateEngine: templateEngineConfig,
  database: database,
  logger: loggerConfig,
  email: emailConfig,
  jwt: jwtConfig,
  auth: authConfig,
  session: sessionConfig,
  security: securityConfig,
  cache: cacheConfig,
  middleware: middlewareConfig,
  application: appConfig,
  api: apiConfig,
  encryption: encryptionConfig,
  storage: storage,
};
