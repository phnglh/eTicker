import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, HomeModule, HealthModule, AuthModule],
})
export class ApiModule {}
