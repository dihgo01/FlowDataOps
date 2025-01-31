import { QueryRunner } from "typeorm"
import { ITransactionDomain } from "../../application/domain/transaction.domain";
import { TypeormDomain } from "./typeorm.domain";

export class TransactionTypeormDomain implements ITransactionDomain {
    public queryRunner!: QueryRunner;

    constructor(private readonly typeOrmDomain : TypeormDomain) {}

    public async start(): Promise<void> {
        const queryRunner = this.typeOrmDomain.getDataSource().createQueryRunner();
        await queryRunner.startTransaction();

        this.queryRunner = queryRunner;
    }

    public async commit(): Promise<void> {
       await this.queryRunner.commitTransaction();
       await this.finish();
    }

    public async rollback(): Promise<void> {
        await this.queryRunner.rollbackTransaction();
        await this.finish();
    }

    public async finish(): Promise<void> {
        await this.queryRunner.release();
    }
}