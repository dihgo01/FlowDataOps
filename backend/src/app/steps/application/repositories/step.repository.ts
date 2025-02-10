import { CreateStepDto } from "../../presenter/dto/create-step.dto";
import { UpdateStepDto } from "../../presenter/dto/update-step.dto";
import { Step } from "../entities/steps.entity";

export interface IStepRepository {
    create(data: CreateStepDto): Promise<Step>;
    findAll(page: number, limit: number, stepName?: string): Promise<Step[]>;
    findOne(id: number): Promise<Step | null>;
    update(id: number, data: UpdateStepDto): Promise<Step| null>;
    remove(id: number): Promise<void>;
  }