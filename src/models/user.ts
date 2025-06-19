import {
  AfterLoad,
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
  month: number;

  @ShortDateColumn("year")
  year: number;
}
