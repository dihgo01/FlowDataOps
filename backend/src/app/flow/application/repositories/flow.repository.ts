import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { CreateFlowDto } from "../../presenter/dto/create-flow.dto";
import { UpdateFlowDto } from "../../presenter/dto/update-flow.dto";
import { Flow } from "../entities/flow.entity";
import { Step } from "src/app/steps/application/entities/steps.entity";

export interface IFlowRepository {
  create(data: CreateFlowDto): Promise<Flow>;
  findAll(page: number, limit: number, flowName?: string): Promise<PaginationPresenter>;
  findOne(id: number): Promise<Flow | null>;
  
  update(id: number, data: UpdateFlowDto): Promise<Flow | null>;
  remove(id: number): Promise<void>;
}