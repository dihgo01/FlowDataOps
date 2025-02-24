import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowORMEntity } from '../entities/flow-typeorm.entity';
import { IFlowRepository } from '../../../application/repositories/flow.repository';
import { CreateFlowDto } from '../../../presenter/dto/create-flow.dto';
import { Flow } from '../../../../flow/application/entities/flow.entity';
import { PaginationPresenter } from '../../../../../shared/pagination/pagination.presenter';
import { WorkflowStepORMEntity } from '../entities/workflow-step-typeorm.entity';
import { StepORMEntity } from 'src/app/steps/infrastructure/typeorm/entities/step-typeorm.entity';
import { Step } from 'src/app/steps/application/entities/steps.entity';

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

  async findStepOne(id: string): Promise<Step> {
    return await this.repositoryStep.findOneByOrFail({
      id: id,
    });
  }

  async update(data: Flow): Promise<Flow> {
    if (data.steps) {
      const newSteps = await Promise.all(
        data.steps.map(async (stepDto) => {
          return this.repositoryFlowStep.create({
            flow: data,
            step: stepDto.step,
            configuration: stepDto.configuration,
            order: stepDto.order,
          });
        }),
      );

      data.steps = newSteps;
    }

    return await this.repository.save(data);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async removeAllStep(id: string): Promise<void> {
    await this.repositoryFlowStep.delete({ flow: { id: id } });
  }
}