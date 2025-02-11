import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowORMEntity } from '../app/flow/infrastructure/typeorm/entities/flow-typeorm.entity';
import { TypeormConfig } from '../shared/config/typeorm.config';
import { StepORMEntity } from '../app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

const entities = [FlowORMEntity, StepORMEntity];
const stage = process.env.NODE_ENV as 'test' | 'migration' | 'default' || 'default';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => TypeormConfig.getOptions(stage),
    }),
    TypeOrmModule.forFeature(entities),
  ],
  
  exports: [ TypeOrmModule],
})
export class DatabaseModule { }