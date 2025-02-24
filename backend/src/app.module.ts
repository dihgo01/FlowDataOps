import { Module } from '@nestjs/common';
import { FlowModule } from './app/flow/flow.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StepsModule } from './app/steps/steps.module';
import { ExecutionModule } from './app/execution/execution.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    FlowModule,
    StepsModule,
    ExecutionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
