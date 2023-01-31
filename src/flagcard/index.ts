import loggerWithoutTracer from './logger';
import loggerTracer from './logger-tracer';

const logger = {
  options: {
    loggerTracer,
    loggerWithoutTracer,
  },
};

export default logger;
