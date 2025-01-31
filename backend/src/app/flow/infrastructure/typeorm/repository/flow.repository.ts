import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Flow } from '../entities/flow-typeorm.entity';
import { IFlowRepository } from '../../../application/repositories/flow.repository';
import { CreateFlowDto } from '../../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../../presenter/dto/update-flow.dto';

@Injectable()
export class FlowRepository implements IFlowRepository {
  constructor(
    @InjectRepository(Flow)
    private readonly repository: Repository<Flow>,
  ) {}

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

  async update(id: number, data: UpdateFlowDto): Promise<Flow| null> {
    await this.repository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}