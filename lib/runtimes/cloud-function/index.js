const { format, transports } = require('winston');
const { combine, printf, timestamp } = format;
const { handleMessage } = require('../../helper');

const { LOG_LEVEL } = process.env;

const logFormat = printf((info) => {
  let args = info[Symbol.for('splat')];
  const log = {
    severity: info.level,
    timestamp: info.timestamp,
    message: handleMessage(info.level, info.message, args),
  };
  if (info.jobMeta) {
    log.jobMeta = info.jobMeta;
  }
  return JSON.stringify(log);
});

const logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(timestamp(), logFormat),
  transports: [new transports.Console()],
};

module.exports = logConfig;
