const { format } = require('winston')
const { combine, printf, errors } = format
const { LoggingWinston } = require('@google-cloud/logging-winston')
const { handleMessage } = require('../../helper')

const loggingWinston = new LoggingWinston()
const { LOG_LEVEL } = process.env

const logFormat = printf((info) => {
  let args = info[Symbol.for('splat')]
  info.message = info.stack || handleMessage(info.level, info.message, args)
  return info
})

const logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), logFormat),
  transports: [loggingWinston],
}

module.exports = logConfig
