import {
  randomMd5,
  RedisSessionStore,
  MemorySessionStore,
  SessionConfiguration,
  DatabaseSessionStore,
  AnyObject,
} from "alapa";
const sessionStore: AnyObject = {
  memory: MemorySessionStore,
  redis: RedisSessionStore,
  database: DatabaseSessionStore,
};

// Session configuration
export const sessionConfig: SessionConfiguration = {
  secret: process.env.ENCRYPTION_KEY || randomMd5(),
  store: sessionStore[process.env.SESSION_STORE || "database"],
};
