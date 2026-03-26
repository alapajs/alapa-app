import { NumberOnly, SchedulerCongratulation } from "alapa";

export const schedulerConfig: SchedulerCongratulation = {
  timezone: process.env.TIMEZONE || "Africa/Lagos",
  cronJobs: {
    backup: process.env.BACKUP_CRON || "0 0 * * *",
  },
  maxConcurrency: NumberOnly(process.env.MAX_CONCURRENCY) || 50,
};
