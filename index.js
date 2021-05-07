'use strict'

const { createLogger } = require('winston')
const runtime = process.env.NODE_RUN || 'local'
const logModule = `./lib/runtimes/${runtime}`
const logConfig = require(logModule)

// try {
//   logConfig = require(`./lib/runtimes/${runtime}`)
// } catch (err) {
//   console.log(`runtime ${runtime} not defined, using local`)
//   logConfig = require(`./lib/runtimes/local`)
// }

const logger = createLogger(logConfig)

module.exports = logger
