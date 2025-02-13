import { Step } from "src/app/steps/application/entities/steps.entity";
import { Flow } from "./flow.entity";

export class WorkFlowStep {
    id?: string;
    flow: Flow;
    step: Step;
    configuration?: string;
    order: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: WorkFlowStep) {
        Object.assign(this, target);
    }
}