import { Flow } from "src/app/flow/application/entities/flow.entity";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('flows')
export class FlowORMEntity extends BaseEntity implements Flow {
    @PrimaryGeneratedColumn('increment')
    public id!: number;

    @Column({ type: 'varchar', nullable: false })
    public flowName!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @DeleteDateColumn()
    public deletedAt?: Date | null;
}
