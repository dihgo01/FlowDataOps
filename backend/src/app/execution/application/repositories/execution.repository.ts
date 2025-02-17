import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { CreateExecutionDto } from "../../presenter/dto/create-execution.dto";
import { UpdateExecutionDto } from "../../presenter/dto/update-execution.dto";
import { Execution } from "../entities/executions.entity";

export interface IExecutionRepository {
  create(data: CreateExecutionDto): Promise<Execution>;
  findAll(page: number, limit: number, ExecutionName?: string): Promise<PaginationPresenter>;
  findOne(id: string): Promise<Execution | null>;
  update(id: string, data: UpdateExecutionDto): Promise<Execution | null>;
  remove(id: string): Promise<void>;
}