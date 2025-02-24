import { Injectable, Inject } from '@nestjs/common';
import { IExecutionRepository } from '../repositories/execution.repository';
import { CreateExecutionDto } from '../../presenter/dto/create-execution.dto';
import { UpdateExecutionDto } from '../../presenter/dto/update-execution.dto';
import { ExecutionFlow } from '../entities/executions.entity';

@Injectable()
export class ExecutionService {
  constructor(
    @Inject('IExecutionRepository')
    private readonly executionRepository: IExecutionRepository,
  ) { }

  async create(createExecutionDto: CreateExecutionDto) {
    const flow = await this.executionRepository.findOneFlow(createExecutionDto.flowId);

    const createExecution: ExecutionFlow = {
      flow: flow,
      status: 'Started',
      dateExecution: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.executionRepository.create(createExecution);
  }

  async findAll(page?: number, limit?: number) {
    const pageDefault = page || 1;
    const limitDefault = limit || 10;
    return await this.executionRepository.findAll(pageDefault, limitDefault);
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
