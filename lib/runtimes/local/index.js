const { format, transports, addColors } = require('winston')
const { combine, printf, timestamp, colorize, errors } = format
const { handleMessage } = require('../../helper')

const { LOG_LEVEL } = process.env

// we need to pre format the upperCase as this wont work after colorize
const logPreFormat = printf((info) => {
  info.level = info.level.toUpperCase()
  let args = info[Symbol.for('splat')]
  info.message = handleMessage(info.level, info.message, args)
  return info
})

const logFormat = printf((info) => {
  let meta = `${info.timestamp} - ${info.level}`
  let message = info.stack || info.message
  return `${meta} -- ${message}`
})

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'white',
  verbose: 'white',
  debug: 'white',
  silly: 'white',
}
addColors(logColors)

const logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), logPreFormat, colorize(), timestamp(), logFormat),
  transports: [new transports.Console()],
}

module.exports = logConfig
