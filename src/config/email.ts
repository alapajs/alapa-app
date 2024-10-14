import { EmailConfiguration } from "alapa";

// Email configuration
export const emailConfig: EmailConfiguration = {
  host: "smtp.mailtrap.io",
  port: 587,
  username: "user",
  password: "password",
  from: "no-reply@example.com",
  encryption: "tls",
  retryAttempts: 3,
  retryDelay: 500,
  templateEngine: "pug",
};
