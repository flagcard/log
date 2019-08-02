const moment = require('moment');
const { format } = require('winston');

module.exports = format
  .printf(({ level, message, timestamp }) => `[${level.toUpperCase()}]-[${moment(timestamp).format('YYYY-MM-SS HH:mm:ss')}]: ${message}`);
