import { Test, TestingModule } from '@nestjs/testing';
import { StepController } from './step.controller';
import { StepService } from '../application/service/step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

describe('StepController', () => {
  let controller: StepController;
  let service: StepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepController],
      providers: [
        {
          provide: StepService,
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

    controller = module.get<StepController>(StepController);
    service = module.get<StepService>(StepService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call StepService.create with correct parameters', async () => {
      const createStepDto: CreateStepDto = { stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` };
      await controller.create(createStepDto);
      expect(service.create).toHaveBeenCalledWith(createStepDto);
    });
  });

  describe('findAll', () => {
    it('should call StepService.findAll with correct parameters', async () => {
      const page = 1;
      const limit = 10;
      const stepName = 'testStep';
      await controller.findAll(page, limit, stepName);
      expect(service.findAll).toHaveBeenCalledWith(page, limit, stepName);
    });
  });

  describe('findOne', () => {
    it('should call StepService.findOne with correct parameters', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call StepService.update with correct parameters', async () => {
      const id = '1';
      const updateStepDto: UpdateStepDto = { stepName: 'Test Step', icon: 'path/icon', type: 'HTTP', config: `{}` };
      await controller.update(id, updateStepDto);
      expect(service.update).toHaveBeenCalledWith(id, updateStepDto);
    });
  });

  describe('remove', () => {
    it('should call StepService.remove with correct parameters', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
