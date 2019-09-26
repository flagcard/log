const moment = require('moment-timezone');
const winston = require('winston');
require('winston-daily-rotate-file');

const timezone = 'America/Manaus';

const format = winston.format.printf(({ level, message, timestamp }) => {
  const localDate = moment(timestamp).tz(timezone).format('HH:mm:ss');
  return `[${level.toUpperCase()}-${localDate}]: ${message}`;
});

const transports = [];

transports.push(new winston.transports.Console({
  colorize: true,
  format,
}));

if (process.env.NODE_ENV === 'production') {
  transports.push(new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }));
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    format,
  ),
  transports,
});

module.exports = logger;
