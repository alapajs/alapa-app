import {
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  NullColumn,
  Model,
  TableModel,
  PrimaryColumn,
  IAuthenticatableFields,
} from "alapa";
import { UserProfile } from "./UserProfile";
import { UserSettings } from "./UserSettings";

@TableModel()
export class Users extends Model implements IAuthenticatableFields {
  @PrimaryColumn("uuid")
  id: string;

  @NullColumn({ unique: true })
  username: string;

  @NullColumn({ unique: true })
  email: string;

  @NullColumn({ default: false })
  emailVerified: boolean;

  @NullColumn()
  password: string;

  @NullColumn()
  loginToken: string;

  @NullColumn()
  resetToken: string;

  @NullColumn()
  resetTokenExpiresTime: string;

  @NullColumn({ unique: true })
  phoneNumber: string;

  @NullColumn({ default: "user" })
  role: string;

  @NullColumn({ default: true })
  isActive: boolean;

  @NullColumn()
  lastLoginAt: Date;

  @NullColumn()
  failedLoginAttempts: number;

  @NullColumn()
  lockoutExpiresAt: Date;

  @NullColumn()
  loginMethod: string;

  @NullColumn()
  externalAuthProvider: string;

  @NullColumn()
  externalAuthId: string;

  @NullColumn()
  referralCode: string;

  @NullColumn()
  referredBy: string;

  @NullColumn()
  isVerified: boolean;

  @NullColumn()
  accountVerificationStatus: string;

  @NullColumn()
  accountLockedUntil: Date;

  @NullColumn({ default: "personal" })
  accountType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /** RELATIONS */
  @OneToOne(() => UserProfile, (p) => p.user, { cascade: true })
  @JoinColumn()
  profile: UserProfile;

  @OneToOne(() => UserSettings, (s) => s.user, { cascade: true })
  @JoinColumn()
  settings: UserSettings;
}
