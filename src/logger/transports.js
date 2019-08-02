const { transports } = require('winston');
require('winston-daily-rotate-file');

const error = () => new (transports.DailyRotateFile)({
  filename: 'log/error-%DATE%.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '30d',
});

const info = () => new (transports.DailyRotateFile)({
  filename: 'log/info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '5d',
});

const console = () => format => new transports.Console({
  format,
});

module.exports = {
  error,
  info,
  console,
};
