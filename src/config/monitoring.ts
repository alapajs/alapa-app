import { MonitoringConfiguration } from "alapa";

export const monitoringConfig: MonitoringConfiguration = {
  enabled: process.env.MONITORING_ENABLED === "true",
  endpoint: process.env.MONITORING_ENDPOINT || "/metrics",
  metrics: process.env.METRICS_ENABLED === "true",
  uptimeCheckInterval: Number(process.env.UPTIME_CHECK_INTERVAL) || 60000,
};
