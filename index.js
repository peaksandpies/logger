'use strict'
const { createLogger } = require('winston')
const { detectRuntime } = require('./lib/helper')

const runtime = detectRuntime()

let logConfig
try {
  logConfig = require(`./lib/runtimes/${runtime}`)
} catch {
  if (process.env.NODE_RUN) {
    console.warn(`runtime ${runtime} not defined, using local`)
  }
  logConfig = require('./lib/runtimes/local')
}

const logger = createLogger(logConfig)

const setGlobalLabels = (labels) => {
  logger.defaultMeta = labels
}

module.exports = logger
module.exports.setGlobalLabels = setGlobalLabels
module.exports.default = logger
