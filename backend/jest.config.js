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
    'src/modules/user-data/application/entities/user-data.entity.ts',
    'src/modules/connections/connection.domain.ts',
    'src/shared/decorators/validators/is-document.validator.ts',
    'src/modules/user-data/infrastructure/dynamoose/repositories/user-data.repository.ts',
    'src/modules/user-data/infrastructure/dynamoose/entities/import-maintenance.entity.ts',
    'src/modules/database/infrastructure/typeorm/infrastructure/migrations',
    'src/modules/database/infrastructure/typeorm/infrastructure/orm.config.ts',
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
