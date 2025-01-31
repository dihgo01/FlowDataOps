import { Injectable, Inject } from '@nestjs/common';
import { ITransactionDomain } from '../domain/transaction.domain';
import { TransactionTypeormDomain } from '../../infrastructure/domains/transaction-typeorm.domain'

@Injectable()
export class TransactionService {
    constructor(
        @Inject('ITransactionDomain')
        public readonly transactionDomain: ITransactionDomain,
    ) { }

   

    public async start(): Promise<void> {
        await this.transactionDomain.start();
    }

    public async commit(): Promise<void> {
        await this.transactionDomain.commit();
    }

    public async rollback(): Promise<void> {
        await this.transactionDomain.rollback();
    }
}