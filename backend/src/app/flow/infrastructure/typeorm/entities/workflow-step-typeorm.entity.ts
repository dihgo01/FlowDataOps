import { WorkFlowStep } from '../../../application/entities/workflow-step.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity
} from 'typeorm';
import { FlowORMEntity } from './flow-typeorm.entity';
import { StepORMEntity } from '../../../../../app/steps/infrastructure/typeorm/entities/step-typeorm.entity';

@Entity('flow_steps')
export class WorkflowStepORMEntity extends BaseEntity implements WorkFlowStep {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => FlowORMEntity, (workflow) => workflow.steps, { onDelete: 'CASCADE' })
    public flow: FlowORMEntity;

    @ManyToOne(() => StepORMEntity, { eager: true })
    public step: StepORMEntity;

    @Column('json', { nullable: true })
    public configuration?: any;

    @Column({ default: 0 })
    public order: number;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;
}