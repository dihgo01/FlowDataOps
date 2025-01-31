export class Flow {
    id?: number;
    flowName!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Flow) {
        Object.assign(this, target);
    }
}
