import { JWTConfiguration } from "alapa";

// JWT configuration
export const jwtConfig: JWTConfiguration = {
  secret: process.env.JWT_SECRET || "default-secret-key",
  expiresAt: process.env.JWT_EXPIRATION || "1h",
  algorithm: (process.env.JWT_ALGORITHM as any) || "HS256",
  refreshSecret: process.env.JWT_REFRESH_SECRET_KEY || "refresh-secret-key",
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  issuer: process.env.JWT_ISSUER || "alapa",
  audience: process.env.JWT_AUDIENCE || "alapa-app",
};
