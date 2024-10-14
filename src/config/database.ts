import {
  DatabaseConnection,
  DatabaseConnectionList,
  toAbsolutePath,
} from "alapa";

const entities =
  process.env.DEBUG_MODE == "true"
    ? [toAbsolutePath("dist", "models/**/*.js")]
    : ["dist/models**/*.js"];

const migrations =
  process.env.DEBUG_MODE == "true"
    ? ["migration/**/*.ts"]
    : ["migration/**/*.js"];

const sqliteConnection: DatabaseConnection = {
  type: "sqlite",
  database: toAbsolutePath("database.db"),
  synchronize: true,
  entities: entities,
  migrations: migrations,
  logging: false,
};

const connections: DatabaseConnectionList = {
  sqlite: sqliteConnection,
};

export const database =
  connections[process.env.DATABASE_CONNECTION || "sqlite"];
