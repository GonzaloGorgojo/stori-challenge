/**
 * @file   This file defines the Typeorm client database connections definitions.
 * @author Gonzalo gorgojo.
 */

import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

/**
 * @config postgresConfig
 * This is the configuration for the postgres db connection.
 * @type {DataSourceOptions}
 */
export const postgresConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  migrationsTableName: '_migrations',
  migrationsRun: false,
  migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
  migrationsTransactionMode: 'all',
  subscribers: [
    `${__dirname}/**/*.subscriber{.ts,.js}`,
    'dist/**/*.subscriber{ .ts,.js}',
  ],
};

// This can be used by the TypeORM CLI or by the injection of a DataSource as a service provider.
export const postgresDataBase = new DataSource(postgresConfig);