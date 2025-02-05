export class Step {
    id?: number;
    stepName!: string;
    description?: string;
    type!: string;
    icon!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Step) {
        Object.assign(this, target);
    }
}
