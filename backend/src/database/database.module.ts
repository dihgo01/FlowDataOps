import { Module } from '@nestjs/common';
import { TransactionService } from './typeorm/application/service/transaction.service';
import { TransactionTypeormDomain } from './typeorm/infrastructure/domains/transaction-typeorm.domain';
import { DatabaseProvider } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowORMEntity } from '../app/flow/infrastructure/typeorm/entities/flow-typeorm.entity';
import { TypeormConfig } from '../shared/config/typeorm.config';
import { StepORMEntity } from '../app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => TypeormConfig.getOptions('default'),
    }),
    TypeOrmModule.forFeature([FlowORMEntity, StepORMEntity]),
  ],
  providers: [
    DatabaseProvider,
    TransactionService,
    {
      provide: 'ITransactionDomain',
      useClass: TransactionTypeormDomain,
    },
  ],
  exports: [TransactionService, 'ITransactionDomain', DatabaseProvider, TypeOrmModule],
})
export class DatabaseModule { }