import { Model, NullColumn, OneToOne, PrimaryColumn, TableModel } from "alapa";
import { Users } from "./Users";

@TableModel()
export class UserSettings extends Model {
  @PrimaryColumn("uuid")
  id: string;
  // Security
  @NullColumn()
  isTwoFactorEnabled: boolean;

  @NullColumn()
  otpSecret: string;

  @NullColumn()
  twoFactorRecoveryCodes: string;

  @NullColumn()
  lastPasswordChangeAt: Date;

  // Preferences
  @NullColumn()
  languagePreference: string;

  @NullColumn()
  timezone: string;

  @NullColumn()
  preferredContactMethod: string;

  @NullColumn()
  subscriptionStatus: string;

  @NullColumn()
  subscriptionPlan: string;

  // Notifications
  @NullColumn()
  isEmailNotificationsEnabled: boolean;

  @NullColumn()
  pushNotificationsEnabled: boolean;

  @NullColumn()
  phoneOptIn: boolean;

  @NullColumn()
  emailOptIn: boolean;

  @NullColumn()
  marketingOptIn: boolean;

  @NullColumn()
  mobileAppInstalled: boolean;

  @NullColumn()
  lastNotificationSeenAt: Date;

  // Legal
  @NullColumn()
  termsAcceptedAt: Date;

  @NullColumn()
  privacyPolicyAcceptedAt: Date;

  // Support
  @NullColumn()
  feedbackGiven: boolean;

  @NullColumn()
  customerSupportTicketCount: number;

  /** RELATION */
  @OneToOne(() => Users, (u) => u.settings)
  user: Users;
}
