const { format } = require('winston')
const { printf } = format
const { LoggingWinston } = require('@google-cloud/logging-winston')
const { handleMessage } = require('../../helper')

const loggingWinston = new LoggingWinston()
const { LOG_LEVEL } = process.env

const logFormat = printf((info) => {
  let args = info[Symbol.for('splat')]
  info.message = handleMessage(info.level, info.message, args)
  return info
})

const logConfig = {
  level: LOG_LEVEL || 'info',
  format: logFormat,
  transports: [loggingWinston],
}

module.exports = logConfig
