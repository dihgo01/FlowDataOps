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
      steps = await this.formatSteps(createFlowDto.steps);
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
    const findFlow = await this.flowRepository.findOne(id);

    if (!findFlow) {
      return new Error('Flow not found');
    }

    if (updateFlowDto.flowName !== undefined) {
      findFlow.flowName = updateFlowDto.flowName;
    }
    if (updateFlowDto.description !== undefined) {
      findFlow.description = updateFlowDto.description;
    }

    let steps: any[] | undefined = findFlow.steps;
    await this.flowRepository.removeAllStep(id);

    if (updateFlowDto.steps && updateFlowDto.steps.length > 0) {
      steps = await this.formatSteps(updateFlowDto.steps);
    }

    findFlow.steps = steps;

    return await this.flowRepository.update(findFlow);
  }

  async formatSteps(steps: any[]) {
    return await Promise.all(
      steps.map(async (stepDto) => {
        const stepEntity = await this.flowRepository.findStepOne(stepDto.step_id);
        return {
          step: stepEntity,
          configuration: stepDto.configuration,
          order: stepDto.order,
        };
      })
    );
  }

  async remove(id: string) {
    return await this.flowRepository.remove(id);
  }
}
