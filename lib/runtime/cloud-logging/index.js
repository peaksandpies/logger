const { LoggingWinston } = require('@google-cloud/logging-winston')
const loggingWinston = new LoggingWinston()
const { LOG_LEVEL } = process.env

logConfig = {
  level: LOG_LEVEL || 'info',
  transports: [
    loggingWinston,
  ],
}

module.exports = logConfig