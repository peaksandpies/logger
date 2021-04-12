const { format, transports, addColors } = require('winston')
const { combine, printf, timestamp, colorize } = format
const { LOG_LEVEL } = process.env

// we need to pre format the upperCase as this wont work after colorize
const logPreFormat = printf(info => {
  info.level = info.level.toUpperCase()
  return info;
})

const logFormat = printf(info => {
  const meta = `${info.timestamp} - ${info.level}`
  if (info instanceof Error) {
    return `${meta} -- ${info.stack}`
  } else {
    return `${meta} -- ${info.message}`
  }
})

const logColors = { 
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'white',
  verbose: 'white',
  debug: 'white',
  silly: 'white'
}
addColors(logColors)

logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(logPreFormat, colorize(), format.splat(), timestamp(), logFormat),
  transports: [
    new transports.Console(),
  ],
}

module.exports = logConfig