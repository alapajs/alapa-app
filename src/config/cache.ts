import { CacheConfiguration } from "alapa";

export const cacheConfig: CacheConfiguration = {
  driver: "redis", // Use Redis as the caching driver
  ttl: 3600, // Cache items will expire after 1 hour (3600 seconds)
  redisConfig: {
    host: process.env.REDIS_HOST || "localhost", // Redis server hostname
    port: Number(process.env.REDIS_PORT) || 6379, // Redis server port
    password: process.env.REDIS_PASSWORD || "password", // Optional: Redis server password
  },
  memcachedConfig: {
    servers: ["127.0.0.1:11211"], // List of Memcached server addresses
    options: {
      retries: Number(process.env.MEMCACHED_RETRIES) || 10, // Number of retries on failure
      retry: Number(process.env.MEMCACHED_RETRY) || 10000, // Time between retries in milliseconds
      remove: process.env.MEMCACHED_REMOVE === "true", // Remove stale items automatically
    },
  },
  clearOnStartup: process.env.CLEAR_ON_STARTUP === "true", // Clear cache when the server starts up
};
