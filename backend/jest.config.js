/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest-setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/unit/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  testPathIgnorePatterns: ['dist', 'node_modules'],
  coverageDirectory: 'reports/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    'src/app/flow/application/entities/flow.entity.ts',
    'src/app/flow/application/entities/workflow-step.entity.ts',
    'src/app/flow/application/repositories/flow.repository.ts',
    'src/app/steps/application/entities/steps.entity.ts',
    'src/app/steps/application/repositories/step.repository.ts',
    'src/database/typeorm/migrations',
    'src/database/typeorm/infrastructure/orm.config.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
