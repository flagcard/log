import { formatToTimeZone } from 'date-fns-timezone';
import winston from 'winston';
import 'winston-daily-rotate-file';

const timeZone = 'America/Manaus';

const format = winston.format.printf(({ level, message, timestamp }) => {
  const localDate = formatToTimeZone(timestamp, 'MMM DD, YYYY @ HH:mm:ss', {
    timeZone,
  });

  return `[${localDate}]-[${level.toLowerCase()}]: ${message}`;
});

const transports = [];

transports.push(new winston.transports.Console({ format }));

if (process.env.FLAGCARD_WRITE_LOG) {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYYMMDDHH',
      maxSize: '1m',
      maxFiles: '2d',
    }),
  );
}

export default winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), format),
  transports,
});
