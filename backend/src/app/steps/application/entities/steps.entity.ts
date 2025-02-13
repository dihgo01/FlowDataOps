export class Step {
    id?: string;
    stepName!: string;
    description?: string;
    type!: string;
    icon!: string;
    config?: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date | null;

    constructor(target: Step) {
        Object.assign(this, target);
    }
}
