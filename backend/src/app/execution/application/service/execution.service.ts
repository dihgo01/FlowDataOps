import { Injectable, Inject } from '@nestjs/common';
import { IExecutionRepository } from '../repositories/execution.repository';
import { CreateExecutionDto } from '../../presenter/dto/create-execution.dto';
import { UpdateExecutionDto } from '../../presenter/dto/update-execution.dto';

@Injectable()
export class ExecutionService {
  constructor(
    @Inject('IExecutionRepository')
    private readonly executionRepository: IExecutionRepository,
  ) { }

  async create(createExecutionDto: CreateExecutionDto) {
    const die = await this.executionRepository.create(createExecutionDto);

    return await this.executionRepository.create(createExecutionDto);
  }

  async findAll(page?: number, limit?: number, stepName?: string) {
    const pageDefault = page || 1;
    const limitDefault = limit || 10;
    return await this.executionRepository.findAll(pageDefault, limitDefault, stepName);
  }

  async findOne(id: string) {
    return await this.executionRepository.findOne(id);
  }

  async update(id: string, updateExecutionDto: UpdateExecutionDto) {
    return await this.executionRepository.update(id, updateExecutionDto);
  }

  async remove(id: string) {
    return await this.executionRepository.remove(id);
  }
}
