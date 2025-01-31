import { Provider } from '@nestjs/common';
import { TypeormDomain } from './typeorm/infrastructure/domains/typeorm.domain';

export const DatabaseProvider: Provider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async () => {
    return await TypeormDomain.initialize();
  },
};