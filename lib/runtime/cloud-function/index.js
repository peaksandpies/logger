const { format, transports } = require('winston')
const { combine, printf, timestamp } = format
const { LOG_LEVEL } = process.env

const logFormat = printf(info => {
  info.severity = info.level
  info.timestamp
  delete info.level
  return JSON.stringify(info)
})

logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(format.splat(), timestamp(), logFormat),
  transports: [
    new transports.Console(),
  ],
}

module.exports = logConfig