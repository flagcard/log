import tracer from './implementations/tracer/tracer.logger';

process.on('uncaughtException', (error: Error) => {
  tracer.error(error);
});

export default tracer;
