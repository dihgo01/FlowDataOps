import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { CreateFlowDto } from "../../presenter/dto/create-flow.dto";
import { Flow } from "../entities/flow.entity";
import { Step } from "src/app/steps/application/entities/steps.entity";

export interface IFlowRepository {
  create(data: CreateFlowDto): Promise<Flow>;
  findAll(page: number, limit: number, flowName?: string): Promise<PaginationPresenter>;
  findOne(id: string): Promise<Flow | null>;
  findStepOne(id: string): Promise<Step>;
  update(data: Flow): Promise<Flow>;
  remove(id: string): Promise<void>;
  removeAllStep(id: string): Promise<void>;
}