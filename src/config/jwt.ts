import { JWTConfiguration } from "alapa";

// JWT configuration
export const jwtConfig: JWTConfiguration = {
  secret: "your-secret-key",
  expiresAt: 60,
  algorithm: "HS256",
  refreshSecret: "your-refresh-secret-key",
  refreshExpiresIn: "7d",
  issuer: "myapp",
  audience: "myapp-users",
};
