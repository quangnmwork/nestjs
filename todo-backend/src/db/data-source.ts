import { DataSource, DataSourceOptions } from 'typeorm';

const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'postgres';
const DATABASE_PORT = (process.env.DATABASE_PORT as unknown as number) || 5432;
const DATABASE_DB = process.env.DATABASE_DB || 'todo';

if (
  !DATABASE_HOST ||
  !DATABASE_USER ||
  !DATABASE_PASSWORD ||
  !DATABASE_PORT ||
  !DATABASE_DB
) {
  throw new Error('Enviroment Database Error');
}

const configDataSource: DataSourceOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  database: DATABASE_DB,
  migrations: ['src/db/migrations/**/*.ts'],
  synchronize: false,
  entities: ['src/entities/**/*.entity.ts'],
};

export const dataSource = new DataSource(configDataSource);
