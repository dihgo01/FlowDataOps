import { Flow } from "src/app/flow/application/entities/flow.entity";

export class Execution {
    id?: string;
    flow?: Flow;
    status: string;
    dateExecution: Date;
    outputResponse?: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Execution) {
        Object.assign(this, target);
    }
}
