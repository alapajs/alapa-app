import { AuthenticatableModel, ShortDateColumn, TableModel } from "alapa";

@TableModel()
export class Users extends AuthenticatableModel {
  @ShortDateColumn("day")
  day: number;

  @ShortDateColumn("month")
  month: number;

  @ShortDateColumn("year")
  year: number;
}
