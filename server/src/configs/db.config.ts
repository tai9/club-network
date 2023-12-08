import { DataSource } from "typeorm";
import logger from "../utils/logger";
import dataSourceOptions from "./orm.config";

export const AppDataSource = new DataSource(dataSourceOptions);

export const getDbConnection = async () => {
  // to initialize the initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap
  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      logger.info(`Connected to DB ${process.env.POSTGRES_DATABASE}`);
    })
    .catch((error) => {
      logger.error(
        `Connect to ${process.env.POSTGRES_DATABASE} DB error`,
        error
      );

      throw error;
    });
};
