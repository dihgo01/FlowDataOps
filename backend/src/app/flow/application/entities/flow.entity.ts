import { WorkFlowStep } from "./workflow-step.entity";

export class Flow {
    id?: number;
    flowName!: string;
    description?: string;
    steps?: WorkFlowStep[];
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Flow) {
        Object.assign(this, target);
    }
}
