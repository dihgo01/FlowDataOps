import { Logger } from '@nestjs/common';
import { BaseEntity, DataSource } from 'typeorm';
import { performance } from 'perf_hooks';

import { TypeormConfig } from '../../../../shared/config/typeorm.config';
import { Repository, RepositoryHandler } from '../../infrastructure/types/repository.type';
import { TransactionTypeormDomain } from './transaction-typeorm.domain';
import { TransactionService } from '../../application/service/transaction.service';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';

const logger = new Logger('DataBase')

export class TypeormDomain implements OnModuleInit, OnModuleDestroy {

  private lazeQueries: Function[] = [];
  private dataSource: DataSource;
  private isConnecting: boolean = false;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.rawConnect();
  }

  private rawConnect(): void {
    const start = performance.now();

    this.isConnecting = true;
    this.dataSource.initialize().then(async () => {
      this.isConnecting = false;

      logger.log('Connection with database was established', {
        time_spent: `${performance.now() - start} ms`,
      });

      if (this.lazeQueries.length) {
        logger.log(`${this.lazeQueries.length} queries are waiting for connection`);
        for (const resolve of this.lazeQueries) resolve();
      }
    });
  }

  public static initialize(): TypeormDomain {
    const stage = process.env.NODE_ENV === 'test' ? 'test' : 'default';
    const dataSource = new DataSource(TypeormConfig.getOptions(stage));

    logger.log('Typeorm datasource created', { stage });
    return new TypeormDomain(dataSource);
  }


  public getDataSource(): DataSource {
    return this.dataSource;
  }

  async onModuleInit() {
    await this.dataSource.initialize();
  }

  async onModuleDestroy() {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      logger.log('Database connection closed');
    }
  }

  public async connect(): Promise<void> {
    if (this.dataSource.isInitialized && !this.isConnecting) {
      logger.log('Database connection already been established');
      return;
    }

    if (this.isConnecting) {
      return new Promise<void>(resolve => {
        logger.log('Database is connecting');
        this.lazeQueries.push(resolve);
      });
    }

    return new Promise<void>(resolve => {
      this.lazeQueries.push(resolve);
      this.rawConnect();
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      logger.log("Database don't have connection established");
      return;
    }

    return this.dataSource.destroy();
  }

  public getRepository<T extends BaseEntity, K extends new (...args: any[]) => T>(
    entity: K
  ): Repository<T> {
    return {
      getConnection: async () => {
        if (!this.dataSource.isInitialized) {
          await new Promise<void>(resolve => this.lazeQueries.push(resolve));
        }

        const repository = this.dataSource.getRepository(entity);
        const using = (transaction?: TransactionService) => {
          const domain = transaction?.transactionDomain as TransactionTypeormDomain | undefined;
          return domain?.queryRunner?.manager.getRepository(entity) ?? repository;
        };

        return Object.assign(repository, { using }) as RepositoryHandler<T>;
      },
    };
  }
}
