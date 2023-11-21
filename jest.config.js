module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/react/**/*.test.tsx'],
  collectCoverageFrom: ['<rootDir>/src/**/react/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
};
