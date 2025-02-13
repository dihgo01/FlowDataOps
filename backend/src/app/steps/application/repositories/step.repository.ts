import { PaginationPresenter } from "src/shared/pagination/pagination.presenter";
import { CreateStepDto } from "../../presenter/dto/create-step.dto";
import { UpdateStepDto } from "../../presenter/dto/update-step.dto";
import { Step } from "../entities/steps.entity";

export interface IStepRepository {
    create(data: CreateStepDto): Promise<Step>;
    findAll(page: number, limit: number, stepName?: string): Promise<PaginationPresenter>;
    findOne(id: string): Promise<Step | null>;
    update(id: string, data: UpdateStepDto): Promise<Step| null>;
    remove(id: string): Promise<void>;
  }