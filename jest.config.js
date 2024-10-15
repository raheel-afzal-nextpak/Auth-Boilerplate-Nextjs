module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/domains/(.*)$': '<rootDir>/src/domains/$1',
    '^@/interface$': '<rootDir>/src/interface/index',
    '^@/config/(.*)$': '<rootDir>/src/config/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',  // Assuming 'lib' is directly under the root directory
    "^@/src/assets/images/(.*)$": "<rootDir>/src/assets/images/$1",
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/repository/(.*)$': '<rootDir>/src/repository/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/schema/(.*)$': '<rootDir>/src/schema/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',

  },
  testMatch: ['<rootDir>/tests/**/*.{js,jsx,ts,tsx}'], // Only include test files in /tests folder
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/'],
};
