import { Flow } from "src/app/flow/application/entities/flow.entity";

export class ExecutionFlow {
    id?: string;
    flow?: Flow;
    status: string;
    dateExecution: Date;
    outputResponse?: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: ExecutionFlow) {
        Object.assign(this, target);
    }
}
