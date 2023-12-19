import {
  Activity,
  Comment,
  Badge,
  Level,
  Member,
  Permission,
  PermissionCategory,
  Role,
  Post,
  Reaction,
} from "../entities";
import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: false,
  ssl: process.env.NODE_ENV === "production",
  entities: [
    Member,
    Permission,
    PermissionCategory,
    Role,
    Activity,
    Badge,
    Comment,
    Level,
    Post,
    Reaction,
  ],
  extra: {
    connectionLimit: 20,
  },
  migrations: ["./src/migrations/*{.ts,.js}"],
  migrationsRun: true,
  migrationsTableName: "custom_migration_table",
};

export default dataSourceOptions;
