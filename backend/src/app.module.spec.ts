import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FlowModule } from './app/flow/flow.module';
import { StepsModule } from './app/steps/steps.module';
import { ExecutionModule } from './app/execution/execution.module';
import { QueueModule } from './queue/queue.module';

describe('AppModule', () => {
    let appModule: TestingModule;

    beforeAll(async () => {
        appModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                DatabaseModule,
                FlowModule,
                StepsModule,
                ExecutionModule,
                QueueModule
            ],
        }).compile();
    });

    it('should compile the module', () => {
        expect(appModule).toBeDefined();
    });

    it('should import ConfigModule', () => {
        const configModule = appModule.get<ConfigModule>(ConfigModule);
        expect(configModule).toBeInstanceOf(ConfigModule);
    });

    it('should import DatabaseModule', () => {
        const databaseModule = appModule.get<DatabaseModule>(DatabaseModule);
        expect(databaseModule).toBeInstanceOf(DatabaseModule);
    });

    it('should import FlowModule', () => {
        const flowModule = appModule.get<FlowModule>(FlowModule);
        expect(flowModule).toBeInstanceOf(FlowModule);
    });

    it('should import StepsModule', () => {
        const stepsModule = appModule.get<StepsModule>(StepsModule);
        expect(stepsModule).toBeInstanceOf(StepsModule);
    });

    it('should import ExecutionModule', () => {
        const executionModule = appModule.get<ExecutionModule>(ExecutionModule);
        expect(executionModule).toBeInstanceOf(ExecutionModule);
    });

    it('should import QueueModule', () => {
        const queueModule = appModule.get<QueueModule>(QueueModule);
        expect(queueModule).toBeInstanceOf(QueueModule);
    });
});