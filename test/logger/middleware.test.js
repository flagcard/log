const log = require('../../middleware');

describe('Log', () => {
  it('Log infoLogMiddleware with token', () => {
    const token = {
      sub: '98df775c-317f-41c8-9fec-bd73e1947e79',
      iss: 'bifrost',
      aud: 'thor',
    };
    log.infoLogMiddleware({ token }, null, () => {});
  });
  it('Log format structure for error level', () => {
    log.errorLogMiddleware({ err: 'error message' }, null, null, () => {});
  });
});
