import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions, BaseEntity } from 'typeorm';
import { resolve } from 'path';

import { FlowORMEntity } from '../../app/flow/infrastructure/typeorm/entities/flow-typeorm.entity'
import { StepORMEntity } from 'src/app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

type Stage = 'test' | 'migration' | 'default';

const entities: Array<typeof BaseEntity> = [FlowORMEntity,StepORMEntity];

export class TypeormConfig {

  private static getTestConfig = (): DataSourceOptions => {
    return {
      type: 'better-sqlite3',
      database: ':memory:',
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      entities,
    };
  };

  private static getDefaultConfig = (): DataSourceOptions => {
    const defaultOptions: DataSourceOptions = {
      type: 'mysql',
      replication: {
        master: {
          host: process.env.DB_DNS,
          username: process.env.DB_APP_USER, 
          password: process.env.DB_APP_PASS,
          port: Number(process.env.DB_APP_PORT ?? 3306),
          database: process.env.DB_APP_NAME,
        },
        slaves: [
          {
            host: process.env.DB_RO_DNS,
            username: process.env.DB_APP_USER,
            password: process.env.DB_APP_PASS,
            port: Number(process.env.DB_APP_PORT ?? 3306),
            database: process.env.DB_APP_NAME,
          },
        ],
      },
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
      entities,
    };

    return defaultOptions;
  };

  private static getMigrationConfig = () => {
    const defaultConfig = this.getDefaultConfig() as any;
    const config = defaultConfig.replication.master;

    config.username = process.env.DB_APP_USER_MIGRATION;
    config.password = process.env.DB_APP_PASS_MIGRATION;

    Object.assign(defaultConfig, {
      ...config,
      migrations: [
        resolve(
          __dirname,
          '..',
          '..',
          'database',
          'typeorm',
          'migrations',
          '**',
          '*.{ts,js}'
        ),
      ],
    });

    delete defaultConfig.replication;
    return defaultConfig;
  };

  public static getOptions(stage: 'test' | 'migration' | 'default'): DataSourceOptions {
    const options: Record<Stage, Function> = {
      test: TypeormConfig.getTestConfig,
      default: TypeormConfig.getDefaultConfig,
      migration: TypeormConfig.getMigrationConfig,
    };

    const option = options[stage]();

    console.info('Typeorm options', option);
    return option;
  }
}
