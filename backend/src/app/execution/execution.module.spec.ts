import { Test, TestingModule } from '@nestjs/testing';
import { StepsModule } from './execution.module';
import { StepService } from './application/service/execution.service';
import { StepController } from './presenter/execution.controller';
import { StepRepository } from './infrastructure/typeorm/repository/execution.repository';
import { DatabaseModule } from 'src/database/database.module';

describe('StepsModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [StepsModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should import DatabaseModule', () => {
        const databaseModule = module.get<DatabaseModule>(DatabaseModule);
        expect(databaseModule).toBeInstanceOf(DatabaseModule);
    });

    it('should provide StepService', () => {
        const stepService = module.get<StepService>(StepService);
        expect(stepService).toBeInstanceOf(StepService);
    });

    it('should provide StepController', () => {
        const stepController = module.get<StepController>(StepController);
        expect(stepController).toBeInstanceOf(StepController);
    });

    it('should provide IStepRepository', () => {
        const stepRepository = module.get<StepRepository>('IStepRepository');
        expect(stepRepository).toBeInstanceOf(StepRepository);
    });
});