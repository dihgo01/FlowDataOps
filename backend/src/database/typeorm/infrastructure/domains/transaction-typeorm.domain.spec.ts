import { TransactionTypeormDomain } from './transaction-typeorm.domain';
import { TypeormDomain } from './typeorm.domain';
import { DataSource, DataSourceOptions, QueryRunner } from 'typeorm';

jest.mock('./typeorm.domain');

describe('TransactionTypeormDomain', () => {
  let transactionDomain: TransactionTypeormDomain;
  let queryRunner: QueryRunner;
  let typeOrmDomain: TypeormDomain;
  let mockDataSource: DataSource;

  beforeEach(() => {
    const dataSourceOptions = {
      type: 'better-sqlite3',
      database: ':memory:',
      entities: [],
      synchronize: true,
    } as DataSourceOptions;

    mockDataSource = new DataSource(dataSourceOptions);
    typeOrmDomain = new TypeormDomain(mockDataSource);
    transactionDomain = new TransactionTypeormDomain(typeOrmDomain);

    queryRunner = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    } as unknown as QueryRunner;

    (typeOrmDomain.getDataSource as jest.Mock).mockReturnValue(mockDataSource);
    mockDataSource.createQueryRunner = jest.fn().mockReturnValue(queryRunner);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start a transaction', async () => {
    await transactionDomain.start();

    expect(queryRunner.startTransaction).toHaveBeenCalledTimes(1);
    expect(transactionDomain.queryRunner).toBe(queryRunner);
  });

  it('should commit a transaction', async () => {
    await transactionDomain.start();

    await transactionDomain.commit();

    expect(queryRunner.commitTransaction).toHaveBeenCalledTimes(1);
    expect(queryRunner.release).toHaveBeenCalledTimes(1);
  });

  it('should rollback a transaction', async () => {
    await transactionDomain.start();

    await transactionDomain.rollback();

    expect(queryRunner.rollbackTransaction).toHaveBeenCalledTimes(1);
    expect(queryRunner.release).toHaveBeenCalledTimes(1);
  });

  it('should handle finish correctly after commit and rollback', async () => {
    await transactionDomain.start();

    await transactionDomain.commit();

    expect(queryRunner.release).toHaveBeenCalledTimes(1);

    await transactionDomain.start();

    await transactionDomain.rollback();

    expect(queryRunner.release).toHaveBeenCalledTimes(2);
  });
});
