/** @type {import('jest').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: path.resolve(__dirname, '..'),
  roots: ['<rootDir>/amplify/functions', '<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'amplify/functions/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!amplify/functions/**/*.d.ts',
    '!amplify/functions/**/node_modules/**',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }],
  },
};