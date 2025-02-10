import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StepORMEntity } from '../entities/step-typeorm.entity';
import { IStepRepository } from '../../../application/repositories/step.repository';
import { CreateStepDto } from '../../../presenter/dto/create-step.dto';
import { UpdateStepDto } from '../../../presenter/dto/update-step.dto';
import { Step } from 'src/app/steps/application/entities/steps.entity';

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

  async findAll(page: number, limit: number, stepName?: string): Promise<Step[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Step | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateStepDto): Promise<Step | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}