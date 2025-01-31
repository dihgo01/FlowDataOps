import { FlowORMEntity } from '../../../../app/flow/infrastructure/typeorm/entities/flow-typeorm.entity';
import { TypeormDomain } from './typeorm.domain';

describe('typeorm.domain.ts', () => {
  it('should connect with success', async () => {
    const domain = TypeormDomain.initialize();
    await domain.connect();

    expect(domain.getDataSource().isInitialized).toBe(true);
  });

  it('should disconnect with success', async () => {
    const domain = TypeormDomain.initialize();

    await domain.connect();
    await domain.disconnect();

    expect(domain.getDataSource().isInitialized).toBe(false);
  });

  it('should get respository correctly', async () => {
    const domain = TypeormDomain.initialize();

    const repository = domain.getRepository(FlowORMEntity);
    const transaction = {
      transactionDomain: {
        queryRunner: {
          manager: {
            getRepository: jest.fn(() => repository),
          },
        },
      },
    } as any;

    const connection = await repository.getConnection();

    expect(repository).toBeDefined();
    expect(domain).toBeDefined();
    expect(connection.using()).toBeDefined();
    expect(connection.using(transaction)).toBeDefined();
  });
});
