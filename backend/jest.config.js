/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest-setup.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/unit/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  testPathIgnorePatterns: ['dist', 'node_modules'],
  coverageDirectory: 'reports/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    'src/app/flow/application/entities/flow.entity.ts',
    'src/app/step/application/entities/steps.entity.ts',
    'src/modules/user-data/infrastructure/dynamoose/repositories/user-data.repository.ts',
    'src/modules/user-data/infrastructure/dynamoose/entities/import-maintenance.entity.ts',
    'src/database/infrastructure/typeorm/infrastructure/migrations',
    'src/database/infrastructure/typeorm/infrastructure/orm.config.ts',
    'src/modules/user-data/infrastructure/dynamoose/entities/user-data.entity.ts',
    'src/modules/user-data/application/entities/userData-orm.entity.ts',
    'src/modules/user-data/presentation/dtos/v1',
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
