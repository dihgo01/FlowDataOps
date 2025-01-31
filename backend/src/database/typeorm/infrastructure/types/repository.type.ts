import { BaseEntity, Repository as BaseRepository } from "typeorm";
import { TransactionService } from "../../application/service/transaction.service";

export interface RepositoryHandler<T extends BaseEntity> extends BaseRepository<T> {
    using: (transaction?: TransactionService) => BaseRepository<T>;
}

export interface Repository<T extends BaseEntity> {
    getConnection: () => Promise<RepositoryHandler<T>>
}