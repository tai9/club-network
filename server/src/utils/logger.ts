import winston from "winston";
import "winston-daily-rotate-file";
import { format } from "logform";

const isProd = process.env.NODE_ENV === "production";
// const appName = process.env.APP_NAME || "app";
const logLevel = process.env.LOG_LEVEL || "info";

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: logLevel,
    }),
  ],
};

// if (process.env.NODE_ENV != "test") {
//   // @ts-ignore
//   options.transports.push(
//     // @ts-ignore
//     new winston.transports.DailyRotateFile({
//       level: logLevel,
//       filename: `logs/${appName}-%DATE%.log`,
//       datePattern: "YYYY-MM-DD-HH",
//       zippedArchive: true,
//       maxSize: "20m",
//       maxFiles: "30d",
//     })
//   );
// }

if (!isProd) {
  options.format = format.simple();
}

const logger = winston.createLogger(options);

if (!isProd) {
  logger.debug("Logging initialized at debug level");
}

export default logger;
