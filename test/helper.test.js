'use strict';

const { detectRuntime, safeStringify, handleMessage } = require('../lib/helper');

describe('Helper Functions', () => {
  describe('detectRuntime', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should prioritize NODE_RUN', () => {
      process.env.NODE_RUN = 'custom-runtime';
      expect(detectRuntime()).toBe('custom-runtime');
    });

    it('should detect cloud-function via K_SERVICE', () => {
      delete process.env.NODE_RUN;
      process.env.K_SERVICE = 'my-function';
      expect(detectRuntime()).toBe('cloud-function');
    });

    it('should detect kubernetes via KUBERNETES_SERVICE_HOST', () => {
      delete process.env.NODE_RUN;
      delete process.env.K_SERVICE;
      process.env.KUBERNETES_SERVICE_HOST = '10.0.0.1';
      expect(detectRuntime()).toBe('kubernetes');
    });

    it('should default to local', () => {
      delete process.env.NODE_RUN;
      delete process.env.K_SERVICE;
      delete process.env.KUBERNETES_SERVICE_HOST;
      expect(detectRuntime()).toBe('local');
    });
  });

  describe('safeStringify', () => {
    it('should stringify simple objects', () => {
      expect(safeStringify({ a: 1 })).toBe('{"a":1}');
    });

    it('should handle Errors correctly', () => {
      const err = new Error('boom');
      const result = safeStringify(err);
      expect(result).toContain('"message":"boom"');
      expect(result).toContain('"stack"');
    });

    it('should return error message on circular structures', () => {
      const circ = {};
      circ.self = circ;
      const result = safeStringify(circ);
      expect(typeof result).toBe('string');
      expect(result).toContain('circular');
    });
  });

  describe('handleMessage', () => {
    it('should join message and args', () => {
      expect(handleMessage('INFO', 'hello', ['world', 123])).toBe('hello world 123');
    });

    it('should slice long messages for non-debug levels', () => {
      const longStr = 'a'.repeat(2000);
      const result = handleMessage('INFO', longStr, []);
      expect(result.length).toBe(1000);
    });

    it('should NOT slice for debug level', () => {
      const longStr = 'a'.repeat(2000);
      const result = handleMessage('DEBUG', longStr, []);
      expect(result.length).toBe(2000);
    });
  });
});
