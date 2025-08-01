const { DataSource, SnakeNamingStrategy } = require("alapa");
const { database } = require("../dist/config/database");
require("dotenv").config();

const entities = ["dist/models/**/*.js"];
const migrations = ["migrations/**/*.js"];

const {
  connection,
  removeNullValuesFromIncludesAExcludeFields,
  preventSilentlyDiscardingAttributes,
  ...restConfig
} = database;

const dataSource = new DataSource({
  logging: process.env.DB_LOGGING === "true",
  migrations: migrations,
  entities: entities,
  namingStrategy: new SnakeNamingStrategy(),
  ...connection,
  ...restConfig,
});

module.exports = dataSource;
