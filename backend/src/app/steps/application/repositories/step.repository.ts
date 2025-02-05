import { CreateStepDto } from "../../dto/create-step.dto";
import { UpdateStepDto } from "../../dto/update-step.dto";
import { Step } from "../entities/steps.entity";

export interface IStepRepository {
    create(data: CreateStepDto): Promise<Step>;
    findAll(): Promise<Step[]>;
    findOne(id: number): Promise<Step | null>;
    update(id: number, data: UpdateStepDto): Promise<Step| null>;
    remove(id: number): Promise<void>;
  }