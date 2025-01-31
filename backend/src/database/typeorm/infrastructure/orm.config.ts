import { DataSource } from 'typeorm';
import { TypeormConfig } from '../../../shared/config/typeorm.config';

import { config } from 'dotenv';
config();

export default new DataSource(TypeormConfig.getOptions('migration'));
