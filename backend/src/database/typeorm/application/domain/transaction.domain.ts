export interface ITransactionDomain {
    start: () => Promise<void>;
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
}