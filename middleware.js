const log = require('./src/logger');

module.exports = {
  infoLogMiddleware: (req, res, next) => {
    if (req.token && req.token.sub) {
      log.info(`logged with ${req.token.sub} from ${req.token.iss} to ${req.token.aud}`);
    }
    next();
  },
  errorLogMiddleware: (err, req, res, next) => {
    let error;
    try {
      error = JSON.stringify(err);
    } catch (e) {
      error = JSON.stringify(err.stack);
    }
    log.error(`something went wrong in asgard: ${error}`);
    next(err);
  },
};
