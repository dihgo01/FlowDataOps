import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionModule } from './execution.module';
import { ExecutionService } from './application/service/execution.service';
import { ExecutionController } from './presenter/execution.controller';
import { ExecutionRepository } from './infrastructure/typeorm/repository/execution.repository';
import { DatabaseModule } from 'src/database/database.module';

describe('ExecutionModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [ExecutionModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should import DatabaseModule', () => {
        const databaseModule = module.get<DatabaseModule>(DatabaseModule);
        expect(databaseModule).toBeInstanceOf(DatabaseModule);
    });

    it('should provide ExecutionService', () => {
        const executionService = module.get<ExecutionService>(ExecutionService);
        expect(executionService).toBeInstanceOf(ExecutionService);
    });

    it('should provide ExecutionController', () => {
        const executionController = module.get<ExecutionController>(ExecutionController);
        expect(executionController).toBeInstanceOf(ExecutionController);
    });

    it('should provide IExecutionRepository', () => {
        const executionRepository = module.get<ExecutionRepository>('IExecutionRepository');
        expect(executionRepository).toBeInstanceOf(ExecutionRepository);
    });
});