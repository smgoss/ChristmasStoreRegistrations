/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/../test/integration'],
  testMatch: ['**/*.integration.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'amplify/**/*.ts',
    '!amplify/**/*.test.ts',
    '!amplify/**/*.integration.test.ts',
  ],
  testTimeout: 30000, // 30 seconds for Lambda invocations
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.js'],
};
