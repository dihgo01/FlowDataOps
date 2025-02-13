import { Injectable, Inject } from '@nestjs/common';
import { IFlowRepository } from '../repositories/flow.repository';
import { CreateFlowDto } from '../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../presenter/dto/update-flow.dto';

@Injectable()
export class FlowService {
  constructor(
    @Inject('IFlowRepository')
    private readonly flowRepository: IFlowRepository,
  ) { }

  async create(createFlowDto: CreateFlowDto) {
    let steps: any[] = [];

    if (createFlowDto.steps && createFlowDto.steps.length > 0) {
      steps = await this.flowRepository.formatSteps(createFlowDto.steps);
    }

    const flow = {
      flowName: createFlowDto.flowName,
      description: createFlowDto.description,
      steps: steps,
    };

    return await this.flowRepository.create(flow);
  }

  async findAll(page?: number, limit?: number, flowName?: string) {
    const pageDefault = page || 1;
    const limitDefault = limit || 10;
    return await this.flowRepository.findAll(pageDefault, limitDefault, flowName);
  }

  async findOne(id: string) {
    return await this.flowRepository.findOne(id);
  }

  async update(id: string, updateFlowDto: UpdateFlowDto) {
    return await this.flowRepository.update(id, updateFlowDto);
  }

  async remove(id: string) {
    return await this.flowRepository.remove(id);
  }
}
