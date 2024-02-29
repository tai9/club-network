import { DataSourceOptions } from "typeorm";
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
  Notification,
} from "../entities";
import "dotenv/config";

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: true,
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
    Notification,
  ],
  extra: {
    connectionLimit: 20,
    trustServerCertificate: true,
  },
  migrations: ["./src/migrations/*{.ts,.js}"],
  migrationsRun: true,
  migrationsTableName: "custom_migration_table",
};

export default dataSourceOptions;
