import { Flow } from "src/app/flow/application/entities/flow.entity";
import { StepORMEntity } from "src/app/steps/infrastructure/typeorm/entities/step-typeorm.entity";
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

@Entity('flows')
export class FlowORMEntity extends BaseEntity implements Flow {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({ type: 'varchar', nullable: false })
    public flowName!: string;

    @Column({ type: 'text', nullable: true })
    public description?: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;

    //@OneToMany(() => StepORMEntity, step => step.steps)
    //steps!: StepORMEntity[];
}
