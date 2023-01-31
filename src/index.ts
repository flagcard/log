import logger from './implementations/default/default.logger';

process.on('uncaughtException', (error: Error) => {
  logger.error(error);
});

export default logger;
export * as tracer from './implementations/tracer/tracer.logger';
