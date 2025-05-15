import { LoggerConfiguration } from "alapa";

// Logger configuration
export const loggerConfig: LoggerConfiguration = {
  level: "info",
  output: "console",
  filePath: "/var/log/app.log",
  format: "text",
  maxFileSize: "10MB",
  maxFiles: 5,
  requestLogType: process.env.REQUEST_LOG_TYPE || "basic",
};
