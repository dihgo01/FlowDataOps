import { Flow } from "../../../application/entities/flow.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { WorkflowStepORMEntity } from "./workflow-step-typeorm.entity";

@Entity('flows')
export class FlowORMEntity extends BaseEntity implements Flow {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar', nullable: false })
    public flowName!: string;

    @Column({ type: 'text', nullable: true })
    public description?: string;

    @OneToMany(() => WorkflowStepORMEntity, (workflowStep) => workflowStep.flow, {
        cascade: true,
        eager: true,
    })
    public steps?: WorkflowStepORMEntity[];

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;

}
