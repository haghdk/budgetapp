const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat),
        }),

        new DailyRotateFile({
            filename: "logs/app-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
            zippedArchive: true,
        }),
    ],
});

if (process.env.NODE_ENV === "production") {
    logger.add(
        new transports.Console({
            level: "error",
            format: combine(colorize(), logFormat),
        })
    );
}

module.exports = logger;
