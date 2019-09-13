const { errorLogMiddleware } = require('../../src/flagcard/logger');

describe('Midleware', () => {
  it('Log format structure for error level', () => {
    errorLogMiddleware({ err: 'error message' }, null, null, () => {});
  });
});
