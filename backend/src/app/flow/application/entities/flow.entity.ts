import { Step } from "src/app/steps/application/entities/steps.entity";

export class Flow {
    id?: number;
    flowName!: string;
    description?: string;
    steps?: Step[];
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Flow) {
        Object.assign(this, target);
    }
}
