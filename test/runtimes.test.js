'use strict';

const winston = require('winston');

describe('Runtime Formats', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('Local Runtime', () => {
    it('should format logs as plain text with timestamp', () => {
      const logConfig = require('../lib/runtimes/local');
      const logger = winston.createLogger(logConfig);
      
      // Mock transport to capture output
      const transport = logger.transports[0];
      const logSpy = jest.spyOn(transport, 'log');

      logger.info('test message');

      expect(logSpy).toHaveBeenCalled();
      const info = logSpy.mock.calls[0][0];
      // Note: winston-transport log method receives the info object after formatting
      // but the Console transport's 'log' might be called with different arguments depending on winston version.
      // We check if the level is uppercase as per our logPreFormat
      expect(info.level).toContain('INFO');
      expect(info.message).toBe('test message');
    });
  });

  describe('Cloud Function Runtime', () => {
    it('should format logs as stringified JSON', () => {
      const logConfig = require('../lib/runtimes/cloud-function');
      const logger = winston.createLogger(logConfig);
      
      // We check the format directly
      const format = logConfig.format;
      const info = {
        level: 'info',
        message: 'hello world',
        timestamp: '2023-01-01T00:00:00Z'
      };

      // In winston 3.x, formats are executed sequentially. 
      // We need to simulate the transform flow or check the result of the final transform.
      // Since our cloud-function uses a printf that returns a string:
      const result = logConfig.format.transform(info, logConfig.format.options);
      const json = JSON.parse(result[Symbol.for('message')]);

      expect(json.severity).toBe('INFO');
      expect(json.message).toBe('hello world');
      expect(json.timestamp).toBe('2023-01-01T00:00:00Z');
      expect(json['logging.googleapis.com/labels']).toBeDefined();
    });
  });

  describe('Kubernetes Runtime', () => {
    it('should map levels to Stackdriver severities', () => {
      const logConfig = require('../lib/runtimes/kubernetes');
      const info = {
        level: 'warn',
        LEVEL: 'warn',
        message: 'something happened'
      };

      const result = logConfig.transports[0].format.transform(info);
      expect(result.severity).toBe('WARNING');
    });

    it('should preserve errors recursively', () => {
      const logConfig = require('../lib/runtimes/kubernetes');
      const error = new Error('sub error');
      const info = {
        level: 'error',
        LEVEL: 'error',
        message: 'main error',
        details: { err: error }
      };

      const result = logConfig.transports[0].format.transform(info);
      expect(result.details.err.message).toBe('sub error');
      expect(result.details.err.stack).toBeDefined();
    });
  });

  describe('Cloud Logging Runtime', () => {
    it('should load cloud-logging config', () => {
      const logConfig = require('../lib/runtimes/cloud-logging');
      expect(logConfig.transports[0].constructor.name).toBe('LoggingWinston');
    });

    it('should format logs using logFormat', () => {
      const logConfig = require('../lib/runtimes/cloud-logging');
      const info = {
        level: 'info',
        message: 'hello'
      };
      const result = logConfig.format.transform(info);
      expect(result.message).toBe('hello');
    });
  });
});
