// import type { Config } from 'jest';
// import nextJest from 'next/jest';

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

// // Add any custom config to be passed to Jest
// const config: Config = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   testEnvironment: 'jest-environment-jsdom',
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/src/$1',
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
//   },
//   collectCoverageFrom: [
//     'src/**/*.{js,jsx,ts,tsx}',
//     '!src/**/*.d.ts',
//     '!src/**/*.stories.{js,jsx,ts,tsx}',
//     '!src/**/*.test.{js,jsx,ts,tsx}',
//     '!src/pages/_*.{js,jsx,ts,tsx}'
//   ],
//   coverageThreshold: {
//     global: {
//       branches: 80,
//       functions: 80,
//       lines: 80,
//       statements: 80
//     }
//   },
//   testPathIgnorePatterns: [
//     '<rootDir>/.next/',
//     '<rootDir>/node_modules/',
//     '<rootDir>/cypress/'
//   ],
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
//   }
// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: [
    "**/tests/**/*.test.[jt]s?(x)",
    "**/tests/**/*.spec.[jt]s?(x)"
  ],
  roots: ['<rootDir>/src']
};

export default createJestConfig(config);