const winston = require('winston');
const transport = require('./transports');
const format = require('./format');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    format,
  ),
  transports: [],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(transport.info());
  logger.add(transport.error());
} else {
  logger.add(transport.console()(format));
}

module.exports = logger;
