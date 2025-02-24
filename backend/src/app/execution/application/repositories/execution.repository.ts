import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { UpdateExecutionDto } from "../../presenter/dto/update-execution.dto";
import { ExecutionFlow } from "../entities/executions.entity";
import { Flow } from "src/app/flow/application/entities/flow.entity";

export interface IExecutionRepository {
  create(data: ExecutionFlow): Promise<ExecutionFlow>;
  findAll(page: number, limit: number): Promise<PaginationPresenter>;
  findOne(id: string): Promise<ExecutionFlow | null>;
  findOneFlow(id: string): Promise<Flow>;
  update(id: string, data: UpdateExecutionDto): Promise<ExecutionFlow | null>;
  remove(id: string): Promise<void>;
}