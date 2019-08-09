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
      if (err.message) {
        error = JSON.stringify(err.message);
      } else if (err.stack) {
        error = JSON.stringify(err.stack);
      } else {
        error = JSON.stringify(err);
      }
    } catch (e) {
      error = 'Não foi possível decodificar o erro.';
    }
    log.error(`something went wrong in asgard: ${error}`);
    next(err);
  },
};
