import { Execution } from "src/app/execution/application/entities/executions.entity";
import { FlowORMEntity } from "src/app/flow/infrastructure/typeorm/entities/flow-typeorm.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('executions')
export class ExecutionORMEntity extends BaseEntity implements Execution {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => FlowORMEntity, (flow) => flow.executions, { eager: true })
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
