import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowORMEntity } from '../entities/flow-typeorm.entity';
import { IFlowRepository } from '../../../application/repositories/step.repository';
import { CreateFlowDto } from '../../../presenter/dto/create-step.dto';
import { UpdateFlowDto } from '../../../presenter/dto/update-step.dto';
import { Flow } from 'src/app/flow/application/entities/flow.entity';

@Injectable()
export class FlowRepository implements IFlowRepository {
  constructor(
    @InjectRepository(FlowORMEntity)
    private readonly repository: Repository<FlowORMEntity>,
  ) { }

  async create(data: CreateFlowDto): Promise<Flow> {
    const flow = this.repository.create(data);
    return this.repository.save(flow);
  }

  async findAll(): Promise<Flow[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Flow | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateFlowDto): Promise<Flow | null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}