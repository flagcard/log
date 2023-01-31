import { createLogger, format, transports } from 'winston';

export default createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Console({ format: format.json() })],
});
