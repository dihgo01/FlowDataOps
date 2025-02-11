import { Test, TestingModule } from '@nestjs/testing';
import { FlowModule } from './flow.module';
import { FlowService } from './application/service/flow.service';
import { FlowController } from './presenter/flow.controller';
import { FlowRepository } from './infrastructure/typeorm/repository/flow.repository';
import { DatabaseModule } from '../../database/database.module';

describe('FlowModule', () => {
    let flowModule: FlowModule;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [FlowModule],
        }).compile();

        flowModule = module.get<FlowModule>(FlowModule);
    });

    it('should be defined', () => {
        expect(flowModule).toBeDefined();
    });

    it('should import DatabaseModule', () => {
        const imports = Reflect.getMetadata('imports', FlowModule);
        expect(imports).toContain(DatabaseModule);
    });

    it('should provide FlowService', () => {
        const providers = Reflect.getMetadata('providers', FlowModule);
        expect(providers).toContainEqual(FlowService);
    });

    it('should provide IFlowRepository with FlowRepository', () => {
        const providers = Reflect.getMetadata('providers', FlowModule);
        const repositoryProvider = providers.find(provider => provider.provide === 'IFlowRepository');
        expect(repositoryProvider).toBeDefined();
        expect(repositoryProvider.useClass).toBe(FlowRepository);
    });

    it('should export FlowService and IFlowRepository', () => {
        const exports = Reflect.getMetadata('exports', FlowModule);
        expect(exports).toContain(FlowService);
        expect(exports).toContain('IFlowRepository');
    });

    it('should have FlowController', () => {
        const controllers = Reflect.getMetadata('controllers', FlowModule);
        expect(controllers).toContain(FlowController);
    });
});