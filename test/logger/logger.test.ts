import logger from '../../src/index';

describe('Log', () => {
  it('Log format structure for info level', () => {
    const MESSAGE = 'this is a simple INFO message';
    logger.info(MESSAGE);
  });

  it('Log format structure for error level', () => {
    const MESSAGE = 'this is a simple ERROR message';
    logger.error(MESSAGE);
  });
});
