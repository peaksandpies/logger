const logger = require('./index.js')

let cnt = 10
for (let i = 0; i<cnt ;i++) {
  logger.info(`run ${i}`, { test: true, meta: 'test'}, 7);
}

logger.error('warp nacelles offline');
logger.info('shields at 99%', { test: true, meta: 'test'}, 7);
// logger.info(2, 'www')
logger.debug('debug');
logger.warn('warn');
logger.verbose('verbose');
logger.silly('silly');