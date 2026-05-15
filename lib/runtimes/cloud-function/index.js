const { format, transports } = require('winston')
const { combine, printf, timestamp, errors } = format
const { handleMessage } = require('../../helper')

const { LOG_LEVEL } = process.env

const logFormat = printf((info) => {
  const { level, message, timestamp, jobMeta, stack, ...rest } = info
  const args = info[Symbol.for('splat')]

  let log = {
    severity: level.toUpperCase(),
    timestamp: timestamp,
    message: stack || handleMessage(level, message, args),
    metadata: jobMeta || {},
    context: rest,
  }

  // Google Labels
  log['logging.googleapis.com/labels'] = {
    revision_name: process.env.K_REVISION || 'no-rev',
    job_id: jobMeta ? jobMeta.jobId : 'none',
  }

  return JSON.stringify(log)
})

const logConfig = {
  level: LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), timestamp(), logFormat),
  transports: [new transports.Console()],
}

module.exports = logConfig
