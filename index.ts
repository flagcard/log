import logger from './src/flagcard/logger';

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
});

export default logger;
