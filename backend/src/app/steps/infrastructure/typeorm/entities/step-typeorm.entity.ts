import { Step } from "src/app/steps/application/entities/steps.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('steps')
export class StepORMEntity extends BaseEntity implements Step {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({ type: 'varchar', nullable: false })
    public stepName!: string;

    @Column({ type: 'varchar', nullable: true })
    public description?: string;

    @Column({ type: 'varchar', nullable: false })
    public type!: string;

    @Column({ type: 'varchar', nullable: false })
    public icon!: string;

    @Column({ type: 'text', nullable: true })
    public config?: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;
}
