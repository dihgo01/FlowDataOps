import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowORMEntity } from '../entities/flow-typeorm.entity';
import { IFlowRepository } from '../../../application/repositories/flow.repository';
import { CreateFlowDto } from '../../../presenter/dto/create-flow.dto';
import { UpdateFlowDto } from '../../../presenter/dto/update-flow.dto';
import { Flow } from 'src/app/flow/application/entities/flow.entity';
import { PaginationPresenter } from 'src/shared/pagination/pagination.presenter';

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

  async findAll(page: number, limit: number, flowName?: string): Promise<PaginationPresenter> {
    const query = this.repository.createQueryBuilder('flow');

    if (flowName) {
      query.where('flow.flowName LIKE :flowName', { flowName: `%${flowName}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, count] = await query.getManyAndCount();
    return new PaginationPresenter({
      current_page: page,
      per_page: limit,
      last_page: Math.ceil(count / limit),
      total: count,
      data,
    });
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