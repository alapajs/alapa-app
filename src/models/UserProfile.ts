import {
  Model,
  NullColumn,
  OneToOne,
  PrimaryColumn,
  TableModel,
  TextColumn,
} from "alapa";
import { Users } from "./Users";

@TableModel()
export class UserProfile extends Model {
  @PrimaryColumn("uuid")
  id: string;

  @NullColumn()
  firstName: string;

  @NullColumn()
  lastName: string;

  @NullColumn()
  middleName: string;

  @NullColumn()
  gender: string;

  @NullColumn()
  country: string;

  @NullColumn()
  address: string;

  @NullColumn()
  profilePicture: string;

  @NullColumn()
  dateOfBirth: Date;

  @NullColumn()
  socialMediaLinks: string;

  @TextColumn()
  aboutYourself: string;

  @NullColumn()
  websiteUrl: string;

  @NullColumn()
  lastActivityAt: Date;

  @NullColumn()
  isVIP: boolean;

  @NullColumn()
  status: string; // active, suspended, etc.

  @TextColumn()
  blockReason: string;

  /** RELATION */
  @OneToOne(() => Users, (u) => u.profile)
  user: Users;
}
