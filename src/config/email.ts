import { EmailConfiguration } from "alapa";

// Email configuration
export const emailConfig: EmailConfiguration = {
  host: process.env.EMAIL_HOST || "smtp.mailtrap.io",
  port: Number(process.env.EMAIL_PORT) || 587,
  username: process.env.EMAIL_USERNAME || "user",
  password: process.env.EMAIL_PASSWORD || "password",
  from: process.env.EMAIL_FROM || "no-reply@example.com",
  encryption: (process.env.EMAIL_ENCRYPTION as "tls" | "ssl") || "tls",
  retryAttempts: Number(process.env.RETRY_ATTEMPTS) || 3,
  templateEngine:
    (process.env.TEMPLATE_ENGINE as "pug" | "ejs" | "handlebars") || "pug",
};
