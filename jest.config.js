module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['index.js', 'lib/**/*.js'],
}
