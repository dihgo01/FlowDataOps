import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationPresenter } from '../../../../../shared/pagination/pagination.presenter';
import { StepRepository } from './step.repository';
import { StepORMEntity } from '../entities/step-typeorm.entity';
import { CreateStepDto } from 'src/app/steps/presenter/dto/create-step.dto';

describe('StepRepository', () => {
    let repository: StepRepository;
    let stepRepositoryMock: Repository<StepORMEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StepRepository,
                {
                    provide: getRepositoryToken(StepORMEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = module.get<StepRepository>(StepRepository);
        stepRepositoryMock = module.get<Repository<StepORMEntity>>(getRepositoryToken(StepORMEntity));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should create a new step', async () => {
            const createStepDto: CreateStepDto = { flowName: 'Test Flow' };
            const stepEntity = { id: 1, ...createStepDto } as StepORMEntity;

            jest.spyOn(stepRepositoryMock, 'create').mockReturnValue(stepEntity);
            jest.spyOn(stepRepositoryMock, 'save').mockResolvedValue(stepEntity);

            const result = await repository.create(createStepDto);
            expect(result).toEqual(stepEntity);
            expect(stepRepositoryMock.create).toHaveBeenCalledWith(createStepDto);
            expect(stepRepositoryMock.save).toHaveBeenCalledWith(stepEntity);
        });
    });

    describe('findAll', () => {
        it('should return paginated flows', async () => {
            const flowEntities = [{ id: 1, flowName: 'Test Flow' }] as FlowORMEntity[];
            const total = 1;
            const page = 1;
            const limit = 10;

            jest.spyOn(stepRepositoryMock, 'createQueryBuilder').mockImplementation(() => ({
                where: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getManyAndCount: jest.fn().mockResolvedValue([flowEntities, total]),
            }) as any);

            const result = await repository.findAll(page, limit);
            expect(result).toEqual(new PaginationPresenter({
                current_page: page,
                per_page: limit,
                last_page: Math.ceil(total / limit),
                total,
                data: flowEntities,
            }));
        });
    });

    describe('findOne', () => {
        it('should return a flow by id', async () => {
            const flowEntity = { id: 1, flowName: 'Test Flow' } as FlowORMEntity;

            jest.spyOn(stepRepositoryMock, 'findOne').mockResolvedValue(flowEntity);

            const result = await repository.findOne(1);
            expect(result).toEqual(flowEntity);
            expect(stepRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('update', () => {
        it('should update a flow', async () => {
            const updateFlowDto: UpdateFlowDto = { flowName: 'Updated Flow' };
            const flowEntity = { id: 1, ...updateFlowDto } as FlowORMEntity;

            jest.spyOn(stepRepositoryMock, 'update').mockResolvedValue({ affected: 1 } as any);
            jest.spyOn(stepRepositoryMock, 'findOne').mockResolvedValue(flowEntity);

            const result = await repository.update(1, updateFlowDto);
            expect(result).toEqual(flowEntity);
            expect(stepRepositoryMock.update).toHaveBeenCalledWith(1, updateFlowDto);
            expect(stepRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('remove', () => {
        it('should remove a flow by id', async () => {
            jest.spyOn(stepRepositoryMock, 'delete').mockResolvedValue({ affected: 1 } as any);

            await repository.remove(1);
            expect(stepRepositoryMock.delete).toHaveBeenCalledWith(1);
        });
    });
});