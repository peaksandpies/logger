const { createLogger } = require('winston')
const { NODE_RUN } = process.env

console.log(`NODE_RUN ${NODE_RUN}`)
let logConfig
try {
  logConfig = require(`./lib/runtime/${NODE_RUN}`)
} catch (err) {
  console.log(err)
  logConfig = require(`./lib/runtime/local`)
}

const logger = createLogger(logConfig);

module.exports = logger
