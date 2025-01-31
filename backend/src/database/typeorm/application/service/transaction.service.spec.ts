import { NestContainer } from '@nestjs/core';
import { ITransactionDomain } from '../domain/transaction.domain';
import { TransactionService } from './transaction.service';

const transactionDomain: ITransactionDomain = {
  commit: jest.fn(),
  rollback: jest.fn(),
  start: jest.fn(),
};

describe('transaction.service.ts', () => {
  beforeAll(() => {
    NestContainer.bind(TransactionService).factory(
      jest.fn(() => new TransactionService(transactionDomain))
    );
  });

  

  it('should commit transaction', async () => {
    const spy = jest.spyOn(transactionDomain, 'commit');
    const transaction = NestContainer.call(TransactionService);

    await transaction.commit();

    expect(spy).toBeCalledTimes(1);
  });

  it('should rollback transaction', async () => {
    const spy = jest.spyOn(transactionDomain, 'rollback');
    const transaction = NestContainer.call(TransactionService);

    await transaction.rollback();

    expect(spy).toBeCalledTimes(1);
  });
});
