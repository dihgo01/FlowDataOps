import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationPresenter } from '../../../../../shared/pagination/pagination.presenter';
import { StepRepository } from './step.repository';
import { StepORMEntity } from '../entities/step-typeorm.entity';
import { CreateStepDto } from 'src/app/steps/presenter/dto/create-step.dto';
import { UpdateStepDto } from 'src/app/steps/presenter/dto/update-step.dto';

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
            const createStepDto: CreateStepDto = { stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` };
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
        it('should return paginated steps', async () => {
            const stepEntities = [{ id: 1, stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` }] as StepORMEntity[];
            const total = 1;
            const page = 1;
            const limit = 10;

            jest.spyOn(stepRepositoryMock, 'createQueryBuilder').mockImplementation(() => ({
                where: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getManyAndCount: jest.fn().mockResolvedValue([stepEntities, total]),
            }) as any);

            const result = await repository.findAll(page, limit);
            expect(result).toEqual(new PaginationPresenter({
                current_page: page,
                per_page: limit,
                last_page: Math.ceil(total / limit),
                total,
                data: stepEntities,
            }));
        });
    });

    describe('findOne', () => {
        it('should return a step by id', async () => {
            const stepEntity = { id: 1, stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` } as StepORMEntity;

            jest.spyOn(stepRepositoryMock, 'findOne').mockResolvedValue(stepEntity);

            const result = await repository.findOne(1);
            expect(result).toEqual(stepEntity);
            expect(stepRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('update', () => {
        it('should update a step', async () => {
            const updateStepDto: UpdateStepDto = { stepName: 'Updated Step' , icon: 'path/icon', type: 'HTTP', config: `{}` };
            const stepEntity = { id: 1, ...updateStepDto } as StepORMEntity;

            jest.spyOn(stepRepositoryMock, 'update').mockResolvedValue({ affected: 1 } as any);
            jest.spyOn(stepRepositoryMock, 'findOne').mockResolvedValue(stepEntity);

            const result = await repository.update(1, updateStepDto);
            expect(result).toEqual(stepEntity);
            expect(stepRepositoryMock.update).toHaveBeenCalledWith(1, updateStepDto);
            expect(stepRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('remove', () => {
        it('should remove a step by id', async () => {
            jest.spyOn(stepRepositoryMock, 'delete').mockResolvedValue({ affected: 1 } as any);

            await repository.remove(1);
            expect(stepRepositoryMock.delete).toHaveBeenCalledWith(1);
        });
    });
});