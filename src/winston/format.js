const { format } = require('winston');

module.exports = format.printf(({ level, message, timestamp }) => `[${level.toUpperCase()}]-[${timestamp}]: ${message}`);
