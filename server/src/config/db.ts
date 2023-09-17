import { Sequelize } from "sequelize";
import env from "./env";

const db = new Sequelize(
  env?.DB_DATABASE_NAME!,
  env?.DB_USERNAME!,
  env?.DB_PASSWORD,
  {
    host: env?.DB_HOST,
    port: parseInt(env?.DB_PORT!),
    dialect: "mysql",
  }
);

export default db;
