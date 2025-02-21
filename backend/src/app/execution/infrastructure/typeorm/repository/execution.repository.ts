import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionORMEntity } from 'src/app/execution/infrastructure/typeorm/entities/execution-typeorm.entity';
import { IExecutionRepository } from '../../../application/repositories/execution.repository';
import { UpdateExecutionDto } from '../../../presenter/dto/update-execution.dto';
import { PaginationPresenter } from 'src/shared/pagination/pagination.presenter';
import { Execution } from 'src/app/execution/application/entities/executions.entity';
import { FlowORMEntity } from 'src/app/flow/infrastructure/typeorm/entities/flow-typeorm.entity';

@Injectable()
export class ExecutionRepository implements IExecutionRepository {
  constructor(
    @InjectRepository(ExecutionORMEntity)
    private readonly repository: Repository<ExecutionORMEntity>,
    @InjectRepository(FlowORMEntity)
    private readonly repositoryFlow: Repository<FlowORMEntity>
  ) { }

  async create(data: Execution): Promise<Execution> {
    console.log("DATA REPOSITORY", data)
    const dataEntity = {
      flow_id: data.flow?.id, 
      status: data.status,
      dateExecution: data.dateExecution,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
    const execution = this.repository.create(data);
    return this.repository.save(execution);
  }

  async findAll(page: number, limit: number): Promise<PaginationPresenter> {
    const qb = this.repository.createQueryBuilder('executions');

    const [data, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

    return new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(total / limit),
      total,
      data,
    });
  }

  async findOne(id: string): Promise<Execution | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findOneFlow(id: string): Promise<FlowORMEntity> {
    return this.repositoryFlow.findOneOrFail({ where: { id } });
  }


  async update(id: string, data: UpdateExecutionDto): Promise<Execution | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}