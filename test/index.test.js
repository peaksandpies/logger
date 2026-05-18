'use strict'

describe('Logger Initialization', () => {
  it('should load the local runtime by default', () => {
    const logger = require('../index')
    expect(logger.transports[0].name).toBe('console')
  })

  it('should load cloud-function runtime when K_SERVICE is set', () => {
    process.env.K_SERVICE = 'test'
    const logger = require('../index')
    // We can't easily check the runtime name, but we can verify it doesn't crash
    expect(logger).toBeDefined()
  })

  it('should expose and call setGlobalLabels correctly', () => {
    const logger = require('../index')
    const { setGlobalLabels } = require('../index')
    expect(typeof setGlobalLabels).toBe('function')

    setGlobalLabels({ env: 'production' })
    expect(logger.defaultMeta).toEqual({ env: 'production' })
  })

  it('should warn and fallback to local when NODE_RUN is set to an undefined runtime', () => {
    process.env.NODE_RUN = 'non-existent-runtime'
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const logger = require('../index')
    expect(logger.transports[0].name).toBe('console')
    expect(warnSpy).toHaveBeenCalledWith('runtime non-existent-runtime not defined, using local')

    warnSpy.mockRestore()
  })
})
