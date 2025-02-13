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
    const flow = this.repository.create(data);
    return await this.repository.save(flow);
  }

  async formatSteps(steps: any[]): Promise<any[]> {
    return await Promise.all(
      steps.map(async (stepDto) => {
        const stepEntity = await this.repositoryStep.findOneByOrFail({
          id: stepDto.step_id,
        });
        return {
          step: stepEntity,
          configuration: stepDto.configuration,
          order: stepDto.order,
        };
      })
    );
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

  async findOne(id: string): Promise<Flow | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateFlowDto): Promise<Flow | null> {
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
            id: stepDto.step_id,
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

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}