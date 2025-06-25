import {
  AuthenticatableModel,
  ConditionalFieldKey,
  FormattedField,
  FormattedFieldMethod,
  ModelFormattedField,
  ModelIncludeFieldsMethod,
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

  @FormattedField<Users, "year">(testEM)
  @ShortDateColumn("year")
  year: number;

  formatId() {
    return 2030;
  }

  @FormattedFieldMethod<Users, "email">("email")
  formatMoth() {
    return "this is the email";
  }

  protected setIncludeFields(): ModelIncludeFieldsMethod<Users>[] {
    return ["firstName", "email", "lastName", "year"];
  }

  // protected includeFields: ConditionalFieldKey<Users>[] = [
  //   "firstName",
  //   "lastName",
  //   "aboutYourself",
  // ];

  protected formattedFields: ModelFormattedField<Users> = {
    aboutYourself: () =>
      `My Name is ${this.firstName} ${this.lastName} a Developer`,
    firstName: () => this.firstName + " My First Name",
  };
  protected fillableFields: ConditionalFieldKey<Users>[] = ["*", "email"];
}
function testEM(data: number) {
  return 4000;
}
