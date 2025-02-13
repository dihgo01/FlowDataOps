import { Test, TestingModule } from '@nestjs/testing';
import { FlowService } from './flow.service';
import { IFlowRepository } from '../repositories/flow.repository';
import { CreateFlowDto } from '../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../presenter/dto/update-flow.dto';
import { Flow } from '../entities/flow.entity';
import { PaginationPresenter } from '../../../../shared/pagination/pagination.presenter';

describe('FlowService', () => {
  let service: FlowService;
  let flowRepository: IFlowRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlowService,
        {
          provide: 'IFlowRepository',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            formatSteps: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FlowService>(FlowService);
    flowRepository = module.get<IFlowRepository>('IFlowRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a flow', async () => {
    const createFlowDto: CreateFlowDto = { flowName: 'Test Flow', description: 'Test Description', steps: [] };
    const result = { id: '1', ...createFlowDto } as Flow;

    jest.spyOn(flowRepository, 'formatSteps').mockResolvedValue([]);

    jest.spyOn(flowRepository, 'create').mockResolvedValue(result);

    expect(await service.create(createFlowDto)).toEqual(result);
    expect(flowRepository.create).toHaveBeenCalledWith(createFlowDto);
  });

  it('should create a flow and workflow_step', async () => {
    const createFlowDto: CreateFlowDto = {
      flowName: 'Test Flow',
      description: 'Test Description',
      steps: [{
        step_id: '1',
        order: 1,
        configuration: '{}',
      }]
    };
    const result = { id: '1', ...createFlowDto } as Flow;

    jest.spyOn(flowRepository, 'formatSteps').mockResolvedValue(createFlowDto.steps as any);

    jest.spyOn(flowRepository, 'create').mockResolvedValue(result);

    expect(await service.create(createFlowDto)).toEqual(result);
    expect(flowRepository.create).toHaveBeenCalledWith(createFlowDto);
  });

  it('should find all flows', async () => {
    const result: Flow[] = [{ id: '1', flowName: 'Test Flow', createdAt: new Date(), updatedAt: new Date() }];
    const page = 1;
    const limit = 10;
    const pagination = new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(result.length / limit),
      total: result.length,
      data: result,
    });

    jest.spyOn(flowRepository, 'findAll').mockResolvedValue(pagination);

    const serviceCall = await service.findAll(page, limit);

    expect(serviceCall.data).toEqual(pagination.data);
    expect(serviceCall.total).toEqual(pagination.total);
    expect(serviceCall.current_page).toEqual(pagination.current_page);
    expect(serviceCall.per_page).toEqual(pagination.per_page);
    expect(serviceCall.last_page).toEqual(pagination.last_page);
    expect(flowRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);
  });

  it('should find all flows page null and limit null', async () => {
    const result: Flow[] = [{ id: '1', flowName: 'Test Flow', createdAt: new Date(), updatedAt: new Date() }];
    const page = 1;
    const limit = 10;
    const pagination = new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(result.length / limit),
      total: result.length,
      data: result,
    });

    jest.spyOn(flowRepository, 'findAll').mockResolvedValue(pagination);

    const serviceCall = await service.findAll();

    expect(serviceCall.data).toEqual(pagination.data);
    expect(serviceCall.total).toEqual(pagination.total);
    expect(serviceCall.current_page).toEqual(pagination.current_page);
    expect(serviceCall.per_page).toEqual(pagination.per_page);
    expect(serviceCall.last_page).toEqual(pagination.last_page);
    expect(flowRepository.findAll).toHaveBeenCalledWith(1, 10, undefined);
  });

  it('should find one flow', async () => {
    const result = { id: '1', flowName: 'Test Flow' } as Flow;
    jest.spyOn(flowRepository, 'findOne').mockResolvedValue(result);

    expect(await service.findOne('1')).toEqual(result);
    expect(flowRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a flow', async () => {
    const updateFlowDto: UpdateFlowDto = { flowName: 'Updated Flow' };
    const result = { id: '1', ...updateFlowDto } as Flow;
    jest.spyOn(flowRepository, 'update').mockResolvedValue(result);

    expect(await service.update('1', updateFlowDto)).toEqual(result);
    expect(flowRepository.update).toHaveBeenCalledWith('1', updateFlowDto);
  });

  it('should remove a flow', async () => {
    jest.spyOn(flowRepository, 'remove').mockResolvedValue();

    await service.remove('1');

    expect(flowRepository.remove).toHaveBeenCalledWith('1');
  });
});

