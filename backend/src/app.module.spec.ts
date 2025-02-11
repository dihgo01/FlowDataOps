import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FlowModule } from './app/flow/flow.module';
import { StepsModule } from './app/steps/steps.module';

describe('AppModule', () => {
    let appModule: TestingModule;

    beforeAll(async () => {
        appModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                DatabaseModule,
                FlowModule,
                StepsModule,
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
});