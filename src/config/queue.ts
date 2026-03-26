import { QueueConfiguration } from "alapa";

export const queueConfig: QueueConfiguration = {
  driver: (process.env.QUEUE_DRIVER as "sync" | "redis") || "redis", // Queue driver (e.g., synchronous, Redis)
  redisConfig: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "password",
    url: process.env.REDIS_URL || "redis://localhost:6379",
    db: Number(process.env.REDIS_DB) || 0,
  },
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 60000, // Default timeout for queue jobs
  failedJobsTable: process.env.FAILED_JOBS_TABLE || "failed_jobs", // Table for storing failed jobs
  retryAfter: Number(process.env.RETRY_AFTER) || 60, // Retry failed jobs after specified seconds
};
