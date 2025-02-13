import { Test, TestingModule } from '@nestjs/testing';
import { FlowController } from './flow.controller';
import { FlowService } from '../application/service/flow.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { UpdateFlowDto } from './dto/update-flow.dto';

describe('FlowController', () => {
  let controller: FlowController;
  let service: FlowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowController],
      providers: [
        {
          provide: FlowService,
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

    controller = module.get<FlowController>(FlowController);
    service = module.get<FlowService>(FlowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call FlowService.create with correct parameters', async () => {
      const createFlowDto: CreateFlowDto = { flowName: 'Test Flow', description: 'Test Description' };
      await controller.create(createFlowDto);
      expect(service.create).toHaveBeenCalledWith(createFlowDto);
    });
  });

  describe('findAll', () => {
    it('should call FlowService.findAll with correct parameters', async () => {
      const page = 1;
      const limit = 10;
      const flowName = 'testFlow';
      await controller.findAll(page, limit, flowName);
      expect(service.findAll).toHaveBeenCalledWith(page, limit, flowName);
    });
  });

  describe('findOne', () => {
    it('should call FlowService.findOne with correct parameters', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call FlowService.update with correct parameters', async () => {
      const id = '1';
      const updateFlowDto: UpdateFlowDto = { /* add properties here */ };
      await controller.update(id, updateFlowDto);
      expect(service.update).toHaveBeenCalledWith(id, updateFlowDto);
    });
  });

  describe('remove', () => {
    it('should call FlowService.remove with correct parameters', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
