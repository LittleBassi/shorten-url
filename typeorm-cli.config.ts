import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { dataSourceOptions } from './src/typeorm.config';

config({ path: join(__dirname, '.env') });

export default new DataSource(dataSourceOptions(new ConfigService()));
