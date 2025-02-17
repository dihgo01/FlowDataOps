import { Test, TestingModule } from '@nestjs/testing';
import { PaginationPresenter } from '../../../../shared/pagination/pagination.presenter';
import { StepService } from './execution.service';
import { IStepRepository } from '../repositories/execution.repository';
import { CreateStepDto } from '../../presenter/dto/create-execution.dto';
import { Step } from '../entities/executions.entity';
import { UpdateStepDto } from '../../presenter/dto/update-execution.dto';

describe('ExecutionService', () => {
  let service: StepService;
  let stepRepository: IStepRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepService,
        {
          provide: 'IStepRepository',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StepService>(StepService);
    stepRepository = module.get<IStepRepository>('IStepRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a step', async () => {
    const createStepDto: CreateStepDto = { stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` };
    const result = { id: '1', ...createStepDto } as Step;
    jest.spyOn(stepRepository, 'create').mockResolvedValue(result);

    expect(await service.create(createStepDto)).toEqual(result);
    expect(stepRepository.create).toHaveBeenCalledWith(createStepDto);
  });

  it('should find all steps', async () => {
    const result: Step[] = [{ id: '1', stepName: 'Test Flow', icon: 'path/icon', type: 'HTTP', config: `{}`, createdAt: new Date(), updatedAt: new Date() }];
    const page = 1;
    const limit = 10;
    const pagination = new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(result.length / limit),
      total: result.length,
      data: result,
    });

    jest.spyOn(stepRepository, 'findAll').mockResolvedValue(pagination);

    const serviceCall = await service.findAll(page, limit);

    expect(serviceCall.data).toEqual(pagination.data);
    expect(serviceCall.total).toEqual(pagination.total);
    expect(serviceCall.current_page).toEqual(pagination.current_page);
    expect(serviceCall.per_page).toEqual(pagination.per_page);
    expect(serviceCall.last_page).toEqual(pagination.last_page);
    expect(stepRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);
  });

  it('should find all flows page null and limit null', async () => {
    const result: Step[] = [{ id: '1', stepName: 'Test Flow', icon: 'path/icon', type: 'HTTP', config: `{}`, createdAt: new Date(), updatedAt: new Date() }];
    const page = 1;
    const limit = 10;
    const pagination = new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(result.length / limit),
      total: result.length,
      data: result,
    });

    jest.spyOn(stepRepository, 'findAll').mockResolvedValue(pagination);

    const serviceCall = await service.findAll();

    expect(serviceCall.data).toEqual(pagination.data);
    expect(serviceCall.total).toEqual(pagination.total);
    expect(serviceCall.current_page).toEqual(pagination.current_page);
    expect(serviceCall.per_page).toEqual(pagination.per_page);
    expect(serviceCall.last_page).toEqual(pagination.last_page);
    expect(stepRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);
  });

  it('should find one step', async () => {
    const result = { id: '1', stepName: 'Test Flow', icon: 'path/icon', type: 'HTTP', config: `{}`, } as Step;
    jest.spyOn(stepRepository, 'findOne').mockResolvedValue(result);

    expect(await service.findOne('1')).toEqual(result);
    expect(stepRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a step', async () => {
    const updateFlowDto: UpdateStepDto = { stepName: 'Test Flow', icon: 'path/icon', type: 'HTTP', config: `{}`, };
    const result = { id: '1', ...updateFlowDto } as Step;
    jest.spyOn(stepRepository, 'update').mockResolvedValue(result);

    expect(await service.update('1', updateFlowDto)).toEqual(result);
    expect(stepRepository.update).toHaveBeenCalledWith('1', updateFlowDto);
  });

  it('should remove a step', async () => {
    jest.spyOn(stepRepository, 'remove').mockResolvedValue();

    await service.remove('1');

    expect(stepRepository.remove).toHaveBeenCalledWith('1');
  });
});

