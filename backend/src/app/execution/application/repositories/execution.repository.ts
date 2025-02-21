import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { UpdateExecutionDto } from "../../presenter/dto/update-execution.dto";
import { Execution } from "../entities/executions.entity";
import { Flow } from "src/app/flow/application/entities/flow.entity";

export interface IExecutionRepository {
  create(data: Execution): Promise<Execution>;
  findAll(page: number, limit: number, ExecutionName?: string): Promise<PaginationPresenter>;
  findOne(id: string): Promise<Execution | null>;
  findOneFlow(id: string): Promise<Flow>;
  update(id: string, data: UpdateExecutionDto): Promise<Execution | null>;
  remove(id: string): Promise<void>;
}