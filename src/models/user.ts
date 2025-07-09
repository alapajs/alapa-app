import {
  AuthenticatableModel,
  PrimaryColumn,
  ShortDateColumn,
  TableModel,
} from "alapa";

@TableModel()
export class Users extends AuthenticatableModel {
  @PrimaryColumn("increment")
  id: number;

  @ShortDateColumn("day")
  day: number;

  @ShortDateColumn("month")
  // @FormattedField<Users, "month">(md5)
  month: number;
}
