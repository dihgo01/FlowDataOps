import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { CreateFlowDto } from "../../presenter/dto/create-flow.dto";
import { UpdateFlowDto } from "../../presenter/dto/update-flow.dto";
import { Flow } from "../entities/flow.entity";

export interface IFlowRepository {
  create(data: CreateFlowDto): Promise<Flow>;
  findAll(page: number, limit: number, flowName?: string): Promise<PaginationPresenter>;
  findOne(id: string): Promise<Flow | null>;
  formatSteps(steps: any[]): Promise<any[]>;
  update(id: string, data: UpdateFlowDto): Promise<Flow | null>;
  remove(id: string): Promise<void>;
}