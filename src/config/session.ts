import { SessionConfiguration } from "alapa";

// Session configuration
export const sessionConfig: SessionConfiguration = {
  secret: "your-session-secret",
  expiresIn: "1h",
  storage: "redis",
  redisConfig: {
    host: "localhost",
    port: 6379,
    password: "password",
  },
  secure: true,
  sameSite: "lax",
};
