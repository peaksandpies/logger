const logger = require('./index.js')

// logger.error('warp nacelles offline');
// logger.info('shields at 99%', { test: true, meta: 'test'});
logger.info('shields at 99%', { test: true, meta: 'test'}, 1, 2, 3, 4, 'hi', 'hey', 'ho');
logger.info('shields at 99%', 1, 2, 3, 4, 'hi', 'hey', 'ho', { test: true, meta: 'test'});
// logger.debug('debug');
// logger.warn('warn');
// logger.verbose('verbose');
// logger.silly('silly');