const { createLogger } = require('winston')
const { NODE_RUN } = process.env

let logConfig
try {
  logConfig = require(`./lib/runtime/${NODE_RUN}`)
} catch (err) {
  console.log(`runtime ${NODE_RUN} not defined, using local`)
  logConfig = require(`./lib/runtime/local`)
}
const logger = createLogger(logConfig)

module.exports = logger