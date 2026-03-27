import { RateLimit } from "alapa";

export const loginLimiter = RateLimit.auth();

export const otpLimiter = RateLimit.auth({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 3, // Recommended: 5-10 attempts per window
  message: "Too many attempts. Try again later.",
});
