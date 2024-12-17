import {
  DatabaseConfiguration,
  DataSource,
  Logger,
  SnakeNamingStrategy,
  updateDBConnection,
} from "alapa";
import { databaseConnection } from "../src/config/database";
require("dotenv").config();
const entities = ["src/models/**/*.ts"];
const migration = ["migrations/**/*.ts"];
let dataSource: DataSource = new DataSource({
  migrations: migration,
  entities: entities,
  ...databaseConnection,
  namingStrategy: new SnakeNamingStrategy(),
});
(async function () {
  const config: DatabaseConfiguration = {
    logging: process.env.DB_LOGGING === "true",
    connection: databaseConnection,
  };
  dataSource = await updateDBConnection(config);
  Logger.success("Database Connection established successfully");
})();

export default dataSource;
