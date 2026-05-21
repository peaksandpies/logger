'use strict'

const originalEnv = { ...process.env }

beforeEach(() => {
  jest.resetModules()
  // Reset process.env to its original state before each test case
  process.env = { ...originalEnv }
})

afterAll(() => {
  // Restore original process.env after all tests in a file finish
  process.env = originalEnv
})
