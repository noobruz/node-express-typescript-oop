import { existsSync, mkdirSync } from "fs";
import path, { join } from "path";
import winston from "winston";
import { LOG_DIR } from "../config";
import { fileURLToPath } from 'url';

const dir: string = join(__dirname, LOG_DIR!);

if (!existsSync(dir)) {
    mkdirSync(dir);
}
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
);
const custformat = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // Tell Winston that the logs must be colored
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console({
        format,
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        dirname: dir,
        filename: 'error.log',
        level: 'error',
        format: custformat,
    }),
    // Allow to print all the error message inside the all.log file
    // (also the error log that are also printed inside the error.log(
    new winston.transports.File({
        dirname: dir,
        format: custformat,
        filename: 'all.log',
    }),

];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});
const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
    },
};

export {
    logger,
    stream
};