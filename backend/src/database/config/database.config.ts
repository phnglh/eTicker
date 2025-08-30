import { registerAs } from '@nestjs/config';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { DatabaseConfig } from './database-config.type';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsString()
  DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  DATABASE_LOGGING: boolean;

  @IsBoolean()
  @IsOptional()
  DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsPositive()
  @IsOptional()
  DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  DATABASE_CA: string;

  @IsString()
  @IsOptional()
  DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  console.info(`Register DatabaseConfig from environment variables`);
  validateConfig(process.env, EnvironmentVariablesValidator);

  const env = process.env as NodeJS.ProcessEnv & {
    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_USERNAME: string;
    DATABASE_PORT?: string;
    DATABASE_LOGGING?: string;
    DATABASE_SYNCHRONIZE?: string;
    DATABASE_MAX_CONNECTIONS?: string;
    DATABASE_SSL_ENABLED?: string;
    DATABASE_REJECT_UNAUTHORIZED?: string;
    DATABASE_CA?: string;
    DATABASE_KEY?: string;
    DATABASE_CERT?: string;
  };

  return {
    type: env.DATABASE_TYPE,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT ? parseInt(env.DATABASE_PORT, 10) : 5432,
    password: env.DATABASE_PASSWORD,
    name: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    logging: env.DATABASE_LOGGING === 'true',
    synchronize: env.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: env.DATABASE_MAX_CONNECTIONS
      ? parseInt(env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: env.DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized: env.DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: env.DATABASE_CA,
    key: env.DATABASE_KEY,
    cert: env.DATABASE_CERT,
  };
});
