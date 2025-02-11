import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { TypeormConfig } from '../shared/config/typeorm.config';
import { FlowORMEntity } from '../app/flow/infrastructure/typeorm/entities/flow-typeorm.entity';
import { StepORMEntity } from '../app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

describe('DatabaseModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [DatabaseModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

   /* it('should import TypeOrmModule with correct entities', () => {
        const typeOrmModule = module.get(TypeOrmModule);
        expect(typeOrmModule).toBeDefined();
        const entities = Reflect.getMetadata('entities', typeOrmModule);
        expect(entities).toEqual([FlowORMEntity, StepORMEntity]);
    });

    it('should use TypeormConfig to get options based on stage', async () => {
        const stage = process.env.NODE_ENV as 'test' | 'migration' | 'default' || 'default';
        expect(TypeormConfig.getOptions).toHaveBeenCalledWith(stage);
    }); */
});