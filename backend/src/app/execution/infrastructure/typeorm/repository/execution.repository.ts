import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutionORMEntity } from '../entities/execution-typeorm.entity';
import { IExecutionRepository } from '../../../application/repositories/execution.repository';
import { CreateExecutionDto } from '../../../presenter/dto/create-execution.dto';
import { UpdateExecutionDto } from '../../../presenter/dto/update-execution.dto';
import { PaginationPresenter } from 'src/shared/pagination/pagination.presenter';
import { Execution } from 'src/app/execution/application/entities/executions.entity';

@Injectable()
export class ExecutionRepository implements IExecutionRepository {
  constructor(
    @InjectRepository(ExecutionORMEntity)
    private readonly repository: Repository<ExecutionORMEntity>,
  ) { }

  async create(data: CreateExecutionDto): Promise<Execution> {
    const step = this.repository.create(data);
    return this.repository.save(step);
  }

  async findAll(page: number, limit: number, stepName?: string): Promise<PaginationPresenter> {
    const qb = this.repository.createQueryBuilder('steps');

    if (stepName) {
      qb.where('steps.stepName LIKE :stepName', { stepName: `%${stepName}%` });
    }
    qb.orderBy('steps.stepName', 'ASC');

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

  async update(id: string, data: UpdateExecutionDto): Promise<Execution | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}