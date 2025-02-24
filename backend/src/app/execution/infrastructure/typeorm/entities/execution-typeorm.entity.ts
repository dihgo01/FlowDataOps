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
import { FlowORMEntity } from '../../../../flow/infrastructure/typeorm/entities/flow-typeorm.entity';   
import { ExecutionFlow } from 'src/app/execution/application/entities/executions.entity';

@Entity('executions')
export class ExecutionFlowORMEntity extends BaseEntity implements ExecutionFlow {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => FlowORMEntity, { eager: true })
    public flow: FlowORMEntity;

    @Column({ type: 'varchar', nullable: false })
    public status!: string;

    @Column({ type: 'datetime', nullable: false })
    public dateExecution: Date;

    @Column({ type: 'text', nullable: true })
    public outputResponse?: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;
}