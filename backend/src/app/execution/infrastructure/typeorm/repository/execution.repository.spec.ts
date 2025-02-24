import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionRepository } from './execution.repository';
import { ExecutionFlowORMEntity } from '../entities/execution-typeorm.entity';
import { FlowORMEntity } from '../../../../flow/infrastructure/typeorm/entities/flow-typeorm.entity';
import { UpdateExecutionDto } from '../../../presenter/dto/update-execution.dto';
import { PaginationPresenter } from 'src/shared/pagination/pagination.presenter';
import { ExecutionFlow } from 'src/app/execution/application/entities/executions.entity';
import { Flow } from 'src/app/flow/application/entities/flow.entity';

describe('ExecutionRepository', () => {
    let repository: ExecutionRepository;
    let executionRepo: Repository<ExecutionFlowORMEntity>;
    let flowRepo: Repository<FlowORMEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExecutionRepository,
                {
                    provide: getRepositoryToken(ExecutionFlowORMEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(FlowORMEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = module.get<ExecutionRepository>(ExecutionRepository);
        executionRepo = module.get<Repository<ExecutionFlowORMEntity>>(getRepositoryToken(ExecutionFlowORMEntity));
        flowRepo = module.get<Repository<FlowORMEntity>>(getRepositoryToken(FlowORMEntity));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should create a new execution', async () => {
            const executionData: ExecutionFlow = { 
                id: '1', 
                flow: { id: '1', flowName: 'Test' } as Flow, 
                status: 'Started', 
                dateExecution: new Date(), 
                createdAt: new Date(), 
                updatedAt: new Date() 
            } as ExecutionFlow;
            
            jest.spyOn(executionRepo, 'create').mockReturnValue(executionData);
            jest.spyOn(executionRepo, 'save').mockResolvedValue(executionData);

            const result = await repository.create(executionData);
            expect(result).toEqual(executionData);
            expect(executionRepo.create).toHaveBeenCalledWith(executionData);
            expect(executionRepo.save).toHaveBeenCalledWith(executionData);
        });
    });

    describe('findAll', () => {
        it('should return paginated executions', async () => {
            const executions = [{ id: '1', name: 'Test Execution' }] as ExecutionFlowORMEntity[];
            const total = 1;
            jest.spyOn(executionRepo, 'createQueryBuilder').mockReturnValue({
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getManyAndCount: jest.fn().mockResolvedValue([executions, total]),
            } as any);

            const result = await repository.findAll(1, 10);
            expect(result).toEqual(new PaginationPresenter({
                current_page: 1,
                per_page: 10,
                last_page: 1,
                total,
                data: executions,
            }));
        });
    });

    describe('findOne', () => {
        it('should return a single execution', async () => {
            const execution = { id: '1', name: 'Test Execution' } as ExecutionFlowORMEntity;
            jest.spyOn(executionRepo, 'findOne').mockResolvedValue(execution);

            const result = await repository.findOne('1');
            expect(result).toEqual(execution);
            expect(executionRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        });
    });

    describe('findOneFlow', () => {
        it('should return a single flow', async () => {
            const flow = { id: '1', name: 'Test Flow' } as FlowORMEntity;
            jest.spyOn(flowRepo, 'findOneOrFail').mockResolvedValue(flow);

            const result = await repository.findOneFlow('1');
            expect(result).toEqual(flow);
            expect(flowRepo.findOneOrFail).toHaveBeenCalledWith({ where: { id: '1' } });
        });
    });

    describe('update', () => {
        it('should update an execution', async () => {
            const updateData: UpdateExecutionDto = { name: 'Updated Execution' };
            const updatedExecution = { id: '1', name: 'Updated Execution' } as ExecutionFlowORMEntity;
            jest.spyOn(executionRepo, 'update').mockResolvedValue(undefined);
            jest.spyOn(executionRepo, 'findOne').mockResolvedValue(updatedExecution);

            const result = await repository.update('1', updateData);
            expect(result).toEqual(updatedExecution);
            expect(executionRepo.update).toHaveBeenCalledWith('1', updateData);
            expect(executionRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
        });
    });

    describe('remove', () => {
        it('should remove an execution', async () => {
            jest.spyOn(executionRepo, 'delete').mockResolvedValue(undefined);

            await repository.remove('1');
            expect(executionRepo.delete).toHaveBeenCalledWith('1');
        });
    });
});