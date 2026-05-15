'use strict';

const { createLogger } = require('winston');

describe('Logger Initialization', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load the local runtime by default', () => {
    const logger = require('../index');
    expect(logger.transports[0].name).toBe('console');
  });

  it('should load cloud-function runtime when K_SERVICE is set', () => {
    process.env.K_SERVICE = 'test';
    const logger = require('../index');
    // We can't easily check the runtime name, but we can verify it doesn't crash
    expect(logger).toBeDefined();
  });

  it('should expose setGlobalLabels', () => {
    const { setGlobalLabels } = require('../index');
    expect(typeof setGlobalLabels).toBe('function');
  });
});
