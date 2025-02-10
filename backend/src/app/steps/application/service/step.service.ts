import { Injectable, Inject } from '@nestjs/common';
import { IStepRepository } from '../repositories/step.repository';
import { CreateStepDto } from '../../presenter/dto/create-step.dto';
import { UpdateStepDto } from '../../presenter/dto/update-step.dto';

@Injectable()
export class StepService {
  constructor(
    @Inject('IStepRepository')
    private readonly stepRepository: IStepRepository,
  ) {}

  async create(createStepDto: CreateStepDto) {
    return await this.stepRepository.create(createStepDto);
  }

  async findAll(page: number, limit: number, stepName?: string) {
    return await this.stepRepository.findAll(page, limit, stepName);
  }

  async findOne(id: number) {
    return await this.stepRepository.findOne(id);
  }

  async update(id: number, updateFlowDto: UpdateStepDto) {
    return await this.stepRepository.update(id, updateFlowDto);
  }

  async remove(id: number) {
    return await this.stepRepository.remove(id);
  }
}
