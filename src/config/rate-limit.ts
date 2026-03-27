import { loginLimiter, otpLimiter } from "../middleware/limit/login";
import { RateLimitConfiguration } from "alapa";

export const rateLimitConfig: RateLimitConfiguration = {
  global: [],
  routeSpecific: {
    "/login": [loginLimiter],
    "/otp": [otpLimiter],
  },
  enable: true,
};
