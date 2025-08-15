'use strict'
const { createLogger } = require('winston')
const runtime = process.env.NODE_RUN || 'local'

let logConfig
try {
  logConfig = require(`./lib/runtimes/${runtime}`)
} catch {
  console.log(`runtime ${runtime} not defined, using local`)
  logConfig = require('./lib/runtimes/local')
}

const logger = createLogger(logConfig)
module.exports = logger
