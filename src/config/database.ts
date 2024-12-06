import {
  DatabaseConfiguration,
  DatabaseConnection,
  DatabaseConnectionList,
  toAbsolutePath,
} from "alapa";

const entities = ["dist/models**/*.js"];

const sqliteConnection: DatabaseConnection = {
  type: "sqlite",
  database: toAbsolutePath("database.db"),
};

const postgresConnection: DatabaseConnection = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "my_database",
  ssl: { rejectUnauthorized: process.env.DB_SSL == "true" },
};

const connections: DatabaseConnectionList = {
  sqlite: sqliteConnection,
  postgres: postgresConnection,
};
export const databaseConnection =
  connections[process.env.DATABASE_TYPE || "sqlite"];
export const database: DatabaseConfiguration = {
  synchronize: process.env.DB_SYN === "true",
  entities: entities,
  logging: process.env.DB_LOGGING === "true",
  connection: databaseConnection,
};
