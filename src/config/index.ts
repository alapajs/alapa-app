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
import { appConfig } from "./apllication";
import { encryptionConfig } from "./encryption";
import { viewConfig } from "./view";

export const config: Configuration = {
  server: serverConfig,
  view: viewConfig,
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
};
