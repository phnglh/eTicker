import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [UserModule, HomeModule, HealthModule],
})
export class ApiModule {}
