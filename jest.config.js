/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
  setupFilesAfterEnv: ['@relmify/jest-fp-ts'],
  clearMocks: true,
};
