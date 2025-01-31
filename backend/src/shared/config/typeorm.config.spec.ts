import { EnvMock } from '../../../__tests__/mocks/env.mock';
import { TypeormConfig } from './typeorm.config';

describe('typeorm.config.ts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getOptions', () => {
    it('should return test config with SQLite for "test" stage', () => {
      const mock = {
        DB_DNS: 'localhost',
        DB_APP_USER: 'user',
        DB_APP_PASS: 'password',
        DB_APP_PORT: '3306',
        DB_APP_NAME: 'test_db',
      };

      EnvMock.handler(mock);

      const options = TypeormConfig.getOptions('test');

      expect(options.type).toBe('better-sqlite3');
      expect(options.database).toBe(':memory:');
      expect(options.synchronize).toBe(true);
      expect(options.logging).toBe(false);
      expect(options.entities).toHaveLength(3);
    });

    it('should return default config with MySQL for "default" stage', () => {
      const mock = {
        DB_DNS: 'localhost',
        DB_APP_USER: 'user',
        DB_APP_PASS: 'password',
        DB_APP_PORT: '3306',
        DB_APP_NAME: 'default_db',
      };

      EnvMock.handler(mock);

      const options = TypeormConfig.getOptions('default');

      expect(options.type).toBe('mysql');
      expect(options.logging).toBe(false);
      expect(options.entities).toHaveLength(3);
    });

    it('should return migration config with MySQL and migration credentials for "migration" stage', () => {
      const mock = {
        DB_APP_USER_MIGRATION: 'migrationUser',
        DB_APP_PASS_MIGRATION: 'migrationPass',
      };

      EnvMock.handler(mock);

      const options = TypeormConfig.getOptions('migration');

      expect(options.type).toBe('mysql');
      expect(options.migrations).toHaveLength(1);
      expect(options.entities).toHaveLength(3);
    });
  });
});
