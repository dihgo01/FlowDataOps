import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionController } from './execution.controller';
import { ExecutionService } from '../application/service/execution.service';
import { CreateExecutionDto } from './dto/create-execution.dto';
import { UpdateExecutionDto } from './dto/update-execution.dto';

describe('ExecutionController', () => {
  let controller: ExecutionController;
  let service: ExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecutionController],
      providers: [
        {
          provide: ExecutionService,
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

    controller = module.get<ExecutionController>(ExecutionController);
    service = module.get<ExecutionService>(ExecutionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call executionService.create with correct parameters', async () => {
      const createExecutionDto: CreateExecutionDto = { flowId: 'Test Step' };
      await controller.create(createExecutionDto);
      expect(service.create).toHaveBeenCalledWith(createExecutionDto);
    });
  });

  describe('findAll', () => {
    it('should call executionService.findAll with correct parameters', async () => {
      const page = 1;
      const limit = 10;
      await controller.findAll(page, limit);
      expect(service.findAll).toHaveBeenCalledWith(page, limit);
    });
  });

  describe('findOne', () => {
    it('should call executionService.findOne with correct parameters', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call executionService.update with correct parameters', async () => {
      const id = '1';
      const updateExecutionDto: UpdateExecutionDto = { dateExecution: new Date(), outputResponse: '{"data": "test"}', status: 'Completed' };
      await controller.update(id, updateExecutionDto);
      expect(service.update).toHaveBeenCalledWith(id, updateExecutionDto);
    });
  });

  describe('remove', () => {
    it('should call executionService.remove with correct parameters', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
