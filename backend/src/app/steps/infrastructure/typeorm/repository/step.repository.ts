import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StepORMEntity } from '../entities/step-typeorm.entity';
import { IStepRepository } from '../../../application/repositories/step.repository';
import { CreateStepDto } from '../../../presenter/dto/create-step.dto';
import { UpdateStepDto } from '../../../presenter/dto/update-step.dto';
import { Step } from 'src/app/steps/application/entities/steps.entity';
import { PaginationPresenter } from 'src/shared/pagination/pagination.presenter';

@Injectable()
export class StepRepository implements IStepRepository {
  constructor(
    @InjectRepository(StepORMEntity)
    private readonly repository: Repository<StepORMEntity>,
  ) { }

  async create(data: CreateStepDto): Promise<Step> {
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

  async findOne(id: string): Promise<Step | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateStepDto): Promise<Step | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}