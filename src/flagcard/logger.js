const apm = require('elastic-apm-node');
const moment = require('moment-timezone');
const winston = require('winston');

const timezone = 'America/Manaus';

const start = (serviceName) => {
  const options = {
    serviceName,
    serverUrl: 'http://10.136.211.90:9202',
  };
  apm.start(options);
};

const format = winston.format.printf(({ level, message, timestamp }) => {
  const localDate = moment(timestamp).tz(timezone).format('YYYY-MM-SS HH:mm:ss');
  return `[${level.toUpperCase()}]-[${localDate}}]: ${message}\n`;
});


const transport = new winston.transports.Console({
  format,
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    format,
  ),
  transports: [transport],
});

const errorLogMiddleware = (err, req, res, next) => {
  let error;
  try {
    if (err.message && Object.keys(err.message).length) {
      error = JSON.stringify(err.message);
    } else if (err.stack && Object.keys(err.stack).length) {
      error = JSON.stringify(err.stack);
    } else if (err.data && Object.keys(err.data).length) {
      error = JSON.stringify(err.data);
    } else {
      error = JSON.stringify(err);
    }
  } catch (e) {
    error = 'Não foi possível decodificar o erro.';
  }
  logger.error(`something went wrong in asgard: ${error}`);
  next(err);
};

module.exports = {
  start,
  log: logger,
  errorLogMiddleware,
};
