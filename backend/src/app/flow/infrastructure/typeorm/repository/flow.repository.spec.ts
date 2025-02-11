import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlowRepository } from './flow.repository';
import { FlowORMEntity } from '../entities/flow-typeorm.entity';
import { CreateFlowDto } from '../../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../../presenter/dto/update-flow.dto';
import { PaginationPresenter } from '../../../../../shared/pagination/pagination.presenter';

describe('FlowRepository', () => {
    let repository: FlowRepository;
    let flowRepositoryMock: Repository<FlowORMEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FlowRepository,
                {
                    provide: getRepositoryToken(FlowORMEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        repository = module.get<FlowRepository>(FlowRepository);
        flowRepositoryMock = module.get<Repository<FlowORMEntity>>(getRepositoryToken(FlowORMEntity));
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {
        it('should create a new flow', async () => {
            const createFlowDto: CreateFlowDto = { flowName: 'Test Flow' };
            const flowEntity = { id: 1, ...createFlowDto } as FlowORMEntity;

            jest.spyOn(flowRepositoryMock, 'create').mockReturnValue(flowEntity);
            jest.spyOn(flowRepositoryMock, 'save').mockResolvedValue(flowEntity);

            const result = await repository.create(createFlowDto);
            expect(result).toEqual(flowEntity);
            expect(flowRepositoryMock.create).toHaveBeenCalledWith(createFlowDto);
            expect(flowRepositoryMock.save).toHaveBeenCalledWith(flowEntity);
        });
    });

    describe('findAll', () => {
        it('should return paginated flows', async () => {
            const flowEntities = [{ id: 1, flowName: 'Test Flow' }] as FlowORMEntity[];
            const total = 1;
            const page = 1;
            const limit = 10;

            jest.spyOn(flowRepositoryMock, 'createQueryBuilder').mockImplementation(() => ({
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

            jest.spyOn(flowRepositoryMock, 'findOne').mockResolvedValue(flowEntity);

            const result = await repository.findOne(1);
            expect(result).toEqual(flowEntity);
            expect(flowRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('update', () => {
        it('should update a flow', async () => {
            const updateFlowDto: UpdateFlowDto = { flowName: 'Updated Flow' };
            const flowEntity = { id: 1, ...updateFlowDto } as FlowORMEntity;

            jest.spyOn(flowRepositoryMock, 'update').mockResolvedValue({ affected: 1 } as any);
            jest.spyOn(flowRepositoryMock, 'findOne').mockResolvedValue(flowEntity);

            const result = await repository.update(1, updateFlowDto);
            expect(result).toEqual(flowEntity);
            expect(flowRepositoryMock.update).toHaveBeenCalledWith(1, updateFlowDto);
            expect(flowRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('remove', () => {
        it('should remove a flow by id', async () => {
            jest.spyOn(flowRepositoryMock, 'delete').mockResolvedValue({ affected: 1 } as any);

            await repository.remove(1);
            expect(flowRepositoryMock.delete).toHaveBeenCalledWith(1);
        });
    });
});