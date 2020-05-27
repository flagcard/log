import winston from 'winston';
import 'winston-daily-rotate-file';
import { formatToTimeZone } from 'date-fns-timezone';

const timeZone = 'America/Manaus';

const format = winston.format.printf(({ level, message, timestamp }) => {
  const localDate = formatToTimeZone(timestamp, 'HH:mm:ss', { timeZone });
  return `[${level.toLowerCase()} ${localDate}]: ${message}`;
});

const transports = [];

transports.push(
  new winston.transports.Console({
    format,
  }),
);

if(process.env.NODE_ENV === 'production'){
  transports.push(new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYYMMDDHH',
    maxSize: '1m',
    maxFiles: '2d',
  }));
}

export default winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), format),
  transports,
});
