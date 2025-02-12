import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowORMEntity } from '../entities/flow-typeorm.entity';
import { IFlowRepository } from '../../../application/repositories/flow.repository';
import { CreateFlowDto } from '../../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../../presenter/dto/update-flow.dto';
import { Flow } from '../../../../flow/application/entities/flow.entity';
import { PaginationPresenter } from '../../../../../shared/pagination/pagination.presenter';
import { WorkflowStepORMEntity } from '../entities/workflow-step-typeorm.entity';
import { StepORMEntity } from 'src/app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

@Injectable()
export class FlowRepository implements IFlowRepository {
  constructor(
    @InjectRepository(FlowORMEntity)
    private readonly repository: Repository<FlowORMEntity>,
    @InjectRepository(WorkflowStepORMEntity)
    private readonly repositoryFlowStep: Repository<WorkflowStepORMEntity>,
    @InjectRepository(StepORMEntity)
    private readonly repositoryStep: Repository<StepORMEntity>,
  ) { }

  async create(data: CreateFlowDto): Promise<Flow> {
    let steps: any[] = [];
    if (data.steps && data.steps.length > 0) {
      steps = await Promise.all(
        data.steps.map(async (stepDto) => {
          const stepEntity = await this.repositoryStep.findOneByOrFail({
            id: parseInt(stepDto.step_id),
          });
          return {
            step: stepEntity,
            configuration: stepDto.configuration,
            order: stepDto.order,
          };
        })
      );
    }

    const flow = this.repository.create({
      flowName: data.flowName,
      description: data.description,
      steps: steps,
    });

    return await this.repository.save(flow);
  }

  async findAll(page: number, limit: number, flowName?: string): Promise<PaginationPresenter> {
    const qb = this.repository.createQueryBuilder('flow');

    if (flowName) {
      qb.where('flow.flowName LIKE :flowName', { flowName: `%${flowName}%` });
    }
    qb.orderBy('flow.flowName', 'ASC');

    const [data, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

    return new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(total / limit),
      total,
      data,
    });
  }

  async findOne(id: number): Promise<Flow | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateFlowDto): Promise<Flow | null> {
    const flow = await this.repository.findOneOrFail({
      where: { id },
      relations: ['steps'],
    });

    if (data.flowName !== undefined) {
      flow.flowName = data.flowName;
    }
    if (data.description !== undefined) {
      flow.description = data.description;
    }

    if (data.steps) {
      await this.repositoryFlowStep.delete({ flow: { id: flow.id } });

      const newSteps = await Promise.all(
        data.steps.map(async (stepDto) => {
          const stepEntity = await this.repositoryStep.findOneByOrFail({
            id: parseInt(stepDto.step_id),
          });

          return this.repositoryFlowStep.create({
            flow: flow,
            step: stepEntity,
            configuration: stepDto.configuration,
            order: stepDto.order,
          });
        }),
      );

      flow.steps = newSteps;
    }
    
    return await this.repository.save(flow);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}