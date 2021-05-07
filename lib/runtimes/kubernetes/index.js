'use strict'

const { format, transports } = require('winston')

const { LOG_LEVEL } = process.env

// https://gist.github.com/jasperkuperus/9df894041e3d5216ce25af03d38ec3f1#gistcomment-3290274
function preserveErrors (input) {
  const output = {}
  Object.entries(input).forEach(([key, value]) => {
    let outputValue = value
    if (value instanceof Error) {
      outputValue = {}
      Object.getOwnPropertyNames(value).forEach((errorKey) => {
        outputValue[errorKey] = value[errorKey]
      })
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
      outputValue = preserveErrors(value)
    }

    output[key] = outputValue
  })
  return output
}

const SeverityLookup = {
  default: 'DEFAULT',
  silly: 'DEFAULT',
  verbose: 'DEBUG',
  debug: 'DEBUG',
  http: 'NOTICE',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
}

// add severity level for GCP stackdriver
// cf https://github.com/googleapis/nodejs-logging-winston/issues/386#issuecomment-602195498
const stackdriverSeverityFormat = format((info) => ({
  ...info,
  severity: SeverityLookup[info.LEVEL] || SeverityLookup.default,
}))

const errorsPreserverFormat = format((info) => {
  // we spread the original `info` too in order to preserve the keys behind Symbols (i.e. splat/level)
  return {
    ...info,
    ...preserveErrors(info),
  }
})

const formatters = [format.timestamp(), stackdriverSeverityFormat(), errorsPreserverFormat(), format.json()]

const loggingWinston = new transports.Console({
  format: format.combine(...formatters),
  stderrLevels: ['error'],
})

const logConfig = {
  level: LOG_LEVEL || 'info',
  transports: [
    loggingWinston,
  ],
}

module.exports = logConfig
