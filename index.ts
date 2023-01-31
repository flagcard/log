import logger from './src/flagcard';

process.on('uncaughtException', (error: Error) => {
  if (logger.options.loggerTracer) {
    logger.options.loggerTracer.error(error);
  }

  if (logger.options.loggerWithoutTracer) {
    logger.options.loggerWithoutTracer.error(error);
  }
});

export default logger;
