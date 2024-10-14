import { AutConfiguration } from "alapa";
import { Users } from "../models/user";

export const authConfig: AutConfiguration = {
  resetTokenExpiresMinute: Number(process.env.RESET_TOKEN_EXPIRES_MINUTE || 5),
  authenticatableModel: Users,
};
