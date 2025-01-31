import { Injectable, Inject } from '@nestjs/common';
import { IFlowRepository } from '../repositories/flow.repository';
import { CreateFlowDto } from '../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../presenter/dto/update-flow.dto';

@Injectable()
export class FlowService {
  constructor(
    @Inject('IFlowRepository')
    private readonly flowRepository: IFlowRepository,
  ) {}

  async create(createFlowDto: CreateFlowDto) {
    return await this.flowRepository.create(createFlowDto);
  }

  async findAll() {
    return await this.flowRepository.findAll();
  }

  async findOne(id: number) {
    return await this.flowRepository.findOne(id);
  }

  async update(id: number, updateFlowDto: UpdateFlowDto) {
    return await this.flowRepository.update(id, updateFlowDto);
  }

  async remove(id: number) {
    return await this.flowRepository.remove(id);
  }
}
