import tracer from 'dd-trace';
import winston from 'winston';
import 'winston-daily-rotate-file';

tracer.init({
  logInjection: true,
});

const addAppNameFormat = winston.format((info) => info);

const transports = [];

transports.push(
  new winston.transports.Console({
    format: winston.format.combine(addAppNameFormat(), winston.format.json()),
  }),
);

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
  exitOnError: false,
  format: winston.format.combine(addAppNameFormat(), winston.format.json()),
  transports,
});
