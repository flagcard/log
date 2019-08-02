const log = require('./src/logger');

module.exports = {
  infoLogMiddleware: (req, res, next) => {
    if (req.token && req.token.sub) {
      log.info(`logged with ${req.token.sub} from ${req.token.iss} to ${req.token.aud}`);
    }
    next();
  },
  errorLogMiddleware: (err, req, res, next) => {
    log.error(`something went wrong in asgard: ${JSON.stringify(err)}`);
    next(err);
  },
};
