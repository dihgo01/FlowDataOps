import { Test, TestingModule } from '@nestjs/testing';
import { PaginationPresenter } from '../../../../shared/pagination/pagination.presenter';
import { ExecutionService } from './execution.service';
import { IExecutionRepository } from '../repositories/execution.repository';
import { CreateExecutionDto } from '../../presenter/dto/create-execution.dto';
import { ExecutionFlow } from '../entities/executions.entity';
import { UpdateExecutionDto } from '../../presenter/dto/update-execution.dto';
import { Flow } from 'src/app/flow/application/entities/flow.entity';

describe('ExecutionService', () => {
  let service: ExecutionService;
  let executionRepository: IExecutionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutionService,
        {
          provide: 'IExecutionRepository',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            findOneFlow: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExecutionService>(ExecutionService);
    executionRepository = module.get<IExecutionRepository>('IExecutionRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an execution', async () => {
    const createDate = new Date();
    const createExecutionDto: CreateExecutionDto = { flowId: '1' };
    const flow = {
      id: '1',
      flowName: 'Test'
    } as Flow;

    const createExecution: ExecutionFlow = {
      flow: flow,
      status: 'Started',
      dateExecution: createDate,
      createdAt: createDate,
      updatedAt: createDate,
    };
    jest.spyOn(executionRepository, 'findOneFlow').mockResolvedValue(flow);
    jest.spyOn(executionRepository, 'create').mockResolvedValue(createExecution);

    const result = await service.create(createExecutionDto);

    expect(result.flow?.id).toEqual(createExecution.flow?.id);
    expect(result.status).toEqual(createExecution.status);
    expect(result.dateExecution).toEqual(createExecution.dateExecution);
    expect(executionRepository.findOneFlow).toHaveBeenCalledWith(createExecutionDto.flowId);
    expect(executionRepository.create).toHaveBeenCalled();
  });

  it('should find all executions', async () => {
    const result = new PaginationPresenter({
      current_page: 1,
      per_page: 10,
      last_page: 1,
      total: 1,
      data: [{
        id: '1',
        flow: { id: '1', flowName: 'Test Flow' } as Flow,
        status: 'Started',
        dateExecution: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    });
    jest.spyOn(executionRepository, 'findAll').mockResolvedValue(result);

    expect(await service.findAll(1, 10)).toEqual(result);
    expect(executionRepository.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should find one execution', async () => {
    const result = { id: '1', flow: { id: '1', flowName: 'Test Flow' } as Flow, status: 'Started', dateExecution: new Date(), createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(executionRepository, 'findOne').mockResolvedValue(result);

    expect(await service.findOne('1')).toEqual(result);
    expect(executionRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should update an execution', async () => {
    const updateExecutionDto: UpdateExecutionDto = { status: 'Completed' };
    const result = { id: '1', flow: { id: '1', flowName: 'Test Flow' } as Flow, status: 'Completed', dateExecution: new Date(), createdAt: new Date(), updatedAt: new Date() };
    jest.spyOn(executionRepository, 'update').mockResolvedValue(result);

    expect(await service.update('1', updateExecutionDto)).toEqual(result);
    expect(executionRepository.update).toHaveBeenCalledWith('1', updateExecutionDto);
  });

  it('should remove an execution', async () => {
    jest.spyOn(executionRepository, 'remove').mockResolvedValue();

    await service.remove('1');

    expect(executionRepository.remove).toHaveBeenCalledWith('1');
  });
});

