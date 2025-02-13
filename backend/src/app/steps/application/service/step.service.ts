import { Injectable, Inject } from '@nestjs/common';
import { IStepRepository } from '../repositories/step.repository';
import { CreateStepDto } from '../../presenter/dto/create-step.dto';
import { UpdateStepDto } from '../../presenter/dto/update-step.dto';

@Injectable()
export class StepService {
  constructor(
    @Inject('IStepRepository')
    private readonly stepRepository: IStepRepository,
  ) { }

  async create(createStepDto: CreateStepDto) {
    return await this.stepRepository.create(createStepDto);
  }

  async findAll(page?: number, limit?: number, stepName?: string) {
    const pageDefault = page || 1;
    const limitDefault = limit || 10;
    return await this.stepRepository.findAll(pageDefault, limitDefault, stepName);
  }

  async findOne(id: string) {
    return await this.stepRepository.findOne(id);
  }

  async update(id: string, updateFlowDto: UpdateStepDto) {
    return await this.stepRepository.update(id, updateFlowDto);
  }

  async remove(id: string) {
    return await this.stepRepository.remove(id);
  }
}
