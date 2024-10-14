import { CacheConfiguration } from "alapa";

export const cacheConfig: CacheConfiguration = {
  driver: "redis", // Use Redis as the caching driver
  ttl: 3600, // Cache items will expire after 1 hour (3600 seconds)
  redisConfig: {
    host: "localhost", // Redis server hostname
    port: 6379, // Redis server port
    password: "your_redis_password", // Optional: Redis server password
  },
  memcachedConfig: {
    servers: ["127.0.0.1:11211"], // List of Memcached server addresses
    options: {
      retries: 10, // Number of retries on failure
      retry: 10000, // Time between retries in milliseconds
      remove: true, // Remove stale items automatically
    },
  },
  clearOnStartup: true, // Clear cache when the server starts up
};
