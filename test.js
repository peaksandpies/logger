const logger = require('./index.js')
let cnt = 10
for (let i = 0; i < cnt; i++) {
  logger.info(`run ${i}`, { test: true, meta: 'test' }, 7)
}
logger.error('warp nacelles offline')
logger.info('shields at 99%', { test: true, meta: 'test' }, 7)
logger.debug('debug')
logger.warn('warn')
logger.verbose('verbose')
logger.silly('silly')

const { setGlobalLabels } = require('./index.js')

const logMeta = {
  jobId: 'abc-123',
}
setGlobalLabels({ jobMeta: logMeta })
cnt = 10
for (let i = 0; i < cnt; i++) {
  logger.info(`run ${i}`, { test: true, meta: 'test' }, 7)
}
logger.error('warp nacelles offline')
logger.info('shields at 99%', { test: true, meta: 'test' }, 7)
logger.debug('debug')
logger.warn('warn')
logger.verbose('verbose')
logger.silly('silly')
